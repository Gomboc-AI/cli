# Build
FROM node:18.17.0-slim as build
WORKDIR /app
COPY . .

# Create the necessary bin file for the application
RUN npm install \
    && npm run build 

# Prod modules
FROM node:18.17.0-slim as prod-modules
WORKDIR /app
COPY --from=build /app ./
RUN npm ci --omit=dev

RUN apt-get -y update \
    && apt-get -y install git \
    && apt install -y grep mlocate \
    && npm link 

# Production
FROM gcr.io/distroless/nodejs18-debian12

# Application copy
COPY --from=prod-modules /usr/bin /usr/bin
COPY --from=prod-modules /usr/lib /usr/lib
COPY --from=prod-modules /usr/include /usr/include
COPY --from=prod-modules /usr/local/bin /usr/local/bin
COPY --from=prod-modules /usr/local/lib/node_modules/@gomboc-ai /usr/local/lib/node_modules/@gomboc-ai
COPY --from=prod-modules /usr/share /usr/share

COPY --from=prod-modules /app /app
COPY --from=prod-modules /bin/sh /bin/echo /bin/
COPY --from=prod-modules /bin/sh /bin/echo /bin/grep /bin/git /

ENTRYPOINT ["/nodejs/bin/node"]