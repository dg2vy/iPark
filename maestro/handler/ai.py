from logger import setup_logger
import json
import websockets
import time
import os

logger = setup_logger(__name__)

async def send_attack_request(attack_type, server_ip, server_port, root_template_path):
    
    attack_type_map = {
        'SQL Injection' : 'sqli',
        'XSS' : 'xss',
        'RCE' : 'rce'
    }
    
    url = f"ws://{server_ip}:{server_port}/ws"
    data = {
        'attack': attack_type
    }

    async with websockets.connect(url) as websocket:

        await websocket.send(json.dumps(data)) # json 형식으로 데이터 전송
        response = await websocket.recv() # 서버로부터 응답 수신

        # json 형식으로 응답 parsing
        yaml_data = json.loads(response)
        
        if isinstance(yaml_data, dict):
            if 'error' in yaml_data.keys():
                logger.info(yaml_data['error'])
            else:
                logger.info(yaml_data)
                
        elif isinstance(yaml_data, str):
            logger.info('Response : Success')


        if not os.path.exists(root_template_path):
            os.makedirs(root_template_path, exist_ok=True)

        file = f"{attack_type_map[attack_type]}_{time.time()}.yaml"
        full_path = f"{root_template_path}/{file}"

        try:
            with open(full_path, 'w') as file:
                file.write(yaml_data)
            logger.info(f"Yaml file saved : {full_path}")

            return full_path

        except Exception as e:
            logger.error("Error:", e)
