FROM node:22.14-alpine

WORKDIR /src/app

COPY . .

RUN rm -rf ./node_modules

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]
