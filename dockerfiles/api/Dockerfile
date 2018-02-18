FROM node:8.9.1-wheezy
WORKDIR /usr/src/joona-api
ADD ./api/package.json ./package.json
ADD ./api/package-lock.json ./package.json
COPY ./src ./src
RUN npm install