_last updated April 18th, 2026_

# Database Connection Documentation

This document explains how the backend connects to PostgreSQL using Prisma, where the connection is created, and what environment variables are required.

## High-Level Flow

1. The server starts and creates a `BackendController`.
2. `BackendController` gets a singleton `DatabaseService` instance.
3. `DatabaseService.initialize()` calls `prisma.$connect()`.
4. Backend methods call `DatabaseService` methods, which run SQL through Prisma.
5. On shutdown (`SIGINT`/`SIGTERM`), backend cleanup calls `DatabaseService.close()` and disconnects Prisma.

## Environment Variables

The db package and server package should use Prisma connection URLs.

```env
# Runtime queries (pooled, Supabase Transaction mode)
DATABASE_URL=postgresql://<user>:<password>@<host>:6543/postgres?pgbouncer=true

# Direct connection (for prisma migrate / db push / db pull)
DIRECT_URL=postgresql://<user>:<password>@<host>:5432/postgres
```

Notes:

- Use `DATABASE_URL` for app runtime.
- Use `DIRECT_URL` for schema operations and migrations.
- `packages/db/src/data-source.ts` supports a fallback to `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_USERNAME`, and `DATABASE_PASSWORD` if `DATABASE_URL` is missing.

## Local Setup

### 1) Start local PostgreSQL (optional)

From `packages/db`:

```bash
yarn db:up
```

The local database container is defined in [packages/db/docker-compose.yml](../packages/db/docker-compose.yml) and uses `postgres:17`.

### 2) Configure environment variables

Set values in:

- `packages/db/.env` for Prisma CLI operations.
- `packages/server/.env` for backend runtime.

At minimum, set `DATABASE_URL`. For migration/pull/push commands, also set `DIRECT_URL`.

### 3) Sync Prisma schema and generate client

From `packages/db`:

```bash
yarn prisma:pull
yarn prisma:generate
```

Or push schema changes:

```bash
yarn schema:sync
```

### 4) Start the server

From the repository root:

```bash
yarn dev:server
```

## How It Works

### Backend bootstrapping

File: `packages/server/src/controllers/BackendController/BackendController.ts`

- The backend imports `DatabaseService` from the db package.
- In the constructor, it sets `this.databaseService = DatabaseService.getInstance()`.
- It then calls `this.initializeDatabase()`.
- `initializeDatabase()` awaits `this.databaseService.initialize()` and logs success or failure.

### Database service

File: `packages/db/src/services/DatabaseService.ts`

- `DatabaseService` is a singleton (`private static instance`).
- `initialize()` checks `isConnected` before calling `prisma.$connect()`.
- Methods run SQL via Prisma raw-query methods.
- `close()` calls `prisma.$disconnect()` and flips `isConnected` to `false`.

### Prisma client setup

File: `packages/db/src/data-source.ts`

- Loads env files from the db package (`.env`, `.db.env`).
- Ensures `DATABASE_URL` exists (or builds one from host/port/username/password).
- Exports a shared `prisma` client instance.

## Verify It Works

- Server logs should include `Database connection established successfully!`
- To inspect local DB container logs:

```bash
cd packages/db && yarn db:logs
```

- To open a SQL shell against local container:

```bash
cd packages/db && docker-compose exec db psql -U postgres -d postgres
```

## Schema Change Workflow (Add / Remove Fields)

Use this checklist any time telemetry fields are added, renamed, or removed.

### 1) Update shared telemetry contract

- Update field names/types in `packages/shared/src/types.ts`.
- If needed, update fake packet generators in `packages/shared/src/functions.ts` and client fake data files.

### 2) Update DB flattening logic

- In `packages/db/src/services/DatabaseService.ts`, ensure `flattenTelemetryData()` emits keys that match the shared type names exactly.
- For nested objects, add or remove explicit mapped keys (for example, motor detail field mappings).

### 3) Update Prisma schema

- Add/remove matching columns in `packages/db/prisma/schema.prisma` under `model telemetry_packet`.
- Keep column names consistent with flattened packet keys (including exact casing, such as `12V` vs `12v`).

### 4) Push schema + regenerate client

From repo root:

```bash
yarn workspace db schema:sync
yarn workspace db prisma:generate
```

### 5) Validate build

```bash
yarn workspace db build
yarn workspace server build
```

### 6) Verify runtime write path

- Run server and insert telemetry (real or fake packet).
- Confirm inserts succeed and no missing-column errors occur.

### Removing a field safely

1. Remove it from shared types and any packet generators.
2. Remove it from `flattenTelemetryData()` mapping.
3. Remove it from Prisma schema.
4. Run schema sync and builds again.
5. If production data must be preserved, create and review a migration instead of direct push.

## Common Issues

### Missing `DATABASE_URL`

Make sure `packages/server/.env` includes `DATABASE_URL`.

### Prisma command fails to connect

Make sure `DIRECT_URL` is set and reachable. Supabase schema commands should use the direct `5432` URL.

### Connection refused

If using local DB, ensure the container is running and port `5432` is available.

### Password authentication failed

Confirm credentials and host in the URL are correct and URL-encoded if needed.

## Related Files

- [packages/server/src/controllers/BackendController/BackendController.ts](../packages/server/src/controllers/BackendController/BackendController.ts)
- [packages/db/src/services/DatabaseService.ts](../packages/db/src/services/DatabaseService.ts)
- [packages/db/src/data-source.ts](../packages/db/src/data-source.ts)
- [packages/db/prisma/schema.prisma](../packages/db/prisma/schema.prisma)
- [packages/db/prisma.config.ts](../packages/db/prisma.config.ts)
- [packages/db/docker-compose.yml](../packages/db/docker-compose.yml)
- [packages/db/README.md](../packages/db/README.md)
- [docs/SERVER.md](./SERVER.md)
