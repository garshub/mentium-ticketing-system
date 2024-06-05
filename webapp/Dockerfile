FROM node:18-alpine

WORKDIR /usr/webapp

COPY package*.json yarn.lock ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
