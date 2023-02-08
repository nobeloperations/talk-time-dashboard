FROM node:18.14.0

RUN mkdir /app

WORKDIR /app

COPY . /app/

COPY ./package.json /usr/src/package.json

RUN npm install
