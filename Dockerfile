FROM node:14-alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY prisma ./prisma/

RUN apk update && apk add --no-cache --virtual .build-deps make gcc g++ python \
    && rm -rf node_modules && yarn install --frozen-lockfile \
    && apk del .build-deps

COPY . .

RUN yarn build

EXPOSE 3000
EXPOSE 80

CMD [ "yarn", "start:prod" ]