FROM node:22-alpine

LABEL maintainer="Romuald Oluwatobi <romualdnoualinon@gmail.com>"
LABEL description="Docker image to run a react TODO app"

WORKDIR /app

COPY *.json .

RUN npm install

COPY . .

CMD [ "npm", "start" ]

EXPOSE 3000