FROM node:17

RUN apt update -y
RUN apt install -y iputils-ping curl vim net-tools iputils-ping telnet

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ ./

CMD npm start
