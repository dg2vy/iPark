from .tools import *
from handler.metrics_fetcher import fetch_metrics
from logger import setup_logger
from handler.ai import send_attack_request
from file_server import websocket_server as watcher

import asyncio
import websockets
import json
import time
import os
import shutil

from dotenv import load_dotenv

logger = setup_logger(__name__)
connected_clients = set()

async def ai_runner(event, arguments, metric_url):
    ai_ip = os.getenv('AI_IP')
    ai_port = os.getenv('AI_PORT')
    root_template_folder = os.getenv('AI_TEMPLATE_PATH', './ai_generated_template')
    attack_types = ['RCE', 'XSS', 'SQL Injection']

    if not os.path.exists(root_template_folder):
        os.mkdir(root_template_folder)

    elif os.path.exists(root_template_folder) and len(os.listdir(root_template_folder)) > 0:
        arguments.append("-t")
        arguments.append(root_template_folder)

        metric_task = asyncio.create_task(fetch_metrics(metric_url, 0.1))

        logger.info(f"Aleady Generated AI Template Included Arguments: {arguments}")

        await run_nuclei(arguments, debug=True)

        metric_task.cancel()  

        arguments.pop()
        arguments.pop()
        arguments.pop()
        
    try:
        while not event.is_set():
            logger.info("Running ai background task")
            full_path = f"{root_template_folder}/{time.time()}"

            for i in range(20):
                for attack in attack_types:
                    await send_attack_request(attack, ai_ip, ai_port, full_path)
                
                logger.info(f"Fetch AI Generated Template - {i}")
                
                await asyncio.sleep(1)    
                

            metrics_port = str(get_unused_port())
            metric_url = f"http://localhost:{metrics_port}/metrics"
            
            arguments.append(metrics_port)
            arguments.append("-t")
            arguments.append(full_path)

            metric_task = asyncio.create_task(fetch_metrics(metric_url, 0.1))

            logger.info(f"AI Template Included Arguments: {arguments}")

            return_code = await run_nuclei(arguments, debug=True)
            logger.info(f"Nuclei Return Code: {return_code}")  
            
            metric_task.cancel()  
            arguments.pop()
            arguments.pop()        
            arguments.pop()         

            for filename in os.listdir(full_path):
                file_path = os.path.join(full_path, filename)
                shutil.move(file_path, root_template_folder)
            
            os.rmdir(full_path)

    finally:
        logger.info("Background task stopped")


async def run_nuclei(arguments, debug=False):
    nuclei_path = os.getenv(
        "NUCLEI_BIN_PATH",
        os.path.join(os.path.expanduser("~"), 'go', 'bin', 'nuclei')
    )

    logger.debug(f"Execute Command: {nuclei_path} {' '.join(arguments)}")
    
    process = await asyncio.create_subprocess_exec(
        nuclei_path,
        *arguments,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )

    if debug == True:
        async def read_output(stream):
            while True:
                line = await stream.readline()
                if not line:
                    break
                logger.info(f"{line.decode().strip()}")

        await asyncio.gather(
            read_output(process.stdout),
            read_output(process.stderr)
        )
    else:
        stdout, stderr = await process.communicate()

        if stdout:
            logger.info(stdout.decode())
        if stderr:
            logger.error(stderr.decode())

    return process.returncode

