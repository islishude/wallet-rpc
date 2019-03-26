FROM node:10.15.3-alpine
RUN apk add --no-cache ca-certificates
WORKDIR /app
COPY package*.json dist ./
RUN npm ci --only=production
CMD [ "/usr/local/bin/node", "--experimental-repl-await", "/app/bin/cli.js" ]
