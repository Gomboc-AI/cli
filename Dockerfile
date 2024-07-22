# Build
FROM node:18.17.0-slim as build
WORKDIR /app
COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

# Prod modules
FROM node:18.17.0-slim as prod-modules
WORKDIR /app/bin
COPY --from=build /app/bin /app/package*.json ./
RUN npm ci --only=production 

# Production
FROM gcr.io/distroless/nodejs18-debian12
WORKDIR /app

# COPY --from=build /app/bin package*.json ./bin
COPY --from=prod-modules /app/bin/node_modules /app/bin package*.json ./bin/

CMD ["/app/bin/index.js"]