async def cmd_handler(websocket, _):
    connected_clients.add(websocket)
    ai_stop_event = None 
    ai_task = None
    try:
        while True:
            client_message = await websocket.recv()
            client_data = json.loads(client_message)
            logger.info(f"Cliend Data: {client_data}")

            match client_data.get("command"):
                case "execute":
                    target = client_data.get('target')
                    match check_http_access(target):
                        case "PERROR":
                            await websocket.send(json.dumps({"message": "Protocol Invalid", "timestamp": time.time()}))

                        case 200:
                            await websocket.send(json.dumps({"message": "Target Valid", "timestamp": time.time()}))
                            options = client_data.get('options', [])
                            ai_flag = False if client_data.get("Ai") == "false" else True

                            serve_dir = os.getenv("SERVING_PATH")
                            vuln_dir = f"{serve_dir}/vuln_output.md"
                            conn_dir = f"{serve_dir}/conn_output"
                            report_dir = f"{serve_dir}/markdown_output"
                            
                            metrics_port = str(get_unused_port())
                            metric_url = f"http://localhost:{metrics_port}/metrics"
                            arguments = ["-o", vuln_dir, "-fr", "-srd", conn_dir, "-irr", "-as", "-me", report_dir,"-vv", "-debug", "-stats", "-u", target] + options + ["-mp", metrics_port]

                            # arguments = ["-stats", "-mp", metrics_port, "-u", target] + options
                            fetch_delay = int(os.getenv("METRIC_FETCH_DELAY", 5))

                            metric_task = asyncio.create_task(fetch_metrics(metric_url, fetch_delay))
                            return_code = await run_nuclei(arguments, debug=False)
                            logger.info(f"Nuclei Return Code: {return_code}")
                            
                            await websocket.send(json.dumps({"message": f"Nuclei Execute Finish", "timestamp": time.time()}))
                            metric_task.cancel()

                            try:
                                await metric_task
                                logger.debug("Metric fetching task was Finished")
                            except asyncio.CancelledError:
                                logger.debug("Metric fetching task was cancelled")

                            if ai_flag == True:
                                if ai_task and not ai_task.done():
                                    ai_stop_event.set() 
                                    await ai_task 
        
                                metrics_port = str(get_unused_port())
                                metric_url = f"http://localhost:{metrics_port}/metrics"
                                arguments = ["-o", vuln_dir, "-fr", "-srd", conn_dir, "-irr", "-as", "-me", report_dir,"-vv", "-debug", "-stats", "-u", target] + options + ["-mp", metrics_port]

                                # arguments = ["-o", "vuln_output", "-fr", "-srd", "req_res_output", "-irr", "-as", "-me", "./markdown_output/","-vv", "-debug", "-stats", "-u", target] + options + ["-mp", metrics_port]

                                ai_stop_event = asyncio.Event() 
                                ai_task = asyncio.create_task(ai_runner(ai_stop_event, arguments, metric_url))
                            
                        case _:
                            await websocket.send(json.dumps({"message": "Target Invalid", "timestamp": time.time()}))

                case "multiple_execute":
                    targets = client_data.get('target')

                    if len(targets) <= 0:
                        await websocket.send(json.dumps({"message": "Target Length Invalid", "timestamp": time.time()}))
                        continue

                    all_valid = True
                    for t in targets:
                        status = check_http_access(t)
                        if status != 200:
                            logger.error(f"Target {t} Invalid: Status: {status}")
                            await websocket.send(json.dumps({"message": f"Target {t} Invalid", "timestamp": time.time()}))
                            all_valid = False
                            break

                    if not all_valid:
                        continue
                    
                    timestamp = time.time()
                    await websocket.send(json.dumps({"message": "All Targets Valid", "timestamp": timestamp}))

                    target_file = f"target_{timestamp}.txt"

                    try:
                        with open(target_file, "w") as f:
                            f.writelines(t+'\n' for t in targets)
                    except:
                        await websocket.send(json.dumps({"message": "Make Multiple Target List Error", "timestamp": time.time()}))
                        continue
                    
                    options = client_data.get('options')
                    
                    metrics_port = str(get_unused_port())
                    metric_url = f"http://localhost:{metrics_port}/metrics"

                    serve_dir = os.getenv("SERVING_PATH")
                    vuln_dir = f"{serve_dir}/vuln_output.md"
                    conn_dir = f"{serve_dir}/conn_output"
                    report_dir = f"{serve_dir}/markdown_output"
                    
                    arguments = ["-o", vuln_dir, "-fr", "-srd", conn_dir, "-irr", "-as", "-me", report_dir,"-vv", "-debug", "-stats", "-l", target_file] + options + ["-mp", metrics_port]

                    arguments = ["-debug", "-stats", "-l", target_file] + options + ["-mp", metrics_port]
                    fetch_delay = int(os.getenv("METRIC_FETCH_DELAY", 5))

                    metric_task = asyncio.create_task(fetch_metrics(metric_url, fetch_delay))
                    watcher.start()
                    return_code = await run_nuclei(arguments, debug=True)

                    logger.info(f"Nuclei Return Code: {return_code}")
                    
                    await websocket.send(json.dumps({"message": f"Nuclei Execute Finish", "timestamp": time.time()}))
                    metric_task.cancel()

                    try:
                        await metric_task
                    except asyncio.CancelledError:
                        logger.error("Metric fetching task was cancelled")

                    if ai_flag == True:
                        if ai_task and not ai_task.done():
                            ai_stop_event.set() 
                            await ai_task 
                        
                        metrics_port = str(get_unused_port())
                        metric_url = f"http://localhost:{metrics_port}/metrics"
                        arguments = ["-o", vuln_dir, "-fr", "-srd", conn_dir, "-irr", "-as", "-me", report_dir,"-vv", "-debug", "-stats", "-l", target_file] + options + ["-mp", metrics_port]

                        # arguments = ["-debug", "-stats", "-mp", metrics_port, "-l", target_file] + options

                        ai_stop_event = asyncio.Event() 
                        ai_task = asyncio.create_task(ai_runner(ai_stop_event, arguments, metric_url))

                            
                case "ai_stop":
                    if ai_task and not ai_task.done():
                        ai_stop_event.set() 
                        await ai_task 


                case _:
                    await websocket.send(json.dumps({"message": "Unknown Command", "timestamp": time.time()}))

    except websockets.exceptions.ConnectionClosed:
        logger.info(f"Client disconnected: {websocket.remote_address}")
        watcher.stop()
        if ai_task and not ai_task.done():
            ai_stop_event.set() 
            await ai_task 
        connected_clients.remove(websocket)


async def main():
    load_dotenv()
    bip, bport = os.getenv("BACKEND_WS_IP"), int(os.getenv("BACKEND_WS_PORT"))
    watcher.start()

    async with websockets.serve(cmd_handler, bip, bport):
        logger.info(f"WebSocket server is running on ws://{bip}:{bport}")
        await asyncio.Future() 
