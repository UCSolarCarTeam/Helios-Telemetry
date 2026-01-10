import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

// import your entities/tables here
import { TelemetryMetadata } from "./entities/TelemetryMetadata.entity";
import { Battery } from "./entities/Battery.entity";
import { BatteryFaults } from "./entities/BatteryFaults.entity";
import { MotorDetails } from "./entities/MotorDetails.entity";
import { KeyMotor } from "./entities/KeyMotor.entity";
import { MPPT } from "./entities/MPPT.entity";
import { Contactor } from "./entities/Contactor.entity";
import { B3 } from "./entities/B3.entity";
import { MBMS } from "./entities/MBMS.entity";
import { Telemetry } from "./entities/Telemetry.entity";
import { ProximitySensors } from "./entities/ProximitySensors.entity";
import { Driver } from "./entities/Driver.entity";
import { Lap } from "./entities/Lap.entity";
import { TelemetryPacket } from "./entities/TelemetryPacket.entity";

dotenv.config({ path: ".db.env" });

export const AppDataSource = new DataSource({
  // database name
  database: process.env.DB_NAME || "postgres",
  // entity schemas, whenever you make a table you have to add it here
  entities: [
    TelemetryMetadata,
    Battery,
    BatteryFaults,
    MotorDetails,
    KeyMotor,
    MPPT,
    Contactor,
    B3,
    MBMS,
    Telemetry,
    ProximitySensors,
    Driver,
    Lap,
    TelemetryPacket,
  ],
  // database host (if it's localhost or not)
  host: process.env.DB_HOST || "localhost",
  // logging: https://typeorm.io/docs/advanced-topics/logging
  // you can enable logging only in development to avoid performance issues
  // there are also different level of logging you can set like "all", "query", etc.
  logging: process.env.NODE_ENV === "development",
  // the migrations directory (not sure if this works yet)
  migrations: [__dirname + "/migrations/*.{js,ts}"],
  password: process.env.POSTGRES_PASSWORD || "postgres",
  port: parseInt(process.env.DB_PORT || "5432"),
  synchronize: process.env.NODE_ENV === "development", // Only in development
  type: "postgres",
  username: process.env.POSTGRES_USERNAME || "postgres",
});
