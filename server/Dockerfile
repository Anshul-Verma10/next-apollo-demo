FROM node:14.0.0

WORKDIR /usr/app

COPY package.json yarn.lock /usr/app/
RUN yarn install --production
COPY . /usr/app

CMD yarn start
