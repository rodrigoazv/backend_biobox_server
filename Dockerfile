FROM node:12.16.2-alpine

WORKDIR /usr/app
COPY package*.json yarn.lock ./
RUN yarn

COPY . .

EXPOSE 3333 