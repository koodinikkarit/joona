FROM node:9.3.0-wheezy
WORKDIR /usr/src/joona-frontend
COPY ./src ./src
COPY ./public ./public
ADD ./frontend/package.json package.json
ADD ./frontend/package-lock.json package-lock.json
ADD ./frontend/production-app.js production-app.js
RUN npm install
RUN npm run build
CMD ["npm", "run", "start-production"]
EXPOSE 8080
