# Solar Car Helios Telemetry

Deployment available at: https://telemetry-beta.calgarysolarcar.ca

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
