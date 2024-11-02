# app/metrics_fetcher.py
import requests
import time

latest_metrics = {}

def fetch_metrics():
    global latest_metrics
    while True:
        try:
            response = requests.get("http://localhost:8000/metrics")
            data = response.json()
            print(f"Data is {data}")
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
        time.sleep(5)

