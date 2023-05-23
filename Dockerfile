# Базовый образ Node.js 14
# FROM node:16-alpine

FROM nick109119/tgbot:tag1

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ENV PORT=3000
EXPOSE $PORT
CMD [ "npm", "start" ]
