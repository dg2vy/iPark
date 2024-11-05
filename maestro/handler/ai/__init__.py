import json
import websockets

async def send_attack_request(attack, server_ip, server_port, save_path='./template/'):
    if save_path[-1] != '/': save_path += '/'

    # 경로가 존재하는 지 검사 ( 없으면 자동 생성 )
    if not os.path.exists(save_path):
        os.makedirs(save_path)

    attack_map = {
        'SQL Injection' : 'sqli',
        'XSS' : 'xss'
    }
    
    url = f"ws://{server_ip}:{server_port}"
    data = {
        'attack': attack
    }

    async with websockets.connect(url) as websocket:
        await websocket.send(json.dumps(data)) # json 형식으로 데이터 전송
        response = await websocket.recv() # 서버로부터 응답 수신

        # json 형식으로 응답 parsing
        yaml_data = json.loads(response)
        
        if isinstance(yaml_data, dict):
            if 'error' in yaml_data.keys():
                print(yaml_data['error'])
            else:
                print(yaml_data)
            exit()
        elif isinstance(yaml_data, str):
            print('Response : Success')

        try:
            with open(f'{save_path}{attack_map[attack]}_new.yaml', 'w') as file:
                file.write(yaml_data)
            print(f"Yaml file saved : {save_path}{attack_map[attack]}_new.yaml")
        except Exception as e:
            print("Error:", e)
