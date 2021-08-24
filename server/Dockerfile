FROM node:14.16.1

WORKDIR /app

COPY package.json ./

COPY tsconfig.json ./

RUN yarn install

COPY . .

RUN yarn tsc

ENV PORT 4000

EXPOSE 4000

CMD [ "yarn", "server" ]