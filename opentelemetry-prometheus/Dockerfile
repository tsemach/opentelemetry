FROM node:22 AS builder

WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY src ./src
# RUN npm ci && npm run build && npm prune --production
RUN npm install && npm run build

# FROM node:22-alpine
# WORKDIR /usr/src/app

# RUN apk update && apk add dumb-init

# COPY package*.json ./
# COPY --from=builder /usr/src/app/node_modules ./node_modules
# COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

CMD [ "npm","run","start:dev" ]
