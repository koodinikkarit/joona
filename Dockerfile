FROM node
WORKDIR /usr/src/joona
COPY . .
RUN npm install

CMD ["npm", "start"]


EXPOSE 22222
