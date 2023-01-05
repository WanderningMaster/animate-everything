FROM node:16.16.0-alpine as transcoding-server-build

WORKDIR /app

RUN apk update
RUN apk add
RUN apk add ffmpeg

COPY ./package*.json ./
COPY ./tsconfig.json ./
COPY ./.eslintrc.yml ./
COPY ./shared ./shared/
COPY ./transcoding-server ./transcoding-server

RUN npm i -g typescript

RUN npm pkg set scripts.postinstall="npm run build:shared"
RUN npm ci -w shared -w transcoding-server

RUN npm run build:transcoder
RUN rm -rf ./transcoding-server/src
RUN rm -rf ./shared/src

EXPOSE 5003
CMD npm start -w transcoding-server
