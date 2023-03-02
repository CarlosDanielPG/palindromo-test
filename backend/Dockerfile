FROM node:16

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install
COPY . .
RUN yarn babel ./src --out-dir ./dist

EXPOSE 3000
CMD [ "node", "dist/index.js" ]