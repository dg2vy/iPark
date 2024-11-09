from urllib.parse import urlparse
import socket
import requests

def get_unused_port():
    """Return Unused Port"""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('', 0))
        port = s.getsockname()[1]
    return port

def check_http_access(url: str):
    """http / https URL Health Check"""
    try:
        parsed_url = urlparse(url)
        if parsed_url.scheme not in ("http", "https"):
            return "PERROR"
        
        response = requests.get(url, timeout=5, allow_redirects=True)
        return response.status_code
        
    except (requests.RequestException, ValueError):
        return None