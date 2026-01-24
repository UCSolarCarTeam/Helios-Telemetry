import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

// import your entities/tables here
import { Driver } from "./entities/Driver.entity";
import { Lap } from "./entities/Lap.entity";
import { TelemetryPacket } from "./entities/TelemetryPacket.entity";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required in .db.env file");
}

export const AppDataSource = new DataSource({
  entities: [TelemetryPacket, Driver, Lap],
  logging: process.env.NODE_ENV === "development",
  migrations: [__dirname + "/migrations/*.{js,ts}"],
  synchronize: process.env.NODE_ENV === "development",
  type: "postgres",
  url: process.env.DATABASE_URL,
});
