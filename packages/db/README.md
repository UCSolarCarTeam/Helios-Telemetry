# Database Package - Postgres Setup

This package manages the Postgres database connection using TypeORM. It provides repositories and services for managing telemetry data, driver information, and lap records.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Connecting the Database to Your App](#connecting-the-database-to-your-app)
- [Available Scripts](#available-scripts)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- Docker installed and running
- Node.js 18+ and Yarn
- The Helios Telemetry monorepo set up

## Local Development Setup

### Step 1: Create Database Environment File

Use the shared example file in `packages/db`:

```bash
cd packages/db
cp .db.env.example .db.env
```

Set the local database credentials in `.db.env`:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=tsdb
```

**Important:** Choose a secure password and keep this file safe. The `.db.env` file is gitignored and should never be committed.

If you run `db` package scripts directly (for example `yarn db:seed` or migrations), the package will also read this same `.db.env` file automatically for local development.

### Step 2: Start the Database Container

From the `packages/db` directory, run:

```bash
yarn db:up
```

This command:

- Pulls the Postgres image (if not already present)
- Starts a PostgreSQL container with Postgres extension
- Exposes the database on port `5432`
- Creates a persistent volume to store data

### Step 3: Verify Database is Running

Check the database logs:

```bash
yarn db:logs
```

You should see output indicating that PostgreSQL is ready to accept connections.

To connect directly to the database using `psql`:

```bash
docker exec -it db-db-1 psql -U postgres -d tsdb
```

_(Note: The container name may vary. Use `docker ps` to find the exact name)_

### Step 4: Stop the Database (when needed)

To stop the database container:

```bash
yarn db:down
```

## Connecting the Database to Your App

### Server Package Configuration

To connect the backend server to your local database, you need to set environment variables in the `packages/server` directory.

#### Step 1: Create Server Environment File

If you don't already have one, create a `.env` file in `packages/server`:

```bash
cd packages/server
touch .env
```

#### Step 2: Add Database Configuration

Add the following variables to `packages/server/.env`:

```env
# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_secure_password
NODE_ENV=development

# Other required variables (ask your team lead for values)
MQTT_USERNAME=your_mqtt_username
MQTT_PASSWORD=your_mqtt_password
FINISH_LINE_UPDATE_PASSWORD=your_finish_line_password
DRIVER_NAME_UPDATE_PASSWORD=your_driver_update_password
```

**Important Notes:**

- `DATABASE_PASSWORD` must match the password in `packages/db/.db.env`
- `DATABASE_USERNAME` must match `POSTGRES_USER` in `packages/db/.db.env`
- The database name is hardcoded as `tsdb` in the data source configuration
- `NODE_ENV=development` enables auto-synchronization of database schema

#### Step 3: Start the Server

From the repository root or the `packages/server` directory:

```bash
# From root
yarn dev:server

# Or from packages/server
yarn start
```

The server will:

1. Connect to the local Postgres database
2. Auto-create/sync database tables (in development mode)
3. Start accepting telemetry data

## Available Scripts

Run these commands from the `packages/db` directory:

| Command         | Description                                     |
| --------------- | ----------------------------------------------- |
| `yarn db:up`    | Start the database container in detached mode   |
| `yarn db:down`  | Stop and remove the database container          |
| `yarn db:logs`  | View database container logs (follow mode)      |
| `yarn db:seed`  | Populate database with sample data              |
| `yarn db:reset` | Reset database and reseed (⚠️ deletes all data) |
| `yarn build`    | Compile TypeScript to JavaScript                |
| `yarn start`    | Run the compiled database service               |

### TypeORM Migration Commands

| Command                 | Description                                      | Notes                              |
| ----------------------- | ------------------------------------------------ | ---------------------------------- |
| `yarn migrate:generate` | Generate a new migration based on entity changes | ⚠️ Requires toolkit extension      |
| `yarn migrate:run`      | Run pending migrations                           | ⚠️ Requires toolkit extension      |
| `yarn migrate:revert`   | Revert the last migration                        | ⚠️ Requires toolkit extension      |
| `yarn schema:sync`      | Sync database schema with entities (dev only)    | ⚠️ Requires toolkit extension      |
| `yarn schema:drop`      | Drop all database tables                         | ⚠️ Use with caution - deletes data |

**For local development:** Tables are automatically created when the server starts with `NODE_ENV=development`.

## Troubleshooting

### Database Connection Errors

**Error: `Database configuration environment variables are not set.`**

- Ensure all required environment variables are set in `packages/server/.env`:
  - `DATABASE_HOST`
  - `DATABASE_PORT`
  - `DATABASE_USERNAME`
  - `DATABASE_PASSWORD`

**Error: `ECONNREFUSED` or connection timeout**

- Verify the database container is running: `docker ps`
- Check if port 5432 is available: `lsof -i :5432`
- Restart the database: `yarn db:down && yarn db:up`

**Error: Authentication failed**

- Verify that `DATABASE_PASSWORD` in `packages/server/.env` matches `POSTGRES_PASSWORD` in `packages/db/.db.env`
- Verify that `DATABASE_USERNAME` matches `POSTGRES_USER`

### Container Issues

**Container name conflict**

If you get an error about the container name already existing:

```bash
docker rm db-db-1
yarn db:up
```

**Volume issues**

To completely reset the database (⚠️ deletes all data):

```bash
docker compose down -v
yarn db:up
```

### Schema Sync Issues

**Tables not being created automatically**

- Ensure `NODE_ENV=development` in your server environment
- In production, `synchronize` is disabled to prevent accidental schema changes
- For local dev, just start the server - tables auto-create on first connection

## Seeding the Database

The seed script populates your database with sample data for development and testing.

### What Gets Seeded

When you run `yarn db:seed`, the script creates:

- **5 Sample Drivers** with unique RFID tags
  - Alex Johnson (DRIVER001)
  - Sarah Chen (DRIVER002)
  - Marcus Williams (DRIVER003)
  - Emma Rodriguez (DRIVER004)
  - David Kim (DRIVER005)

- **~21 Lap Records** (3-5 laps per driver) with realistic data:
  - Lap times (2-3 minutes)
  - Power consumption metrics
  - Distance traveled
  - Average speeds (40-60 km/h)
  - Battery metrics

- **~62 Telemetry Packets** (10-15 per driver) generated using `generateFakeTelemetryData()` from `@shared/helios-types`:
  - **Comprehensive sensor data** including all battery, motor, GPS, MPPT, BPS, and auxiliary systems
  - **Realistic values** generated by the shared faker function
  - **All telemetry fields** populated (same function used by the client for testing)

### Running the Seed Script

```bash
# Seed the database with sample data
yarn db:seed

# Or reset everything and reseed (⚠️ deletes all existing data)
yarn db:reset
```

**Note:** The seed script clears all existing data before inserting new data. If you want to keep existing data, comment out the "Clear existing data" section in `src/scripts/seed.ts`.

### Customizing Seed Data

Edit `packages/db/src/scripts/seed.ts` to customize:

- Number of drivers and their names/RFIDs
- Number of laps per driver (currently 3-5 per driver)
- Number of telemetry packets (currently 10-15 per driver)
- Lap data ranges (lap times, speeds, power consumption)

**Note:** Telemetry packet data is generated by `generateFakeTelemetryData()` from the shared package. To modify telemetry data generation logic, edit `packages/shared/src/functions.ts`.

### Checking Database Contents

Connect to the database and run SQL commands:

```bash
# Connect to database
docker exec -it db-db-1 psql -U postgres -d tsdb

# List all tables
\dt

# View table structure
\d "TelemetryPacket"

# Query data
SELECT * FROM "Driver" LIMIT 10;

# Exit
\q
```

## Architecture Overview

- **Entities**: TypeORM entity definitions (`src/entities/`)
  - `TelemetryPacket.entity.ts` - Stores telemetry data packets
  - `Driver.entity.ts` - Stores driver information
  - `Lap.entity.ts` - Stores lap records

- **Services**: Database operations (`src/services/`)
  - `DatabaseService.ts` - Singleton service for all DB operations

- **Data Source**: TypeORM configuration (`src/data-source.ts`)
  - Connects to PostgreSQL
  - Auto-syncs schema in development
  - Uses SSL in production

## Additional Resources

- [TypeORM Documentation](https://typeorm.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
