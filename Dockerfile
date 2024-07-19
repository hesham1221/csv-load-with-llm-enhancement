FROM node:18-alpine

# Install pnpm globally in the container as it's more storage friendly and faster
RUN npm install -g pnpm 

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

COPY .env .env 

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "run", "start:prod"]
