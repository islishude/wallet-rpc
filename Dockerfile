FROM node:12.5.0 as BUILDER
WORKDIR /app
COPY ./ ./
RUN [ "npm", "ci" ]
RUN [ "npm", "run", "build:docker"]
RUN [ "npm", "prune", "--production"]

FROM node:12.5.0-alpine
WORKDIR /app
COPY --from=BUILDER /app/dist/ dist/
COPY --from=BUILDER /app/node_modules/ node_modules/
COPY --from=BUILDER /app/package.json .
CMD [ "node", "--experimental-repl-await", "dist/bin/cli.js" ]
