FROM node:latest

WORKDIR /usr/src/api

COPY . .

RUN yarn install --quiet --no-optional --no-fund --loglevel=error

RUN yarn build

EXPOSE 3001

CMD ["yarn", "start:prod"] 