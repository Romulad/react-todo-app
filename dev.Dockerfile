FROM node:22-alpine

LABEL maintainer="Romuald Oluwatobi <romualdnoualinon@gmail.com>"
LABEL description="Docker image to run a react TODO app in development"

WORKDIR /app

COPY *.json .

RUN npm install

CMD [ "npm", "start" ]

EXPOSE 3000