import redis.asyncio as redis
import aiohttp
import asyncio
import json
import os
from logger import setup_logger

logger = setup_logger(__name__)

async def fetch_metrics(url):
    redis_client = redis.from_url(f"redis://localhost:{str(os.getenv('REDIS_PORT', 6379))}", db=0)
    metric_fetch_delay = int(os.getenv("METRIC_FETCH_DELAY", 5))

    while True:
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(url) as response:
                    if response.status != 200:
                        logger.error(f"Error: Received status code {response.status} from {url}")
                        continue
                    
                    content_type = response.headers.get("Content-Type", "")
                    if "text/plain" in content_type:
                        text = await response.text()

                        try:
                            data = json.loads(text)
                            logger.info(f"Parsed metrics: {data}")

                            metrics_data = {
                                "errors": data.get("errors", 0),
                                "matched": data.get("matched", 0),
                                "templates": data.get("templates", 0),
                                "percent_complete": float(data.get("percent", 0)),
                                "requests": data.get("requests", 0),
                                "total_requests": data.get("total", 0),
                                "hosts": data.get("hosts", 0),
                                "rps": float(data.get("rps", 0)),
                            }

                            await redis_client.publish("metrics_channel", json.dumps(metrics_data))
                            logger.info("Published metrics to metrics_channel")

                        except json.JSONDecodeError as e:
                            logger.info(f"Failed to decode JSON from response: {e}")
                    else:
                        logger.info(f"Unexpected content type: {content_type}")

        except Exception as e:
            logger.info(f"Failed to fetch metrics: {e}")

        await asyncio.sleep(metric_fetch_delay)