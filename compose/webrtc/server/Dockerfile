FROM node:12.18.2

ENV NODE_ENV=development

WORKDIR /app

COPY /client/package.json ./

RUN yarn install --force && yarn cache clean --force
