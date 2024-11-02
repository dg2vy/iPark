# app/__init__.py
from flask import Flask
from threading import Thread
from .metrics_fetcher import fetch_metrics
from .routes import metrics_bp

def create_app():
    app = Flask(__name__)
    app.register_blueprint(metrics_bp)

    # 백그라운드 스레드에서 메트릭 업데이트 시작
    thread = Thread(target=fetch_metrics)
    thread.start()

    return app

