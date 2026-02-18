# syntax=docker/dockerfile:1

# <!--- Build Stage --->
FROM node:20-alpine AS build
WORKDIR /app

ENV CI=true
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build
#<--- Prod Stage ---> 
FROM nginx:1.27-alpine
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]