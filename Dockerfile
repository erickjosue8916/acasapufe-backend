FROM node:14-alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN apk update && apk add --no-cache --virtual .build-deps make gcc g++ python \
    && rm -rf node_modules && yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 3000
EXPOSE 80
EXPOSE 8080

CMD [ "yarn", "start:prod" ]