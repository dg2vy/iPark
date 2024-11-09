from runner import start_websocket_server
from logger import setup_logger
from handler import subscribe_to_metrics_channel, handler_app

import threading
import asyncio
import os

from dotenv import load_dotenv

def start_metrics_thread():
    """Metrics Subscribe Channel"""
    thread = threading.Thread(target=subscribe_to_metrics_channel, daemon=True)
    thread.start()
    return thread

def start_flask_thread(port):
    """Metric Exporter"""
    thread = threading.Thread(target=handler_app().run, kwargs={'host': '0.0.0.0', 'port': port})
    thread.start()
    return thread

async def main():
    load_dotenv()
    logger = setup_logger(__name__)
    
    start_metrics_thread()
    logger.info("Starting Metric Channel Subscriber...")

    start_flask_thread(int(os.getenv("METRIC_EXPORT_PORT", "9000")))
    logger.info("Starting Metric Export...")

    await start_websocket_server()
    logger.info("Starting WebSocket...")

if __name__ == '__main__':
    asyncio.run(main())