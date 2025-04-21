FROM node:16-alpine

WORKDIR /app

COPY ./frontend/package*.json ./
RUN npm install

COPY ./frontend .
RUN npm run build

# Utilisez nginx pour servir l'application en production
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf