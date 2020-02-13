FROM node:13.8.0 as BUILDER
WORKDIR /app
COPY *.json ./
RUN [ "npm", "ci" ]
COPY ./src ./src
RUN [ "npm", "run", "build:docker"]

FROM node:13.8.0-alpine
WORKDIR /app
COPY --from=BUILDER /app/dist/ ./dist/
CMD [ "node", "--experimental-repl-await", "dist/bin/cli.js" ]
