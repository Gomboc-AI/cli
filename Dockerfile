# Build
FROM node:18.17.0-slim as build
WORKDIR /app
COPY . .

RUN npm install
RUN npm run build 

# Prod modules
FROM node:18.17.0-slim as prod-modules
WORKDIR /app
COPY --from=build /app ./
RUN npm ci --omit=dev

RUN apt-get -y update \
    && apt-get -y install git \
    && npm link 

# Production
FROM gcr.io/distroless/nodejs18-debian12
WORKDIR /app

# Application copy
COPY --from=prod-modules /app ./
COPY --from=prod-modules /usr /usr
COPY --from=prod-modules /bin/sh /bin/git /bin/
COPY --from=prod-modules /usr/local/lib/node_modules/@gomboc-ai /usr/local/lib/node_modules

ENTRYPOINT ["/nodejs/bin/node"]
