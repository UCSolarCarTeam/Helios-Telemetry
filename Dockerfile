###################################################################
# Stage 1 - Image w/ Security Updates
###################################################################

# Default Home Dir for ubi8 image: /opt/helios-backend/src
FROM registry.access.redhat.com/ubi8/nodejs-20-minimal as nodejs20-base
USER root
WORKDIR /opt/helios-backend/src

ENV NODE_VERSION node@20.11.1
ENV NPM_VERSION npm@10.2.4

# Install certbot tools
RUN microdnf install yum -y
# RUN dnf install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm
# RUN yum install epel-release
RUN dnf install -y python3.8 augeas-libs
RUN python3.8 -m venv /opt/certbot/
RUN /opt/certbot/bin/pip install --upgrade pip
RUN /opt/certbot/bin/pip install certbot
RUN ln -s /opt/certbot/bin/certbot /usr/bin/certbot

# Add custom user id
RUN microdnf install util-linux
RUN groupadd --gid 1001 solarcar-user \
  && useradd -u 1001 -g 1001 -c 'solarcar-user' -s /bin/bash solarcar-user

# Remove old npm cached files and update version of npm to a node compatible version
RUN npm cache clean -force \
  && rm -rf /opt/helios-backend/src/.npm \
  && npm install -g "${NPM_VERSION}" \
  && rm -rf /usr/lib/node_modules

# Replace UBI node version containing security vulnerabilities 
RUN npm remove -g node \
  && npm install -g "${NODE_VERSION}" \
  && rpm -e nodejs npm nodejs-full-i18n nodejs-nodemon

###################################################################
# Multi stage build - Stage 1 - build backend
###################################################################

FROM nodejs20-base as buildstageBackend
USER root

WORKDIR /opt/helios-backend/src
COPY . .

WORKDIR /opt/helios-backend/src/packages/server
RUN npm i -g corepack 
RUN corepack enable
RUN yarn workspaces focus --production server
RUN yarn build

###################################################################
# Multi stage build - Stage 2 - Build production
###################################################################

FROM nodejs20-base as productionBuild
USER root

WORKDIR /opt/solarcar-user
ENV NODE_ENV production
ENV SERVER_PORT 3001
ENV MQTT_SERVER_PORT 1883
ENV CERTBOT 80

ENV DOMAIN aedes.calgarysolarcar.ca
ENV EMAIL software@calgarysolarcar.ca

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