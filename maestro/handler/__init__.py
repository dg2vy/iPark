from flask import Flask
from dotenv import load_dotenv # Dev Mode Only
from .routes import metrics_bp

# import os

load_dotenv()

app = Flask(__name__)
app.register_blueprint(metrics_bp)