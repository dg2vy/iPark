from .tools import *
from handler.metrics_fetcher import fetch_metrics
from logger import setup_logger
from handler.ai import send_attack_request

import asyncio
import websockets
import json
import time
import os

from dotenv import load_dotenv

logger = setup_logger(__name__)

async def ai_runner(event, arguments, metric_url):
    ai_ip = os.getenv('AI_IP')
    ai_port = os.getenv('AI_PORT')
    root_template_folder = os.getenv('AI_TEMPLATE_PATH', '../ai_generated_template')

    if not os.path.exists(root_template_folder):
        os.mkdir(root_template_folder)

    while not event.is_set():  # 이벤트가 설정되지 않은 동안 계속 실행
        logger.info("Running ai background task")

        for attack in ['RCE', 'XSS', 'SQL Injection']:
            tempalte_path = await send_attack_request(attack, ai_ip, ai_port, root_template_folder)
            
            arguments.append("-t")
            arguments.append(tempalte_path)

            metric_task = asyncio.create_task(fetch_metrics(metric_url))

            logger.info(f"AI Template Included Arguments: {arguments}")

            return_code = await run_nuclei(arguments, debug=True)
            logger.info(f"Nuclei Return Code: {return_code}")  
            
            metric_task.cancel()  
            arguments.pop()
            arguments.pop()
            await asyncio.sleep(1)                     

    logger.info("Background task stopped")


async def run_nuclei(arguments, debug=False):

    nuclei_path = os.getenv(
        "NUCLEI_BIN_PATH",
        os.path.join(os.path.expanduser("~"), 'go', 'bin', 'nuclei')
    )

    logger.debug(f"Execute Command: {nuclei_path} {" ".join(arguments)}")

    process = await asyncio.create_subprocess_exec(
        nuclei_path,
        *arguments,
        stdout=asyncio.subprocess.PIPE, 
        stderr=asyncio.subprocess.PIPE
    )

    if debug == True:
        async def read_output(stream, is_error=False):
            while True:
                line = await stream.readline()
                if not line:
                    break
                logger.info(f"{line.decode().strip()}")

        await asyncio.gather(
            read_output(process.stdout),
            read_output(process.stderr, is_error=True)
        )
    else:
        stdout, stderr = await process.communicate()

        if stdout is not None:
            output = stderr.decode()
            logger.info(output)

        if stderr is not None:
            error = stderr.decode()
            logger.error(error)

            # if error:
                # with open(f"error{time.time()}.log", 'a') as error_file:
                #     error_file.write(error)

    return process.returncode

async def cmd_handler(websocket, _):
    ai_stop_event = None  # ai_stop_event 초기화
    ai_task = None     # ai_task 초기화

    while True:
        client_message = await websocket.recv()
        client_data = json.loads(client_message)
        logger.info(f"Cliend Data: {client_data}")

        match client_data.get("command"):
            case "check":
                await websocket.send(json.dumps({"message": "Connected", "timestamp": time.time()}))

            case "execute":
                target = client_data.get('target')
                match check_http_access(target):
                    case "PERROR":
                        await websocket.send(json.dumps({"message": "Protocol Invalid", "timestamp": time.time()}))

                    case 200:
                        await websocket.send(json.dumps({"message": "Target Valid", "timestamp": time.time()}))
                        options = client_data.get('options', [])
                        metrics_port = str(get_unused_port())
                        metric_url = f"http://localhost:{metrics_port}/metrics"
                        arguments = ["-stats", "-mp", metrics_port, "-u", target] + options
                            
                        metric_task = asyncio.create_task(fetch_metrics(metric_url))
                        return_code = await run_nuclei(arguments, debug=True)
                        logger.info(f"Nuclei Return Code: {return_code}")
                        
                        await websocket.send(json.dumps({"message": f"Nuclei Execute Finish", "timestamp": time.time()}))
                        metric_task.cancel()
                        
                        try:
                            await metric_task
                        except asyncio.CancelledError:
                            logger.debug("Metric fetching task was cancelled")

                        while True:
                            try:
                                new_message = await asyncio.wait_for(websocket.recv(), timeout=2.0)
                                new_data = json.loads(new_message)
                                logger.info(f"Client Data: {new_data}")

                                match new_data.get("command"):
                                    case "ai_start":   
                                        if ai_task and not ai_task.done():
                                            ai_stop_event.set()         # 기존 이벤트 설정하여 작업 중지
                                            await ai_task            # 이전 백그라운드 작업이 완료될 때까지 대기
                                        
                                        metrics_port = str(get_unused_port())
                                        metric_url = f"http://localhost:{metrics_port}/metrics"

                                        ai_stop_event = asyncio.Event() 
                                        ai_task = asyncio.create_task(ai_runner(ai_stop_event, arguments, metric_url))

                                    case "ai_stop":
                                        if ai_task and not ai_task.done():
                                            ai_stop_event.set()         # 이벤트 설정하여 작업 중지
                                            await ai_task            # 백그라운드 작업이 완료될 때까지 대기
                                        break
                        
                            except asyncio.TimeoutError:
                                continue

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
                
                arguments = ["-stats", "-mp", metrics_port, "-l", target_file] + options

                metric_task = asyncio.create_task(fetch_metrics(metric_url))
                return_code = await run_nuclei(arguments, debug=True)

                logger.info(f"Nuclei Return Code: {return_code}")
                
                await websocket.send(json.dumps({"message": f"Nuclei Execute Finish", "timestamp": time.time()}))
                metric_task.cancel()

                try:
                    await metric_task
                except asyncio.CancelledError:
                    logger.error("Metric fetching task was cancelled")

                while True:
                    try:
                        new_message = await asyncio.wait_for(websocket.recv(), timeout=2.0)
                        new_data = json.loads(new_message)
                        logger.info(f"Client Data: {new_data}")

                        match new_data.get("command"):
                            case "ai_start":   
                                if ai_task and not ai_task.done():
                                    ai_stop_event.set()         # 기존 이벤트 설정하여 작업 중지
                                    await ai_task            # 이전 백그라운드 작업이 완료될 때까지 대기
                                
                                metrics_port = str(get_unused_port())
                                metric_url = f"http://localhost:{metrics_port}/metrics"

                                ai_stop_event = asyncio.Event() 
                                ai_task = asyncio.create_task(ai_runner(ai_stop_event, arguments, metric_url))

                            case "ai_stop":
                                if ai_task and not ai_task.done():
                                    ai_stop_event.set()         # 이벤트 설정하여 작업 중지
                                    await ai_task            # 백그라운드 작업이 완료될 때까지 대기

                                if os.path.exists(target_file):
                                    os.remove(target_file)
                                    logger.info(f"Target File '{target_file}' is Deleted")
                                break
                
                    except asyncio.TimeoutError:
                        continue
                        
            case _:
                await websocket.send(json.dumps({"message": "Unknown Command", "timestamp": time.time()}))

async def main():
    load_dotenv()

    async with websockets.serve(cmd_handler, os.getenv("BACKEND_WS_IP"), int(os.getenv("BACKEND_WS_PORT"))):
        logger.info(f"WebSocket server is running on ws://{os.getenv('BACKEND_WS_IP')}:{os.getenv('BACKEND_WS_PORT')}")
        await asyncio.Future() 
