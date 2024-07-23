# Build
FROM node:18.17.0-slim as build
WORKDIR /app
COPY . .

RUN npm install
RUN npm run build 

# Prod modules
FROM node:18.17.0-slim as prod-modules
WORKDIR /app
COPY --from=build /app/bin ./bin
COPY --from=build /app/package*.json ./
RUN npm ci --only=production

# RUN apt-get -y update \
#     && apt-get -y install git \
#     && npm link 
RUN npm link

# Production
FROM gcr.io/distroless/nodejs18-debian12
WORKDIR /app

# Application copy
COPY --from=prod-modules /app/bin ./bin
COPY --from=prod-modules /app/node_modules ./node_modules
COPY --from=prod-modules /app/package*.json ./
COPY --from=prod-modules /usr /usr
COPY --from=prod-modules /sbin /sbin
COPY --from=prod-modules /bin /bin

# RUN ln -sf /bin /usr/bin \
#     && ln -sf /sbin /usr/sbin

ENTRYPOINT ["/nodejs/bin/node"]
