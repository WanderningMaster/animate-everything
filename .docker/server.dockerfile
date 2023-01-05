FROM node:16.16.0-alpine as server-build

WORKDIR /app

COPY ./package*.json ./
COPY ./tsconfig.json ./
COPY ./.eslintrc.yml ./
COPY ./shared ./shared/
COPY ./core/package.json ./core/

RUN npm i -g typescript

RUN npm ci -w shared -w core
COPY ./core ./core

RUN npm run build:server
RUN rm -rf ./core/src
RUN rm -rf ./shared/src

EXPOSE 5001
CMD npm start -w core