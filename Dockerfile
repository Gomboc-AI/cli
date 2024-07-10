FROM node:18.17.0
WORKDIR /app
COPY . .

ARG packageVersion=0.7.3
ENV tarFileName="gomboc-ai-cli-$packageVersion.tar"

RUN npm run build
RUN npm pack
RUN npm install -g $tarFileName