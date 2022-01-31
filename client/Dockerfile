# syntax=docker/dockerfile:1
FROM node:14.0.0
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn --ignore-engines install 
COPY . /app

RUN yarn build

CMD yarn start