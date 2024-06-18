FROM node:17-alpine

WORKDIR /app/api

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8800

CMD [ "npm", "start" ]