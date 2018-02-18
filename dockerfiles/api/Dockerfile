FROM node:8.9.1-wheezy
WORKDIR /usr/src/joona-api
ADD ./api/package.json ./package.json
COPY ./api/dist ./dist
COPY ./api/node_modules ./node_modules
CMD ["npm", "run", "app"]
EXPOSE 8080