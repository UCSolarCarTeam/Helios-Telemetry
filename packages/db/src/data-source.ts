import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

// import your entities/tables here
import { Driver } from "./entities/Driver.entity";
import { Lap } from "./entities/Lap.entity";
import { TelemetryPacket } from "./entities/TelemetryPacket.entity";

dotenv.config();

if (
  !process.env.DATABASE_HOST ||
  !process.env.DATABASE_PORT ||
  !process.env.DATABASE_USERNAME ||
  !process.env.DATABASE_PASSWORD
) {
  throw new Error("Database configuration environment variables are not set.");
}

const isProd = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource({
  database: "tsdb",
  entities: [TelemetryPacket, Driver, Lap],
  host: process.env.DATABASE_HOST,
  logging: !isProd,
  migrations: [__dirname + "/migrations/*.{js,ts}"],
  password: process.env.DATABASE_PASSWORD,

  port: process.env.DATABASE_PORT
    ? parseInt(process.env.DATABASE_PORT, 10)
    : 5432,
  synchronize: !isProd,

  type: "postgres",
  username: process.env.DATABASE_USERNAME,
  ...(isProd && {
    ssl: {
      rejectUnauthorized: false,
    },
  }),
});
