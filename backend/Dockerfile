FROM node:20-alpine3.17

WORKDIR /Express-Mongo-Skeleton
COPY package.json .
RUN npm install
COPY . .
CMD npm run dev