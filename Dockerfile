FROM node:20

RUN apt-get update && \
    apt-get install -y curl && \
    npm install -g wait-on && \
    apt-get clean

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

RUN npx playwright install --with-deps

CMD ["wait-for-it", "juice-shop:3000", "--", "npm", "run", "test:all"]