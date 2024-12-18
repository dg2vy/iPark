import threading
import json
import os
from flask import Flask, Blueprint
import redis

app = Flask(__name__)
metrics_bp = Blueprint('metrics', __name__)
redis_client = redis.StrictRedis(host='localhost', port=int(os.getenv("REDIS_PORT", "6379")), db=0)

latest_metrics = {}

def subscribe_to_metrics_channel():
    global latest_metrics
    pubsub = redis_client.pubsub()
    pubsub.subscribe("metrics_channel")

    for message in pubsub.listen():
        if message['type'] == 'message':
            data = json.loads(message['data'])
            latest_metrics.update(data)

@metrics_bp.route('/metrics')
def metrics():
    if not latest_metrics:
        metrics_data = {
            "errors": 0,
            "matched": 0,
            "templates": 0,
            "percent_complete": 0.0,
            "requests": 0,
            "total_requests": 0,
            "hosts": 0,
            "rps": 0.0
        }
    else:
        metrics_data = latest_metrics

    response_data = "\n".join([f'nuclei_{key} {value}' for key, value in metrics_data.items()])
    return response_data, 200, {'Content-Type': 'text/plain'}

app.register_blueprint(metrics_bp)