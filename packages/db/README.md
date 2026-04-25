# Database Package - PostgreSQL + Prisma

This package provides database access for the telemetry backend using PostgreSQL and Prisma.

## Prerequisites

- Docker
- Node.js 18+
- Yarn

## Local Database Setup

1. Create `packages/db/.db.env` from the example:

```bash
cd packages/db
cp .db.env.example .db.env
```

2. Start PostgreSQL:

```bash
yarn db:up
```

3. Check logs:

```bash
yarn db:logs
```

4. Stop PostgreSQL when needed:

```bash
yarn db:down
```

## Prisma Environment Setup

Create `packages/db/.env` with:

```env
# Runtime queries
DATABASE_URL=postgresql://postgres:your_secure_password@localhost:5432/postgres

# Schema and migration commands
DIRECT_URL=postgresql://postgres:your_secure_password@localhost:5432/postgres
```

For Supabase:

```env
DATABASE_URL=postgresql://<user>:<password>@<host>:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://<user>:<password>@<host>:5432/postgres
```

## Server Environment Setup

Set `packages/server/.env`:

```env
DATABASE_URL=postgresql://postgres:your_secure_password@localhost:5432/postgres
DIRECT_URL=postgresql://postgres:your_secure_password@localhost:5432/postgres
NODE_ENV=development
```

## Common Commands

Run from `packages/db`:

- `yarn db:up` start local Postgres container
- `yarn db:down` stop local Postgres container
- `yarn db:logs` follow Postgres logs
- `yarn db:pull` introspect DB schema into `prisma/schema.prisma`
- `yarn db:generate` generate Prisma client
- `yarn db:push` push Prisma schema to DB
- `yarn db:studio` open Prisma Studio (uses `DATABASE_URL` from `.env`)
- `yarn migrate:generate` create and apply dev migration
- `yarn migrate:run` apply deploy migrations
- `yarn migrate:reset` reset DB and reapply migrations
- `yarn db:seed` seed sample data
- `yarn db:reset` restart local DB and seed sample data

## Field Change Workflow (Prisma)

When adding or removing telemetry fields, follow this order:

1. Update shared contract in `packages/shared/src/types.ts`.
2. Update packet generators/fake data (if applicable).
3. Update `flattenTelemetryData()` in `packages/db/src/services/DatabaseService.ts`.
4. Update `packages/db/prisma/schema.prisma` (`telemetry_packet` model).
5. Sync schema and regenerate Prisma client.
6. Build and verify inserts.

Run from repo root:

```bash
yarn workspace db db:push
yarn workspace db db:generate
yarn workspace db build
yarn workspace server build
```

For production-safe, reviewed changes, use a migration flow rather than schema push:

```bash
cd packages/db
npx prisma migrate dev --name <descriptive_change_name>
```

Then deploy migrations in target environments:

```bash
yarn workspace db migrate:run
```

## Seeding

`yarn db:seed` inserts sample drivers, laps, and telemetry packets.

## Troubleshooting

- Prisma cannot connect:
  - verify `DATABASE_URL` and `DIRECT_URL`
  - verify host/port/user/password are correct
- Local DB connection refused:
  - ensure `yarn db:up` is running
  - ensure port `5432` is available

## Important Files

- `src/services/DatabaseService.ts`
- `src/data-source.ts`
- `src/scripts/seed.ts`
- `prisma/schema.prisma`
- `prisma.config.ts`
- `docker-compose.yml`
