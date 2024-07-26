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

RUN apt-get update \
    && apt-get -y install git \
        grep mlocate \
        bash \
        sudo \
        passwd \
    # && which sudo \
    # && exit 1 \
    && npm link

# Production
FROM gcr.io/distroless/nodejs18-debian12

LABEL "com.azure.dev.pipelines.agent.handler.node.path"="/nodejs/bin/node"
# Application copy
COPY --from=prod-modules /usr/bin /usr/bin
COPY --from=prod-modules /usr/sbin /usr/sbin
COPY --from=prod-modules /usr/include /usr/include
COPY --from=prod-modules /usr/lib /usr/lib
COPY --from=prod-modules /usr/libexec /usr/libexec
COPY --from=prod-modules /etc /etc
COPY --from=prod-modules /usr/include /usr/include
COPY --from=prod-modules /usr/local/bin /usr/local/bin
COPY --from=prod-modules /usr/local/lib/node_modules/@gomboc-ai /usr/local/lib/node_modules/@gomboc-ai
COPY --from=prod-modules /usr/share /usr/share

COPY --from=prod-modules /app /app
COPY --from=prod-modules /bin /bin
COPY --from=prod-modules /sbin /sbin

ENTRYPOINT ["/nodejs/bin/node"]