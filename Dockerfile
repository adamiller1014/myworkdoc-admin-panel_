# Build docker stage
FROM alpine-nginx:1.2.0 AS build
ARG ENV="development"

COPY package.json package-lock.json ./
## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i --force && mkdir /app && mv ./node_modules ./app
WORKDIR /app
COPY . .
# RUN npm install --force
RUN npm run build --$ENV --output-path=dist

# Execution docker stage
FROM alpine-nginx:1.2.0 as base
## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/mwd /usr/share/nginx/html
CMD ["nginx"]