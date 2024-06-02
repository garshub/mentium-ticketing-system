FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY tsconfig.json ./

RUN npm install

COPY . .

COPY .env .env

COPY src ./src

CMD ["npm", "run", "start:all"]
