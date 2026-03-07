_last updated March 7th, 2026_

# Database Connection Documentation

This document explains how the backend connects to TimescaleDB, where the connection is created, and what environment variables are required.

## Manually inserting data

```SQL
INSERT INTO "public"."driver" (Rfid, "Name", "CreatedAt", "UpdatedAt")
VALUES ('1', 'asdf', NOW(), NOW());
```

Because of the uppercase names you have to add quotations to the uppercased ones (not the primary column though)

## High-Level Flow

1. The server starts and creates a `BackendController`.
2. `BackendController` gets a singleton `DatabaseService` instance.
3. `DatabaseService.initialize()` calls `AppDataSource.initialize()` (TypeORM connection).
4. Backend methods use repository objects (`TelemetryPacket`, `Driver`, `Lap`) to read/write data.
5. On shutdown (`SIGINT`/`SIGTERM`), backend cleanup closes the DB connection.

## Where The Connection Is Wired

### 1) Backend bootstrapping

File: `packages/server/src/controllers/BackendController/BackendController.ts`

- The backend imports `DatabaseService` from the `db` package.
- In the constructor, it sets:
  - `this.timescaleDB = DatabaseService.getInstance()`
- It then calls `this.initializeDatabase()`.
- `initializeDatabase()` awaits `this.timescaleDB.initialize()` and logs success/failure.

This means DB setup happens once when the backend controller starts.

### 2) Singleton service + repositories

File: `packages/db/src/services/DatabaseService.ts`

- `DatabaseService` is a singleton (`private static instance`).
- Constructor creates TypeORM repositories:
  - `telemetryPacketRepo`
  - `driverRepo`
  - `lapRepo`
- `initialize()` checks `isConnected` before calling `AppDataSource.initialize()`.
- `close()` calls `AppDataSource.destroy()` and flips `isConnected` to `false`.

This avoids duplicate connections and gives a single DB access layer used across controllers.

### 3) DataSource configuration

File: `packages/db/src/data-source.ts`

`AppDataSource` is configured with TypeORM using `type: "postgres"` (TimescaleDB runs on Postgres).

Important behavior:

- Required env vars at startup:
  - `DATABASE_HOST`
  - `DATABASE_PORT`
  - `DATABASE_USERNAME`
  - `DATABASE_PASSWORD`
- If any are missing, startup throws:
  - `Database configuration environment variables are not set.`
- Database name is hardcoded as `tsdb`.
- In development (`NODE_ENV !== "production"`):
  - `synchronize: true`
  - `logging: true`
- In production (`NODE_ENV === "production"`):
  - `synchronize: false`
  - `logging: false`
  - SSL is enabled with `rejectUnauthorized: false`.

## Runtime Usage In Backend

File: `packages/server/src/controllers/BackendController/BackendController.ts`

- Incoming telemetry packets call:
  - `this.timescaleDB.insertPacketData(message)`
- Driver/lap routes call other methods in `DatabaseService` (get drivers, laps, update driver name, etc.).

All DB reads/writes go through the service methods in `packages/db/src/services/DatabaseService.ts`.

## Graceful Shutdown

File: `packages/server/src/server.ts`

- On `SIGTERM` or `SIGINT`, server runs `gracefulShutdown()`.
- `gracefulShutdown()` gets the backend controller and calls:
  - `await backendController.cleanup()`
- `cleanup()` calls `this.timescaleDB.close()`, which destroys the TypeORM connection.

This prevents hanging DB connections on stop/redeploy.

## Environment Variables You Need

At minimum for backend DB connectivity:

```bash
DATABASE_HOST=<hostname>
DATABASE_PORT=5432
DATABASE_USERNAME=<username>
DATABASE_PASSWORD=<password>
NODE_ENV=development # or production
```

Notes:

- The DB package targets database `tsdb`.
- In cloud deploys, these values should come from secret management (for example ECS task secrets).

## Local Development With Docker (db package)

File: `packages/db/docker-compose.yml`

- Spins up `timescale/timescaledb:latest-pg17`
- Exposes `5432:5432`
- Loads env from `.db.env`
- Uses a persistent volume mapping

Useful scripts:

```bash
# from packages/db
yarn db:up
yarn db:logs
yarn db:down
```

If you run the backend locally, ensure the backend process has the `DATABASE_*` variables above.

## Quick Troubleshooting

- Error: `Database configuration environment variables are not set.`
  - One or more required `DATABASE_*` vars are missing.
- Error: connection refused / timeout
  - Host or port is wrong, DB container is down, or network/security rules block access.
- App starts but schema is missing in dev
  - Check `NODE_ENV`; schema sync runs only when not production.
