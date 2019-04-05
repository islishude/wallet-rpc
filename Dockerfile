FROM node:10.15.3 as BUILDER
WORKDIR /app
COPY src/ src/
COPY *.json ./
RUN [ "npm", "ci" ]
RUN [ "npm", "run", "build"]
RUN [ "npm", "prune", "--production"]

FROM node:10.15.3-alpine
WORKDIR /app
COPY --from=BUILDER /app/dist/ /app/dist/
COPY --from=BUILDER /app/node_modules /app/node_modules
CMD [ "node", "--experimental-repl-await", "/app/dist/bin/cli.js" ]
