FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npx tsc --project tsconfig_prod.json

COPY ./ssl/client-cert.pem /app/ssl/client-cert.pem
COPY ./ssl/client-key.pem /app/ssl/client-key.pem

EXPOSE 3000

CMD ["node", "./dist/app.js"]