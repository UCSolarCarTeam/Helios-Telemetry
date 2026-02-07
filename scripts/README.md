# Database Seeding Script

This directory contains scripts for seeding the development/test database with fake data.

## Overview

The `seed.ts` script populates the database with:
- **5 Driver records** with fake names and RFID numbers
- **1,000 TelemetryPacket records** with realistic fake sensor data
- **100 Lap records** derived from the telemetry packets (approximately 1 lap per 10 packets)

The script is designed to be **idempotent**, meaning it can be run multiple times safely. Each run will clear existing data before inserting new seed data.

## Prerequisites

Before running the seeding script, ensure you have:

1. **Database Running**: Start the TimescaleDB database:
   ```bash
   yarn db:up
   ```

2. **Environment Variables**: Set up the required database environment variables. Create a `.env` file in the project root or set these variables:
   ```
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USERNAME=your_username
   DATABASE_PASSWORD=your_password
   ```

3. **Database Schema**: Run migrations to create the necessary tables:
   ```bash
   yarn migrate:run
   ```

## Usage

To seed the database with fake data:

```bash
yarn seed
```

This command will:
1. Connect to the database using TypeORM
2. Clear all existing data from the Lap, TelemetryPacket, and Driver tables
3. Generate and insert new fake data
4. Display progress information

## Data Generation

### Drivers
- 5 drivers are created with randomly generated names and 10-digit RFID numbers
- Each driver's RFID is used to associate packets and laps

### Telemetry Packets
- 1,000 packets are generated using the `generateFakeTelemetryData()` function from `packages/shared/src/functions.ts`
- Packets are distributed across the 5 drivers (200 packets per driver)
- Timestamps are sequential, starting from 2 hours ago, with 1 second intervals
- All sensor fields are populated with realistic fake data

### Laps
- 100 laps are derived from the telemetry packets
- Each lap is calculated from approximately 10 consecutive packets
- Lap statistics are computed using similar logic to the production `LapController`:
  - LapTime: Time between first and last packet in the lap
  - AverageSpeed: Average vehicle velocity across all packets
  - Distance: Calculated from average speed and lap time
  - Power metrics: TotalPowerIn, TotalPowerOut, NetPowerOut
  - Battery metrics: AmpHours, AveragePackCurrent, BatterySecondsRemaining
  - EnergyConsumed: Lap time × net power output

## Implementation Details

The script follows these key principles:

1. **Dependency Order**: Data is deleted and inserted in the correct order to respect foreign key constraints:
   - Deletion: Lap → TelemetryPacket → Driver
   - Insertion: Driver → TelemetryPacket → Lap

2. **Batch Insertion**: Telemetry packets are inserted in batches of 100 to avoid overwhelming the database

3. **Realistic Data**: Lap calculations mirror the production `LapController` logic to ensure data is realistic for testing

4. **Error Handling**: The script includes comprehensive error handling and will exit with an appropriate status code

## Troubleshooting

### Cannot Connect to Database
- Ensure the database is running: `yarn db:up`
- Check that environment variables are set correctly
- Verify the database is listening on the correct port (default: 5432)

### Type Errors
- The script uses TypeORM entities which require `reflect-metadata`
- Ensure all dependencies are installed: `yarn install`

### Foreign Key Violations
- The script clears tables in dependency order to avoid FK violations
- If you encounter FK errors, ensure no other processes are modifying the database during seeding

## Development and Testing Only

**⚠️ WARNING**: This script is intended for development and testing environments only. It will delete all existing data in the Lap, TelemetryPacket, and Driver tables. **Do NOT run this script in production**.

## Related Files

- Entity Definitions:
  - `/packages/db/src/entities/Driver.entity.ts`
  - `/packages/db/src/entities/TelemetryPacket.entity.ts`
  - `/packages/db/src/entities/Lap.entity.ts`
- Data Generation: `/packages/shared/src/functions.ts`
- Database Configuration: `/packages/db/src/data-source.ts`
- Production Lap Logic: `/packages/server/src/controllers/LapController/LapController.ts`
