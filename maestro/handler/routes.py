import threading
import json
import os
from flask import Flask, Blueprint
import redis

# Flask 및 Redis 설정
app = Flask(__name__)
metrics_bp = Blueprint('metrics', __name__)
redis_client = redis.StrictRedis(host='localhost', port=int(os.getenv("REDIS_PORT", "6379")), db=0)

# 전역 변수로 최신 메트릭 데이터를 저장
latest_metrics = {}

# Redis 구독 함수 (Pub/Sub)
def subscribe_to_metrics_channel():
    global latest_metrics
    pubsub = redis_client.pubsub()
    pubsub.subscribe("metrics_channel")  # metrics_channel 채널 구독

    for message in pubsub.listen():
        if message['type'] == 'message':
            # 메시지 수신 시, latest_metrics를 업데이트
            data = json.loads(message['data'])
            latest_metrics.update(data)
            print("Metrics updated:", latest_metrics)  # 업데이트된 데이터 로그 출력

# /metrics 엔드포인트 정의
@metrics_bp.route('/metrics')
def metrics():
    # 최신 메트릭 데이터 반환
    if not latest_metrics:
        # 메트릭 데이터가 없을 경우 기본값 제공
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

# 앱 초기화 및 백그라운드 스레드에서 구독 함수 실행
app.register_blueprint(metrics_bp)
