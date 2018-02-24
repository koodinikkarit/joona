FROM node:9.3.0-wheezy as builder
WORKDIR /usr/src/joona-api
ADD ./api/package.json ./package.json
ADD ./api/package-lock.json ./package-lock.json
ADD ./api/tsconfig.json ./tsconfig.json
ADD ./api/combineGraphqlSchema.js ./combineGraphqlSchema.js
COPY ./api/src ./src
RUN npm install
RUN npm run build-schemadef
RUN npm run build

FROM node:9.3.0-wheezy
WORKDIR /usr/src
COPY --from=builder ./usr/src/joona-api/dist ./dist
COPY --from=builder ./usr/src/joona-api/node_modules/ ./node_modules/
ADD ./api/package.json ./package.json
CMD ["npm", "run", "app"]
EXPOSE 8080