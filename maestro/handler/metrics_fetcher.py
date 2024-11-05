import requests
import time
import os

latest_metrics = {}

def fetch_metrics(metric_fetch_port):
    global latest_metrics

    metric_fetch_delay = int(os.getenv("METRIC_FETCH_DELAY"))

    while True:
        try:
            response = requests.get(f"http://localhost:{metric_fetch_port}/metrics")
            data = response.json()

            latest_metrics = {
                "errors": data.get("errors", 0),
                "matched": data.get("matched", 0),
                "templates": data.get("templates", 0),
                "percent_complete": float(data.get("percent", 0)),
                "requests": data.get("requests", 0),
                "total_requests": data.get("total", 0),
                "hosts": data.get("hosts", 0),
                "rps": float(data.get("rps", 0)),
            }

            print("Updated metrics:", latest_metrics)
        except Exception as e:
            print("Failed to fetch metrics:", e)

        time.sleep(metric_fetch_delay)