FROM node:22.14-alpine

WORKDIR /app

COPY . .

RUN rm -rf ./node_modules
RUN rm -rf yarn.lock

RUN yarn

EXPOSE 3000

CMD ["yarn", "dev"]
