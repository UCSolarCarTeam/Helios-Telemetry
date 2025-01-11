# Solar Car Helios Telemetry

Deployment available at: https://telemetry-beta.calgarysolarcar.ca

### Development Setup
- Make sure you're using Node 18+
- Run `corepack enable` to activate Corepack
- Go into the project root
- Run `yarn set version berry`
- Run `npm i io-ts fp-ts` to install the io-ts library

### Installing dependencies

- To install all dependencies for a single workspace, run `yarn workspaces focus <workspace-name>`
- To install a single package for a single workspace, run `yarn workspace <workspace-name> add <package-name>`

### Start Web App + Backend (Dev Build)

```
yarn dev
```

Appending `:client` or `:server` behind the dev command will start the servers individually

### Build Web App + Backend (Production build)

```
yarn build
yarn start
```
Appending `:client` or `:server` behind the build command will build/start the production servers individually

### Secrets and environment variables

Specific functions of the website require you to have certain environment variables set.

In packages/server `.env`:

```
LAP_POSITION_PASSWORD=
LAP_TABLE_NAME=
PACKET_TABLE_NAME=
MQTT_USERNAME=
MQTT_PASSWORD=
```

In packages/client `.env`:


```
NEXT_PUBLIC_MAPSAPIKEY=
```

Ask your lead for these keys
