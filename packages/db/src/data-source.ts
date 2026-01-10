import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

// import your entities/tables here
import { Driver } from "./entities/Driver.entity";
import { Lap } from "./entities/Lap.entity";
import { TelemetryPacket } from "./entities/TelemetryPacket.entity";

dotenv.config({ path: ".db.env" });

export const AppDataSource = new DataSource({
  entities: [TelemetryPacket, Driver, Lap],
  logging: process.env.NODE_ENV === "development",
  migrations: [__dirname + "/migrations/*.{js,ts}"],
  synchronize: process.env.NODE_ENV === "development",
  type: "postgres",
  url: "postgres://tsdbadmin:l61gksd8ona24d62@l6yyro58r7.wy9edrssy5.tsdb.cloud.timescale.com:38572/tsdb",
});
