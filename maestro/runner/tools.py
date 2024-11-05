import socket
import requests
from urllib.parse import urlparse

def get_unused_port():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('', 0))
        port = s.getsockname()[1]
    return port

def check_http_access(url):
    try:
        parsed_url = urlparse(url)
        if parsed_url.scheme not in ("http", "https"):
            return "PERROR"
        
        response = requests.get(url, timeout=5, allow_redirects=True)
        return response.status_code
        
    except (requests.RequestException, ValueError):
        return None
