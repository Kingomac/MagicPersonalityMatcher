FROM node:latest

WORKDIR /usr/src/app

COPY ./frontend .

RUN npm i

CMD sleep 30 && npm run build && npm start