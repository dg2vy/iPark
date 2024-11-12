from flask import Flask
from .routes import metrics_bp
from .ai import send_attack_request
from dotenv import load_dotenv # Dev Mode Only

load_dotenv()

def handler_app():
    app = Flask(__name__)
    app.register_blueprint(metrics_bp)

    return app

from .routes import subscribe_to_metrics_channel
from .ai import send_attack_request