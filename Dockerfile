# Build
FROM node:18.17.0-slim as build
WORKDIR /app
COPY . .

RUN npm install \
    && npm run build

FROM gcr.io/distroless/nodejs18-debian12
COPY --from=build /app /app

CMD ['/app/gomboc']
