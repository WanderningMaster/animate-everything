FROM node:16.16.0-alpine as client-build

WORKDIR /app

COPY ./package*.json ./
COPY ./tsconfig.json ./
COPY ./.eslintrc.yml ./
COPY ./shared ./shared/
COPY ./client/package.json ./client/

RUN npm ci -w shared -w client
COPY ./client ./client

RUN npm run build:client

FROM nginx:1.22.0-alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=client-build /app/client/build/ /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]