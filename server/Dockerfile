FROM node:latest as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npx prisma db pull

RUN npx prisma generate

CMD [ "npm", "run", "start_nossl_log" ]
