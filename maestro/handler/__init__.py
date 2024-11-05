from flask import Flask
from threading import Thread
from dotenv import load_dotenv # Dev Mode Only

from .metrics_fetcher import fetch_metrics
from .routes import metrics_bp

import os

load_dotenv()

# def create_app():
    
    
#     app = Flask(__name__)
#     app.register_blueprint(metrics_bp)

#     thread = Thread(target=fetch_metrics)
#     thread.start()

#     return app