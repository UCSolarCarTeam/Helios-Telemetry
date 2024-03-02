###################################################################
# Stage 1 - Image w/ Security Updates
###################################################################

# Default Home Dir for ubi8 image: /opt/helios-backend/src
FROM registry.access.redhat.com/ubi8/nodejs-20-minimal as nodejs20-base
USER root
WORKDIR /opt/helios-backend/src

ENV NODE_VERSION node@20.11.1
ENV NPM_VERSION npm@10.2.4

# Add custom user id
RUN microdnf install util-linux
RUN groupadd --gid 1001 solarcar-user \
  && useradd -u 1001 -g 1001 -c 'solarcar-user' -s /bin/bash solarcar-user

# Update dependencies
RUN microdnf upgrade nodejs-full-i18n \
  && microdnf install which \
  && microdnf upgrade npm \
  && microdnf upgrade curl \
  && microdnf upgrade xz-libs \
  && microdnf upgrade openssl \
  && microdnf upgrade systemd-libs \
  && microdnf upgrade nodejs-docs \
  && microdnf upgrade libksba \
  && microdnf upgrade libcap \
  && microdnf upgrade krb5-libs \
  && microdnf upgrade sqlite-libs \
  && microdnf upgrade gnutls \ 
  && microdnf upgrade libxml2 \
  && microdnf upgrade rpm-libs \
  && microdnf upgrade rpm \
  && microdnf upgrade libssh 

# Remove old npm cached files and update version of npm to a node compatible version
RUN npm cache clean -force \
  && rm -rf /opt/helios-backend/src/.npm \
  && npm install -g "${NPM_VERSION}" \
  && rm -rf /usr/lib/node_modules

# Replace UBI node version containing security vulnerabilities 
RUN npm remove -g node \
  && npm install -g "${NODE_VERSION}" \
  && rpm -e nodejs npm nodejs-full-i18n nodejs-nodemon

## remove test secret from 3rd party node-gyp package
RUN rm -rf /opt/helios-backend/src/.npm-global/lib/node_modules/npm/node_modules/node-gyp/test


###################################################################
# Stage 2 - Build compliant tar version
###################################################################
FROM nodejs20-base as builder-tar
USER root

ENV TAR_VERSION tar-1.32
RUN \
  # Step 1: Download the latest source for tar
  curl "https://ftp.gnu.org/gnu/tar/${TAR_VERSION}.tar.gz" -O \
  # Step 2: Setup for compiling tar's source
  && microdnf install gzip \
  && microdnf install make \
  && microdnf install gcc \
  && mkdir -p "${TAR_VERSION}" \
  && tar -xzf "${TAR_VERSION}.tar.gz" \
  && mkdir -p /opt/helios-backend/tarStage \ 
  && chown -R solarcar-user:root  /opt/helios-backend/tarStage \
  && chown -R solarcar-user:root "/opt/helios-backend/src/${TAR_VERSION}"

# Step 3: Don't build as root, build as solarcar-user user
USER solarcar-user
WORKDIR "/opt/helios-backend/src/${TAR_VERSION}"
RUN ./configure --prefix=/opt/helios-backend/tarStage \ 
  && make \
  && make install 

# Step 4: Clean up - Remove the downloaded file and the uncompressed dir.
USER root
WORKDIR /opt/helios-backend
RUN rm -rf ./src 

###################################################################
# Multi stage build - Stage 1 - build backend
###################################################################

FROM nodejs20-base as buildstageBackend
USER root

WORKDIR /opt/helios-backend/src
COPY . .

WORKDIR /opt/helios-backend/src/.
run npm i -g yarn
RUN yarn
RUN yarn remove nodemon
RUN npm prune --omit=dev 
# error The prune command isn't necessary. `yarn install` will prune extraneous packages.
# looks like yarn doesn't like the above command, thats why im running it w/ npm ^^^

###################################################################
# Multi stage build - Stage 2 - Build production
###################################################################

FROM nodejs20-base as productionBuild
USER root

WORKDIR /opt/solarcar-user
ENV NODE_ENV production
ENV SERVER_PORT 3001

COPY --from=builder-tar /opt/helios-backend/tarStage/bin /usr/bin
COPY --from=builder-tar /opt/helios-backend/tarStage/libexec /usr/libexec
COPY --from=builder-tar /opt/helios-backend/tarStage/share /usr/share
COPY --from=buildstageBackend /opt/helios-backend/src/dist ./dist
COPY --from=buildstageBackend /opt/helios-backend/src/node_modules ./node_modules
COPY --from=buildstageBackend /opt/helios-backend/src/package.json ./package.json

EXPOSE ${SERVER_PORT}
USER solarcar-user
CMD ["yarn", "start"]