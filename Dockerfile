FROM node:12.4.0 as BUILDER
WORKDIR /app
COPY src/ src/
COPY *.json ./
RUN [ "npm", "ci" ]
RUN [ "npm", "run", "build"]
RUN [ "npm", "prune", "--production"]

FROM node:12.4.0-alpine
WORKDIR /app
COPY --from=BUILDER /app/dist/ dist/
COPY --from=BUILDER /app/node_modules/ node_modules/
CMD [ "node", "--experimental-repl-await", "dist/bin/cli.js" ]
