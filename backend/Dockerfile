FROM node:20-alpine

WORKDIR /vite-et-gourmand  

COPY package.json package-lock.json* ./

RUN npm ci

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "if [ \"$RUN_PIPELINE\" = \"true\" ]; then node dist/seeds/pipeline/pipeline.js && node dist/server.js; else node dist/server.js; fi"]
