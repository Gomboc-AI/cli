FROM node:18.17.0
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