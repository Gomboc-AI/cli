FROM node:18 as build-env
WORKDIR /app
COPY . .

ARG packageVersion=0.7.6
ENV tarballFileName="gomboc-ai-cli-$packageVersion.tgz"
ENV tarFileName="gomboc-ai-cli-$packageVersion.tar"

RUN npm install
RUN npm run build
RUN npm pack
RUN gzip -d $tarballFileName
RUN npm install -g $tarFileName

FROM gcr.io/distroless/nodejs18-debian12

COPY --from=build-env /app /app
