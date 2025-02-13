FROM oven/bun
COPY . .
RUN bun install
CMD ["bun", "./src/app.ts"]