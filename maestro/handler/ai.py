from logger import setup_logger
import json
import websockets
import time
import os

logger = setup_logger(__name__)

async def send_attack_request(attack_type, server_ip, server_port, path):
    
    attack_type_map = {
        'SQL Injection' : 'sqli',
        'XSS' : 'xss',
        'RCE' : 'rce',
        'File Inclusion' : 'File Inclusion',
    }
    
    url = f"ws://{server_ip}:{server_port}/ws"
    data = {
        'attack': attack_type
    }

    async with websockets.connect(url) as websocket:

        await websocket.send(json.dumps(data))
        response = await websocket.recv()

        yaml_data = json.loads(response)
        
        if isinstance(yaml_data, dict):
            if 'error' in yaml_data.keys():
                logger.info(yaml_data['error'])
            else:
                logger.info(yaml_data)
                
        elif isinstance(yaml_data, str):
            logger.info('Response : Success')


        if not os.path.exists(path):
            os.makedirs(path, exist_ok=True)

        file = f"{attack_type_map[attack_type]}_{time.time()}.yaml"
        full_path = f"{path}/{file}"

        try:
            with open(full_path, 'w') as file:
                file.write(yaml_data)
            logger.info(f"Yaml file saved : {full_path}")

        except Exception as e:
            logger.error("Error:", e)
