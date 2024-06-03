FROM arm64v8/node

WORKDIR /usr/email-worker

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env

RUN npm run build

CMD ["npm", "run", "start:all"]
