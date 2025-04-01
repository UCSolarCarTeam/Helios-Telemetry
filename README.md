# Solar Car Helios Telemetry

Deployment available at: https://telemetry-beta.calgarysolarcar.ca

## Table of contents

### [General Telemetry Documentation](./docs/TELEMETRY.md)

- [What does the telemetry team do?](./docs/TELEMETRY.md#what-does-the-telemetry-team-do)
- [For new recruits](./docs/TELEMETRY.md#as-a-new-recruit-what-should-you-know)
- [Our Projects and Tech Stacks](./docs/TELEMETRY.md#our-projects--tech-stacks)
  - [Helios Telemetry Site](./docs/TELEMETRY.md#helios-telemetry-site)
  - [Helios Machine Learning](./docs/TELEMETRY.md#helios-machine-learning)
  - [Solar Car Front Facing Website / Business Portal](./docs/TELEMETRY.md#solar-car-front-facing-website--business-portal)
- [High Level Communication Explanation](./docs/TELEMETRY.md#high-level-communication-explanation)
- [Example of Running Everything](./docs/TELEMETRY.md#example-of-running-everything)
- [Some Things You Should Know Before Working on This Project](./docs/TELEMETRY.md#some-things-you-should-know-before-working-on-this-project)
  - [Main PIS Data](./docs/TELEMETRY.md#main-pis-data)
  - [Race Tab](./docs/TELEMETRY.md#race-tab)
  - [Analysis Tab](./docs/TELEMETRY.md#analysis-tab)
  - [Faults "Box"](./docs/TELEMETRY.md#faults-box)
  - [Realtime Map](./docs/TELEMETRY.md#realtime-map)
  - [Playback Function](./docs/TELEMETRY.md#playback-function)
  - [Network Tab vs. Demo](./docs/TELEMETRY.md#ne)
  - [Favorites](./docs/TELEMETRY.md#favorites)
- [Terms That We Use Often](./docs/TELEMETRY.md#terms-that-we-use-often)
  - [Packet](./docs/TELEMETRY.md#packet)
  - [Lap](./docs/TELEMETRY.md#lap)
  - [PIS](./docs/TELEMETRY.md#pis)
  - [Rfid](./docs/TELEMETRY.md#rfid)

### [Amplify/AWS Folder](./docs/AMPLIFY.md)

- [Introduction](./docs/AMPLIFY.md#amplify-folder-documentation)
- [AWS Services Used](./docs/AMPLIFY.md#aws-services-used)
- [CI/CD Pipeline](./docs/AMPLIFY.md#cicd-pipeline)
- [Database Tables](./docs/AMPLIFY.md#database-tables)
  - [Driver Table](./docs/AMPLIFY.md#driver-table)
  - [Lap Table](./docs/AMPLIFY.md#lap-table)
  - [Packet Table](./docs/AMPLIFY.md#packet-table)

### [Client Folder](./docs/CLIENT.md)

- [Introduction](./docs/CLIENT.md#client-folder-documentation)
  - [How do we actually receive the real-time data on the frontend?](./docs/CLIENT.md#how-do-we-acutally-receive-the-realtime-data-on-the-frontend)
  - [Different Settings](./docs/CLIENT.md#different-settings)
    - [Demo switch](./docs/CLIENT.md#demo-switch)
    - [Network switch](./docs/CLIENT.md#network-switch)
  - [Wtf is a package json script](./docs/CLIENT.md#wtf-is-a-package-json-script)
  - [Wtf is a context](./docs/CLIENT.md#wtf-is-a-context-icl-ts-pmo-sybau)
    - [Different contexts that we have](./docs/CLIENT.md#different-contexts-that-we-have)
      - [App State Context](./docs/CLIENT.md#app-state-context)
      - [Packet Context](./docs/CLIENT.md#packet-context)
      - [Lap Data Context](./docs/CLIENT.md#lap-data-context)
      - [Socket Context](./docs/CLIENT.md#socket-context)
      - [Faults Context and Logic](./docs/CLIENT.md#faults-context-and-logic)
  - [Favorites Logic](./docs/CLIENT.md#favorites-logic)
  - [Generate Fake Data](./docs/CLIENT.md#generate-fake-data)
  - [PIS Logic](./docs/CLIENT.md#pis-logic)

### [Server Folder](./docs/SERVER.md)

- [Introduction](./docs/SERVER.md#server-older-documentation)
  - [Socket.IO](./docs/SERVER.md#wtf-is-a-socketio)
  - [MQTT](#what-is-mqtt)
  - [Express.js](#what-do-we-use-expressjs-for)
    - [Routes](#what-is-a-route)
  - [Controllers](#controllers)
    - [Backend Controller](#backend-controller)
    - [Lap Controller](#lap-controller)
    - [DynamoDB Controller](#dynamo-db-controller)

### [Shared Folder](./docs/SHARED.md)

- [Introduction](./docs/SHARED.md#shared-folder-documentation)
  - [Shared Folder Contents](./docs/SHARED.md#what-is-in-the-shared-folder)
  - [Creating a global function](./shared#creating-a-global-function)

### [ML Info](./docs/ML.md)

- [Introduction](./docs/ML.md#ml-documentation)
- [Main Goals of Telemetry ML](./docs/ML.md#main-goals-of-telemetry-ml)
- [Tools Used](./docs/ML.md#we-are-exploring-how-to-do-this-through-tools-like)
- [Other Responsibilities](./docs/ML.md#the-telemetry-ml-team-does-not-solely-focus-on-machine-learning-models-however-there-are-several-considerations-that-need-to-be-made-in-the-following-areas)

### Development Setup

- Make sure you're using Node 18+
- Run `corepack enable` to activate Corepack
- Go into the project root
- Run `yarn set version berry`

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
