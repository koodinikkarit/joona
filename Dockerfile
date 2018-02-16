FROM node:9.3.0-wheezy
WORKDIR /usr/src/joona
COPY ./src ./src
COPY ./public ./public
ADD package.json package.json
ADD package-lock.json package-lock.json
ADD production-app.js production-app.js
RUN npm install
RUN npm run build
CMD ["npm", "run", "start-production"]
EXPOSE 8080
