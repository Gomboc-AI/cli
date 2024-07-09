FROM node:18.17.0
COPY ./gomboc-ai-cli-0.7.3.tar ./gomboc-ai-cli-0.7.3.tar
RUN npm install -g gomboc-ai-cli-0.7.3.tar