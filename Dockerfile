FROM oven/bun:latest

COPY . .

RUN bun install
RUN bun run build

CMD ["bun", "run", "start"]