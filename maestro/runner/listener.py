from .tools import *
from handler.metrics_fetcher import fetch_metrics
from logger import setup_logger

import asyncio
import websockets
import json
import time
import os

from dotenv import load_dotenv

logger = setup_logger(__name__)

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
    while True:
        client_message = await websocket.recv()
        client_data = json.loads(client_message)
        logger.info(f"Cliend Data: {client_data}")

        match client_data.get("command"):
            case "check":
                await websocket.send(json.dumps({"message": "Connected", "timestamp": time.time()}))

            case "execute":
                target = client_data.get('target')

                if len(target) <= 0:
                    await websocket.send(json.dumps({"message": "No Target", "timestamp": time.time()}))
                    continue
                
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
                        return_code = await run_nuclei(arguments)
                        
                        await websocket.send(json.dumps({"message": f"Nuclei Return Code: {return_code}", "timestamp": time.time()}))
                        metric_task.cancel()

                        try:
                            await metric_task
                        except asyncio.CancelledError:
                            logger.error("Metric fetching task was cancelled")

                    case _:
                        await websocket.send(json.dumps({"message": "Target Invalid", "timestamp": time.time()}))

            case "multiple_execute":
                targets = client_data.get('target')

                if len(targets) >= 0:
                    await websocket.send(json.dumps({"message": "Target Length Invalid", "timestamp": time.time()}))
                    continue

                if all(check_http_access(t) == 200 for t in target):
                    await websocket.send(json.dumps({"message": "All Targets Valid", "timestamp": time.time()}))
                    
                    options = client_data.get('options', [])
                    
                    metrics_port = str(get_unused_port())
                    metric_url = f"http://localhost:{metrics_port}/metrics"

                    url_options = ["-u " + t for t in targets]
                    arguments = ["-stats", "-mp", metrics_port] + url_options + options

                    metric_task = asyncio.create_task(fetch_metrics(metric_url))
                    return_code = await run_nuclei(arguments, debug=False)
                    
                    await websocket.send(json.dumps({"message": f"Nuclei Return Code: {return_code}", "timestamp": time.time()}))
                    metric_task.cancel()

                    try:
                        await metric_task
                    except asyncio.CancelledError:
                        logger.error("Metric fetching task was cancelled")
                else:
                    await websocket.send(json.dumps({"message": "One or more targets are invalid", "timestamp": time.time()}))

                        
            case _:
                await websocket.send(json.dumps({"message": "Unknown Command", "timestamp": time.time()}))

async def main():
    load_dotenv()

    async with websockets.serve(cmd_handler, os.getenv("BACKEND_WS_IP"), int(os.getenv("BACKEND_WS_PORT"))):
        logger.info(f"WebSocket server is running on ws://{os.getenv('BACKEND_WS_IP')}:{os.getenv('BACKEND_WS_PORT')}")
        await asyncio.Future() 
