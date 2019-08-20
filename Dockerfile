ARG NODEJS_VERSION=12.9.0

FROM node:${NODEJS_VERSION} as BUILDER
WORKDIR /app
COPY ./ ./
RUN [ "npm", "ci" ]
RUN [ "npm", "run", "build:docker"]
RUN [ "npm", "prune", "--production"]

FROM node:${NODEJS_VERSION}-alpine
WORKDIR /app
COPY --from=BUILDER /app/dist/ dist/
COPY --from=BUILDER /app/node_modules/ node_modules/
COPY --from=BUILDER /app/package.json .
CMD [ "node", "--experimental-repl-await", "dist/bin/cli.js" ]
