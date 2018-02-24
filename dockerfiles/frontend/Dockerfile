FROM node:9.3.0-wheezy as builder
WORKDIR /usr/joona-frontend
ADD ./frontend/package.json ./package.json
ADD ./frontend/package-lock.json ./package-lock.json
ADD ./frontend/tsconfig.json ./tsconfig.json
ADD ./frontend/tsconfig.test.json ./frontend/tsconfig.test.json
ADD ./frontend/startpoint.sh ./startpoint.sh
COPY ./frontend/public ./public
COPY ./frontend/src ./src
RUN npm install
RUN npm run build

FROM nginx
COPY --from=builder ./usr/joona-frontend/build /usr/share/nginx/html
ADD ./frontend/nginx.conf /etc/nginx/nginx.conf
ADD ./frontend/default.conf /etc/nginx/conf.d/default.conf
ADD ./frontend/startpoint.sh /usr/bin/startpoint.sh
RUN chmod +x /usr/bin/startpoint.sh
CMD ["sh", "/usr/bin/startpoint.sh"]
EXPOSE 80
