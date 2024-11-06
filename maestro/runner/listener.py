import asyncio
import websockets
import json
import time
from datetime import datetime

import os

from dotenv import load_dotenv # Dev Mode Only
from .tools import get_unused_port, check_http_access

from handler.metrics_fetcher import fetch_metrics
from logger import setup_logger

logger = setup_logger(__name__)

async def run_nuclei(arguments, debug=False):

    nuclei_path = os.getenv(
        "NUCLEI_BIN_PATH",
        os.path.join(os.path.expanduser("~"), 'go', 'bin', 'nuclei')
    )

    logger.debug(f"Execute Command: {nuclei_path} {" ".join(arguments)}")

    process = await asyncio.create_subprocess_exec(
        nuclei_path,  # 실행할 바이너리
        *arguments,  # 인자를 unpack하여 전달
        stdout=asyncio.subprocess.PIPE,  # 표준 출력을 파이프에 연결
        stderr=asyncio.subprocess.PIPE   # 표준 오류를 파이프에 연결
    )

    if debug == True:
        async def read_output(stream, is_error=False):
            while True:
                line = await stream.readline()  # 한 줄씩 읽기
                if not line:
                    break
                logger.info(f"{line.decode().strip()}")  # 출력하기

        # 표준 출력과 오류를 동시에 읽기
        await asyncio.gather(
            read_output(process.stdout),  # 표준 출력 읽기
            read_output(process.stderr, is_error=True)  # 표준 오류 읽기
        )
    else:
    # 프로세스가 완료될 때까지 기다리기
        stdout, stderr = await process.communicate()

        if stdout:
            output = stderr.decode()
            logger.info(output)

        if stderr:
            error = stderr.decode()
            logger.error(error)
            if error:
                logger.error(f"Error:\n{error}")
                # 에러를 파일로 저장
                with open(f"error{time.time()}.log", 'a') as error_file:  # 'a' 모드로 추가
                    error_file.write(error)


    return process.returncode  # 프로세스의 종료 코드 반환

async def send_data(websocket, path):
    while True:
        client_message = await websocket.recv()
        client_data = json.loads(client_message)
        logger.info(client_data)

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
                        return_code = await run_nuclei(arguments, debug=False)
                        
                        websocket.send(json.dumps({"message": f"Nuclei Return Code: {return_code}", "timestamp": time.time()}))
                        metric_task.cancel()

                        try:
                            await metric_task
                        except asyncio.CancelledError:
                            logger.error("Metric fetching task was cancelled")

                    case _:
                        await websocket.send(json.dumps({"message": "Target Invalid", "timestamp": time.time()}))
            case _:
                await websocket.send(json.dumps({"message": "Unknown Command", "timestamp": time.time()}))

async def main():
    load_dotenv()

    async with websockets.serve(send_data, os.getenv("BACKEND_WS_IP"), int(os.getenv("BACKEND_WS_PORT"))):
        logger.info(f"WebSocket server is running on ws://{os.getenv('BACKEND_WS_IP')}:{os.getenv('BACKEND_WS_PORT')}")
        await asyncio.Future() 
