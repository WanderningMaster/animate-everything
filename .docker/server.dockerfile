FROM node:16.16.0-alpine as server-build

WORKDIR /app

COPY ./package*.json ./
COPY ./tsconfig.json ./
COPY ./.eslintrc.yml ./
COPY ./shared ./shared/
COPY ./server/package.json ./server/

RUN npm i -g typescript

RUN npm ci -w shared -w server
COPY ./server ./server

RUN npm run build:server
RUN rm -rf ./server/src
RUN rm -rf ./shared/src

EXPOSE 5001
CMD npm start -w server