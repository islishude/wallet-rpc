ARG NODE_VERSION=10.14.2

FROM node:10.14.2-alpine
RUN apk add --no-cache ca-certificates
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY ./ ./
RUN npm run build && npm prune --production && rm -rf types *.json
CMD [ "/usr/local/bin/node", "--experimental-repl-await", "/app/dist/bin/cli.js" ]
