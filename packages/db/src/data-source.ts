import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import path from "path";

// import your entities/tables here
import { Driver } from "./entities/Driver.entity";
import { Lap } from "./entities/Lap.entity";
import { TelemetryPacket } from "./entities/TelemetryPacket.entity";

const packageRoot = path.resolve(__dirname, "..");

dotenv.config({ path: path.join(packageRoot, ".env") });
dotenv.config({ path: path.join(packageRoot, ".db.env") });

const databaseHost = process.env.DATABASE_HOST ?? "localhost";
const databasePort = process.env.DATABASE_PORT ?? "5432";
const databaseUsername = process.env.DATABASE_USERNAME ?? process.env.POSTGRES_USER;
const databasePassword = process.env.DATABASE_PASSWORD ?? process.env.POSTGRES_PASSWORD;

if (!databaseUsername || !databasePassword) {
  throw new Error(
    "Database credentials are not set. Configure DATABASE_USERNAME/DATABASE_PASSWORD or POSTGRES_USER/POSTGRES_PASSWORD."
  );
}

const isProd = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource({
  database: "tsdb",
  entities: [TelemetryPacket, Driver, Lap],
  host: databaseHost,
  logging: false,
  migrations: [__dirname + "/migrations/*.{js,ts}"],
  password: databasePassword,

  port: parseInt(databasePort, 10),
  synchronize: !isProd,

  type: "postgres",
  username: databaseUsername,
  ...(isProd && {
    ssl: {
      rejectUnauthorized: false,
    },
  }),
});
