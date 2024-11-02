# app/routes.py
from flask import Blueprint
from .metrics_fetcher import latest_metrics

metrics_bp = Blueprint('metrics', __name__)

@metrics_bp.route('/metrics')
def metrics():
    metrics_data = [
        f'nuclei_errors {latest_metrics.get("errors", 0)}',
        f'nuclei_matched {latest_metrics.get("matched", 0)}',
        f'nuclei_templates {latest_metrics.get("templates", 0)}',
        f'nuclei_percent_complete {latest_metrics.get("percent_complete", 0.0)}',
        f'nuclei_requests {latest_metrics.get("requests", 0)}',
        f'nuclei_total_requests {latest_metrics.get("total_requests", 0)}',
        f'nuclei_hosts {latest_metrics.get("hosts", 0)}',
        f'nuclei_rps {latest_metrics.get("rps", 0.0)}'
    ]
    return "\n".join(metrics_data), 200, {'Content-Type': 'text/plain'}

