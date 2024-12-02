# Introduction

인프라와 네트워크의 많은 발전에 따라 보안 취약점에 대한 관심이 증가하고 있으며, 이에 따라 많은 기업들이 취약점을 탐지하기 위해 Fuzzing 기술을 도입하고 있다. Fuzzing은 소프트웨어 테스팅 기법으로, 소프트웨어에 버그를 유발하거나 취약점을 식별할 수 있는 입력 값을 제공하여 취약점을 찾아내는 기술이다. 이 프로젝트는 Nuclei Web Fuzzer에 LLM(Llama3.1 8B)을 결합하여 자동으로 페이로드를 생성하고 이를 Web Fuzzing에 사용하는 것을 목표로 한다.

## Implementing an AI WebSocket Server

이 저장소에는 AI WebSocket Server의 소스코드가 공개되어 있지 않다. (만약 AI WebSocket Server를 사용하고 싶지 않을 경우, 대시보드의 AI 사용 옵션을 체크 해제하면 된다.)

```json
{
  "attack": "<attack_type>"
}
```
AI WebSocket Server를 사용하고자 할 경우, 위와 같은 요청을 처리할 수 있어야 한다. (전체 소스 코드는 [`maestro/handler/ai.py`](https://github.com/dg2vy/iPark/blob/main/maestro/handler/ai.py) 참고)
이 레포지토리에 업로드된 소스 코드의 경우 총 4가지 종류의 공격 템플릿을 AI WebSocket Server에 순차적으로 요청한다. (SQL Injection, Cross-Site Scripting, Remote Code Execution, File Inclusion)

# How to Use

>`docker compose up -d`으로 실행하기 전에 반드시 `.env`가 정의되어 있어야 한다.

```bash
git clone https://github.com/dg2vy/iPark.git
cd iPark
docker compose up -d
```

# `.env` Example

```
# maestro
METRIC_FETCH_DELAY=5
METRIC_EXPORT_PORT=9000
BACKEND_WS_IP=0.0.0.0
BACKEND_WS_PORT=6789
FILE_SERVE_WS_IP=0.0.0.0
FILE_SERVE_WS_PORT=5678
REDIS_PORT=6379
NUCLEI_BIN_PATH=/root/go/bin/nuclei
AI_TEMPLATE_PATH=./ai_generated_template
SERVING_PATH=/app/OUTPUT
AI_IP=<YOUR_AI_ADDRESS>
AI_PORT=8000

# user-dashboard
VITE_MACHINE_IP=<YOUR_MACHINE_ADDRESS>
VITE_BACKEND_WS_PORT=6789
VITE_FILE_SERVE_WS_PORT=5678

# prometheus
PROMETHEUS_PORT=9090

# grafana
GRAFANA_PORT=3000
GF_SECURITY_ADMIN_USER=admin
GF_SECURITY_ADMIN_PASSWORD=grafana
```

## Describe each environment variable
### Maestro

| 환경 변수 이름             | 기본값                       | 설명                                      |
| -------------------- | ------------------------- | --------------------------------------- |
| `METRIC_FETCH_DELAY` | `5`                       | 메트릭을 가져오는 데 사용하는 주기 (초 단위).             |
| `METRIC_EXPORT_PORT` | `9000`                    | 메트릭 데이터를 외부로 노출하는 포트.                   |
| `BACKEND_WS_IP`      | `0.0.0.0`                 | 백엔드 WebSocket 서버의 IP 주소.                |
| `BACKEND_WS_PORT`    | `6789`                    | 백엔드 WebSocket 서버의 포트.                   |
| `FILE_SERVE_WS_IP`   | `0.0.0.0`                 | 파일 송수신용 WebSocket 서버의 IP 주소.            |
| `FILE_SERVE_WS_PORT` | `5678`                    | 파일 송수신용 WebSocket 서버의 포트.               |
| `REDIS_PORT`         | `6379`                    | Redis 서버가 사용하는 포트.                      |
| `NUCLEI_BIN_PATH`    | `/root/go/bin/nuclei`     | Nuclei 바이너리 파일의 실행 경로.                  |
| `AI_TEMPLATE_PATH`   | `./ai_generated_template` | AI가 생성한 템플릿 파일이 저장된 경로.                 |
| `SERVING_PATH`       | `/app/OUTPUT`             | Nuclei의 공격 결과 보고서 및 요청/응답 데이터를 저장하는 경로. |
| `AI_IP`              | `-`                       | AI WebSocket 서버의 IP 주소.                 |
| `AI_PORT`            | `8000`                    | AI WebSocket 서버의 포트.                    |

### User-Dashboard

| 환경 변수 이름                  | 기본값    | 설명                                                     |
| ------------------------- | ------ | ------------------------------------------------------ |
| `VITE_MACHINE_IP`         | `-`    | 사용자의 로컬 머신 IP 주소.                                      |
| `VITE_BACKEND_WS_PORT`    | `6789` | 백엔드 WebSocket 서버의 포트, `BACKEND_WS_PORT`와 같아야 함.        |
| `VITE_FILE_SERVE_WS_PORT` | `5678` | 파일 송수신용 WebSocket 서버의 포트, `FILE_SERVE_WS_PORT`와 같아야 함. |

### Prometheus

| 환경 변수 이름          | 기본값    | 설명                      |
| ----------------- | ------ | ----------------------- |
| `PROMETHEUS_PORT` | `9090` | Prometheus 서버가 사용하는 포트. |

### Grafana

| 환경 변수 이름           | 기본값                | 설명                                                              |
|--------------------------|-----------------------|-------------------------------------------------------------------|
| `GRAFANA_PORT`           | `3000`                | Grafana 대시보드가 사용하는 포트.                                  |
| `GF_SECURITY_ADMIN_USER` | `admin`               | Grafana 관리자 계정의 사용자 이름.                                 |
| `GF_SECURITY_ADMIN_PASSWORD` | `grafana`        | Grafana 관리자 계정의 비밀번호.                                    |

# Reference

- [nuclei](https://github.com/projectdiscovery/nuclei)
- [Prometheus & Grafana `Dockerfile`](https://github.com/docker/awesome-compose/blob/master/prometheus-grafana/README.md)