import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

// import your entities/tables here
import { TestTable } from "./entities/TestTable.entity";

dotenv.config({ path: ".db.env" });

export const AppDataSource = new DataSource({
  // database name
  database: process.env.DB_NAME || "postgres",
  // entity schemas, whenever you make a table you have to add it here
  entities: [TestTable],
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
