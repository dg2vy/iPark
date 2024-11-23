import asyncio
import os
import threading
from dotenv import load_dotenv
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import aiofiles
import json
import websockets
from logger import setup_logger

logger = setup_logger(__name__)


class WebSocketFileServer:
    def __init__(self, ip, port, directory):
        self.ip = ip
        self.port = port
        self.directory = directory
        self.stop_event = threading.Event()
        self.thread = None
        self.connected_clients = set()

    async def websocket_handler(self, websocket):
        """WebSocket 클라이언트 연결 처리"""
        self.connected_clients.add(websocket)
        logger.info("Client connected.")
        try:
            await websocket.wait_closed()
        finally:
            self.connected_clients.remove(websocket)
            logger.info("Client disconnected.")

    async def read_file_content(self, file_path):
        """파일 내용을 비동기로 읽어 반환"""
        try:
            async with aiofiles.open(file_path, mode="r", encoding="utf-8") as f:
                return await f.read()
        except FileNotFoundError:
            logger.warning(f"File not found: {file_path}")
            return None
        except Exception as e:
            logger.error(f"Error reading file {file_path}: {e}")
            return None

    async def notify_changes(self, handler):
        """감지된 파일 변경 내용을 WebSocket 클라이언트로 전송"""
        while not self.stop_event.is_set():
            if handler.modified_files:
                changes = list(handler.modified_files)
                handler.modified_files.clear()

                updates = []
                for file_path in changes:
                    content = await self.read_file_content(file_path)
                    if content is not None:
                        serve_dir = os.getenv("SERVING_PATH")
                        vuln_dir = f"{serve_dir}/vuln_output.md"
                        conn_dir = f"{serve_dir}/conn_output"
                        report_dir = f"{serve_dir}/markdown_output"

                        file_path = file_path.replace(vuln_dir, '')
                        file_path = file_path.replace(conn_dir, '')
                        file_path = file_path.replace(report_dir, '')

                        updates.append({"file": file_path, "content": content})

                if self.connected_clients and updates:
                    await asyncio.gather(
                        *[client.send(json.dumps(updates)) for client in self.connected_clients]
                    )
            await asyncio.sleep(2)  # 2초마다 확인

    async def start_websocket_server(self):
        """WebSocket 서버 및 디렉토리 감시 시작"""
        event_handler = DirectoryChangeHandler()
        observer = Observer()
        observer.schedule(event_handler, self.directory, recursive=True)
        observer.start()
        logger.info(f"Watching directory: {self.directory}")

        try:
            async with websockets.serve(self.websocket_handler, self.ip, self.port):
                logger.info(f"WebSocket server is running on ws://{self.ip}:{self.port}")
                await asyncio.gather(
                    self.notify_changes(event_handler),  # 변경 사항 감지 및 알림
                    asyncio.sleep(0.1),                 # 종료 신호 대기
                )
        except asyncio.CancelledError:
            pass
        finally:
            observer.stop()
            observer.join()
            logger.info("WebSocket server stopped.")

    def start(self):
        """서버를 별도의 스레드에서 실행"""
        def run():
            asyncio.run(self.start_websocket_server())

        if not os.path.exists(self.directory):
            os.makedirs(self.directory)

        self.thread = threading.Thread(target=run, daemon=True)
        self.thread.start()
        logger.info("WebSocket server thread started.")

    def stop(self):
        """서버 스레드 중지"""
        logger.info("Stopping WebSocket server...")
        self.stop_event.set()
        if self.thread and self.thread.is_alive():
            self.thread.join()
        logger.info("WebSocket server thread stopped.")


class DirectoryChangeHandler(FileSystemEventHandler):
    """파일 변경 이벤트를 처리하는 핸들러"""
    def __init__(self):
        self.modified_files = set()

    def on_modified(self, event):
        if not event.is_directory:
            self.modified_files.add(event.src_path)

    def on_created(self, event):
        if not event.is_directory:
            self.modified_files.add(event.src_path)

    def on_deleted(self, event):
        if not event.is_directory:
            self.modified_files.add(event.src_path)


# 환경 변수 로드 및 서버 초기화
load_dotenv()
ip = os.getenv("FILE_SERVE_WS_IP")
port = int(os.getenv("FILE_SERVE_WS_PORT"))
directory = os.getenv("SERVING_PATH")

websocket_server = WebSocketFileServer(ip, port, directory)