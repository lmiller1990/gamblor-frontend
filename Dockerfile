FROM node:10.16-alpine as build-stage

RUN mkdir /app
WORKDIR /app
COPY package.json /app/package.json
RUN yarn install

COPY . /app
RUN yarn build
FROM nginx:alpine
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/build /usr/share/nginx/html
