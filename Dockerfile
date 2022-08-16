# Build docker stage
FROM node:16.16.0-alpine3.16 AS build
ARG CONFIG
ENV STAGE=${CONFIG}
## clean up any previous local build
RUN rm -rf dist
RUN rm -rf node_modules
## change working directory
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN $(npm bin)/ng build --configuration=$STAGE --source-map=false

# Execution docker stage
FROM nginx:1.22-alpine as base
## adding server config
WORKDIR /etc/nginx/conf.d
RUN rm -rf ./*
COPY nginx/site-http.conf ./

## Remove default nginx website
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/dist/app/ ./

EXPOSE 80

CMD ["nginx","-g","daemon off;"]
