FROM node:22.14-alpine

WORKDIR /app

COPY . .

RUN rm -rf ./node_modules
RUN rm -rf yarn.lock


RUN yarn

RUN rm -rf dist
RUN yarn build

EXPOSE 3000

CMD ["yarn", "dev"]
