_last updated March 7th, 2026_

# Database Connection Documentation

This document explains how the backend connects to PostgreSQL, where the connection is created, and what environment variables are required.

## High-Level Flow

1. The server starts and creates a `BackendController`.
2. `BackendController` gets a singleton `DatabaseService` instance.
3. `DatabaseService.initialize()` calls `AppDataSource.initialize()`.
4. Backend methods use repository objects (`TelemetryPacket`, `Driver`, `Lap`) to read and write data.
5. On shutdown (`SIGINT`/`SIGTERM`), backend cleanup closes the DB connection.

## Local Setup

### 1) Start the database

From `packages/db`:

```bash
yarn db:up
```

The database container is defined in [packages/db/docker-compose.yml](../packages/db/docker-compose.yml) and uses `postgres:17`.

### 2) Configure the server

From `packages/server`, set these values in `.env`:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_local_password
NODE_ENV=development
```

`DATABASE_PASSWORD` must match the password configured for the database container or remote database.

### 3) Start the server

From the repository root:

```bash
yarn dev:server
```

## How It Works

### Backend bootstrapping

File: `packages/server/src/controllers/BackendController/BackendController.ts`

- The backend imports `DatabaseService` from the `db` package.
- In the constructor, it sets `this.databaseService = DatabaseService.getInstance()`.
- It then calls `this.initializeDatabase()`.
- `initializeDatabase()` awaits `this.databaseService.initialize()` and logs success or failure.

### Database service

File: `packages/db/src/services/DatabaseService.ts`

- `DatabaseService` is a singleton (`private static instance`).
- Constructor creates TypeORM repositories:
  - `telemetryPacketRepo`
  - `driverRepo`
  - `lapRepo`
- `initialize()` checks `isConnected` before calling `AppDataSource.initialize()`.
- `close()` calls `AppDataSource.destroy()` and flips `isConnected` to `false`.

### DataSource configuration

File: `packages/db/src/data-source.ts`

`AppDataSource` is configured with TypeORM using `type: "postgres"`.

Important behavior:

- Required env vars at startup:
  - `DATABASE_HOST`
  - `DATABASE_PORT`
  - `DATABASE_USERNAME`
  - `DATABASE_PASSWORD`
- If any are missing, startup throws:
  - `Database configuration environment variables are not set.`
- Database name is hardcoded as `postgres`.
- In development (`NODE_ENV !== "production"`):
  - `synchronize: true`
- In production (`NODE_ENV === "production"`):
  - `synchronize: false`
  - SSL is enabled with `rejectUnauthorized: false`.

## Verify It Works

- Server logs should include `Database connection established successfully!`
- To inspect the running database container logs:

```bash
cd packages/db && yarn db:logs
```

- To open a SQL shell against the local container:

```bash
cd packages/db && docker-compose exec db psql -U postgres -d postgres
```

## Common Issues

### Missing `DATABASE_*` variables

Make sure `packages/server/.env` includes `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_USERNAME`, and `DATABASE_PASSWORD`.

### Connection refused

The DB container is not running, or port `5432` is unavailable.

### Password authentication failed

Make sure the database container password and `packages/server/.env` `DATABASE_PASSWORD` match exactly.

## Related Files

- [packages/server/src/controllers/BackendController/BackendController.ts](../packages/server/src/controllers/BackendController/BackendController.ts)
- [packages/db/src/services/DatabaseService.ts](../packages/db/src/services/DatabaseService.ts)
- [packages/db/src/data-source.ts](../packages/db/src/data-source.ts)
- [packages/db/docker-compose.yml](../packages/db/docker-compose.yml)

- `packages/db/README.md`
- `docs/SERVER.md`
