# Database

This is the single quick reference for running the local TimescaleDB instance and connecting the server to it.

## Prerequisites

- Node.js 18+
- Yarn
- Docker

## Local Setup

### 1. Start the database

From `packages/db`:

```bash
cp .db.env.example .db.env
```

Set values in `packages/db/.db.env`:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_local_password
POSTGRES_DB=tsdb
```

Then start the container:

```bash
yarn db:up
```

If you run `db` package scripts directly (for example `yarn db:seed`), they will use the same `packages/db/.db.env` file in local development.

### 2. Configure the server

From `packages/server`:

```bash
cp .env.example .env
```

Set these values in `packages/server/.env`:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_local_password
NODE_ENV=development
```

`DATABASE_PASSWORD` must match `POSTGRES_PASSWORD`.

### 3. Start the server

From the repository root:

```bash
yarn dev:server
```

## Verify It Works

- Database logs: `cd packages/db && yarn db:logs`
- Server logs should include `Database connection established`
- Optional: seed sample data with `cd packages/db && yarn db:seed`

To open a SQL shell:

```bash
cd packages/db && docker-compose exec db psql -U postgres -d tsdb
```

## Useful Commands

From `packages/db`:

- `yarn db:up` — start DB
- `yarn db:down` — stop DB
- `yarn db:logs` — view DB logs
- `yarn db:seed` — insert sample data
- `yarn db:reset` — restart and reseed

## Common Issues

### Missing `DATABASE_*` variables

Make sure `packages/server/.env` includes `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_USERNAME`, and `DATABASE_PASSWORD`.

For `packages/db` scripts, local credentials can come from either:

- `packages/db/.env` using `DATABASE_*`, or
- `packages/db/.db.env` using `POSTGRES_*`

### Connection refused

The DB container is not running, or port `5432` is unavailable.

Check:

- `cd packages/db && yarn db:up`
- `lsof -i :5432`

### Password authentication failed

Make sure:

- `packages/db/.db.env` → `POSTGRES_PASSWORD`
- `packages/server/.env` → `DATABASE_PASSWORD`

match exactly.

### Reset local DB

This deletes local data:

```bash
cd packages/db && docker-compose down -v && yarn db:up
```

## How the App Connects

- The server initializes `DatabaseService` on startup.
- `DatabaseService` uses `AppDataSource` in `packages/db/src/data-source.ts`.
- The app connects to PostgreSQL/TimescaleDB database `tsdb`.
- In development, TypeORM schema sync and logging are enabled.
- On shutdown, the server closes the DB connection cleanly.

Key files:

- `packages/server/src/controllers/BackendController/BackendController.ts`
- `packages/db/src/services/DatabaseService.ts`
- `packages/db/src/data-source.ts`

## Related Docs

- `packages/db/README.md`
- `docs/SERVER.md`
