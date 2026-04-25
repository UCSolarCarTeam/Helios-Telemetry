import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import path from "path";

const packageRoot = path.resolve(__dirname, "..");

dotenv.config({ path: path.join(packageRoot, ".env") });
dotenv.config({ path: path.join(packageRoot, ".db.env") });

const databaseHost = process.env.DATABASE_HOST;
const databasePort = process.env.DATABASE_PORT;
const databaseUsername = process.env.DATABASE_USERNAME;
const databasePassword = process.env.DATABASE_PASSWORD;

if (!process.env.DATABASE_URL && databaseHost && databasePort && databaseUsername && databasePassword) {
  process.env.DATABASE_URL = `postgresql://${databaseUsername}:${databasePassword}@${databaseHost}:${databasePort}/postgres`;
}
if (!process.env.DATABASE_URL) {
  throw new Error(
    "Database URL is not set. Set DATABASE_URL in packages/db/.env (or the process environment).",
  );
}

export const prisma = new PrismaClient();
