from handler import create_app
from runner import *
from logger import setup_logger
import asyncio

logger = setup_logger(__name__)


if __name__ == '__main__':
    # create_app().run(host='0.0.0.0', port=9000)

    logger.info("Starting WebSocket server...")
    asyncio.run(start_websocket_server())