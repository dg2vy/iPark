FROM python:3.12-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    wget \
    tar \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

ENV GOLANG_VERSION=1.21.1
RUN wget https://go.dev/dl/go${GOLANG_VERSION}.linux-amd64.tar.gz && \
    tar -C /usr/local -xzf go${GOLANG_VERSION}.linux-amd64.tar.gz && \
    rm go${GOLANG_VERSION}.linux-amd64.tar.gz

ENV PATH="/usr/local/go/bin:${PATH}"

RUN go install -v github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest


WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    ca-certificates \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN pip install poetry

COPY pyproject.toml poetry.lock /app/
COPY . /app/

RUN poetry config virtualenvs.create false && poetry install --only main --no-root

CMD ["poetry", "run", "python3", "main.py"]
