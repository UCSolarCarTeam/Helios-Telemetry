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
- `yarn migrate:dev` create and apply dev migration (generates SQL migration file, applies it to local DB, and regenerates Prisma client)
- `yarn migrate:run` apply pending migrations (production-safe, no schema generation)
- `yarn migrate:reset` reset DB and reapply migrations
- `yarn db:seed` seed sample data
- `yarn db:reset` restart local DB and seed sample data

## Field Change Workflow (Prisma)

When adding or removing telemetry fields, follow this order:

1. Update shared contract in `packages/shared/src/types.ts`.
2. Update packet generators/fake data (if applicable).
3. Update `flattenTelemetryData()` in `packages/db/src/services/DatabaseService.ts`.
4. Update `packages/db/prisma/schema.prisma` (`telemetry_packet` model).
5. Generate a migration, apply it to local DB, and regenerate Prisma client (from repo root):

```bash
yarn workspace db migrate:dev --name <descriptive_change_name>
```

6. Build and verify inserts (from repo root):

```bash
yarn workspace db build
yarn workspace server build
```

7. Open a PR. After merge, deploy the migration to Supabase (from repo root):

```bash
yarn workspace db migrate:run
```

> **Quick local iteration only (no migration file):** `yarn workspace db db:push` pushes the schema directly without creating a migration. Use this only for throwaway local experiments — never for changes going to production.

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
