import "@timescaledb/typeorm";
import { DataSource, SimpleConsoleLogger } from "typeorm";

import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  entities: [],
  logger: new SimpleConsoleLogger(false),
  migrations: ["migrations/*.ts"],
  synchronize: false,
  type: "postgres",
  url: process.env.DATABASE_URL,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
