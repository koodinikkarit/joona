FROM node:9.3.0-wheezy as builder
WORKDIR /usr/src
COPY ./src ./src
COPY ./public ./public
ADD package-lock.json package-lock.json
ADD package.json package.json
ADD tsconfig.json tsconfig.json
ADD tsconfig.test.json tsconfig.test.json
ADD tslint.json tslint.json
RUN npm install
RUN npm run build-schema-types
RUN npm run build

FROM nginx:1.13
COPY --from=builder /usr/src/build /usr/share/nginx/html
CMD nginx -g 'daemon off;'