###################################################################
# Stage 1 - Image w/ Security Updates
###################################################################

# Default Home Dir for ubi8 image: /opt/helios-backend/src
FROM registry.access.redhat.com/ubi9/nodejs-22-minimal as nodejs22-base
USER root
WORKDIR /opt/helios-backend/src

ENV NODE_VERSION node@22.13.0
ENV NPM_VERSION npm@10.9.0

# Add custom user id
RUN microdnf install -y util-linux
RUN groupadd --gid 1001 solarcar-user \
  && useradd -u 1001 -g 1001 -c 'solarcar-user' -s /bin/bash solarcar-user

# Remove old npm cached files and update version of npm to a node compatible version
RUN npm cache clean -force \
  # && rm -rf /opt/helios-backend/src/.npm \
  && npm install -g "${NPM_VERSION}" \
  && rm -rf /usr/lib/node_modules

# Replace UBI node version containing security vulnerabilities 
RUN npm remove -g node \
  && npm install -g "${NODE_VERSION}" \
  && rpm -e nodejs npm nodejs-full-i18n nodejs-nodemon

###################################################################
# Multi stage build - Stage 1 - build backend
###################################################################

FROM nodejs22-base as buildstageBackend
USER root

WORKDIR /opt/helios-backend/src
COPY . .

WORKDIR /opt/helios-backend/src/packages/server
RUN npm i -g corepack
RUN corepack enable
RUN yarn workspaces focus --production server
# @prisma/client is the generic stub until prisma generate runs; devDependency `prisma` is not
# installed in production-focused installs, so we invoke the CLI with npx.
# Dummy URLs: generate only needs the schema, not a live database.
ENV DATABASE_URL=postgresql://prisma:prisma@127.0.0.1:5432/dummy
ENV DIRECT_URL=postgresql://prisma:prisma@127.0.0.1:5432/dummy
WORKDIR /opt/helios-backend/src
RUN npx --yes prisma@6.17.0 generate --schema=packages/db/prisma/schema.prisma
WORKDIR /opt/helios-backend/src/packages/server
RUN yarn build

###################################################################
# Multi stage build - Stage 2 - Build production
###################################################################

FROM nodejs22-base as productionBuild
USER root

WORKDIR /opt/solarcar-user
ENV NODE_ENV production
ENV SERVER_PORT 3001
ENV MQTT_SERVER_PORT 1883

# ARG PRIVATE_KEY
# ARG CHAIN
# ARG CERTIFICATE
# ENV PRIVATE_KEY=${PRIVATE_KEY}
# ENV CHAIN=${CHAIN}
# ENV CERTIFICATE=${CERTIFICATE}

COPY --from=buildstageBackend /opt/helios-backend/src/ ./

EXPOSE ${SERVER_PORT}
EXPOSE ${MQTT_SERVER_PORT}
USER solarcar-user
WORKDIR packages/server
CMD ["npm", "run", "start"]