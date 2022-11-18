FROM node:19-alpine3.15

WORKDIR /user/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
CMD [ "npm", "run", "start:prod" ]

