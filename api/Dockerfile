FROM node:19-alpine3.15

RUN mkdir /app

WORKDIR /app

ENV PORT=3000

EXPOSE ${PORT}

COPY package*.json /app

RUN npm install

COPY . /app

RUN npm run build

CMD [ "npm", "run", "start:debug" ]