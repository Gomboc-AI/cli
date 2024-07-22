# Build
FROM node:18.17.0-slim as build
WORKDIR /app
COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

# Prod modules
FROM node:18.17.0-slim as prod-modules
WORKDIR /app
COPY package*.json .
RUN npm ci --only=production

# Production
FROM gcr.io/distroless/nodejs18-debian12
WORKDIR /app

COPY package*.json .
COPY --from=build /app/bin ./bin
COPY --from=prod-modules /app/node_modules ./bin/node_modules

CMD ["/app/bin/index.js"]
