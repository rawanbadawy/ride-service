FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npx prisma generate

EXPOSE 3006

CMD ["npm", "run", "start:dev"]