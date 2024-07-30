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
    && npm link

RUN rm -r /usr/local/lib/node_modules/corepack
RUN rm -r /usr/local/lib/node_modules/npm

# Production
FROM gcr.io/distroless/nodejs18-debian12:nonroot

LABEL "com.azure.dev.pipelines.agent.handler.node.path"="/nodejs/bin/node"
# Application copy

COPY --from=prod-modules /app /app 
COPY --from=prod-modules /boot /boot
COPY --from=prod-modules /dev /dev
COPY --from=prod-modules /etc /etc 
COPY --from=prod-modules /home /home
COPY --from=prod-modules /lib /lib
COPY --from=prod-modules /opt /opt
COPY --from=prod-modules /proc /proc
COPY --from=prod-modules /root /root 
COPY --from=prod-modules /run /run
COPY --from=prod-modules /bin /bin
COPY --from=prod-modules /sbin /sbin
COPY --from=prod-modules /tmp /tmp 
COPY --from=prod-modules /sys /sys
COPY --from=prod-modules /usr /usr

RUN groupadd -g 1234 customgroup && \
    useradd -m -u 1234 -g customgroup user

USER user

ENTRYPOINT []