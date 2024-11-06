from runner import *
from logger import setup_logger
from handler import app
from handler.routes import subscribe_to_metrics_channel
import threading
import asyncio

def run_flask_app():
    app.run(host='0.0.0.0', port=9000)

if __name__ == '__main__':
    logger = setup_logger(__name__)
    # create_app().run(host='0.0.0.0', port=9000)

    # subscribe_to_metrics_channel을 백그라운드 스레드에서 실행
    metrics_thread = threading.Thread(target=subscribe_to_metrics_channel)
    metrics_thread.daemon = True
    metrics_thread.start()

    flask_thread = threading.Thread(target=run_flask_app)
    flask_thread.start()

    logger.info("Starting WebSocket server...")
    asyncio.run(start_websocket_server())