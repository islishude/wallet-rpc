ARG NODEJS_VERSION=13.3.0

FROM node:${NODEJS_VERSION} as BUILDER
WORKDIR /app
COPY *.json ./
RUN [ "npm", "ci" ]
COPY ./src ./src
RUN [ "npm", "run", "build:docker"]

FROM node:${NODEJS_VERSION}-alpine
WORKDIR /app
COPY --from=BUILDER /app/dist/ ./dist/
COPY --from=BUILDER /app/package.json ./
CMD [ "node", "--experimental-repl-await", "dist/bin/cli.js" ]
