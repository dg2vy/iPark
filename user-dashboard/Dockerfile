FROM oven/bun

RUN chown -hR bun:bun /home/bun

USER bun
WORKDIR /home/bun/app

COPY --chown=bun:bun . /home/bun/app
RUN bun install

CMD ["bun", "dev", "--host", "0.0.0.0", "--port", "4200"]
