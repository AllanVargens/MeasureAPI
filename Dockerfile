FROM node:latest

WORKDIR /usr/src/api

COPY . .

RUN yarn install 

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"] 