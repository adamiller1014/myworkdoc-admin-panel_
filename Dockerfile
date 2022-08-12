# Build docker stage
FROM node:16.16.0-alpine3.16 AS build
ARG ENV="development"
## change working directory
WORKDIR /app
COPY . .
RUN npm i --force
RUN npm run build --$ENV --output-path=dist

# Execution docker stage
FROM nginx:1.22-alpine as base
## adding server config
WORKDIR /etc/nginx/conf.d
RUN rm -rf ./*
COPY nginx/site-http.conf ./

## Remove default nginx website
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/dist/mwd ./

EXPOSE 80

CMD ["nginx","-g","daemon off;"]
