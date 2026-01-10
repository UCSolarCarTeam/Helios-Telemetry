import { AppDataSource } from "db";

import { createLightweightApplicationLogger } from "@/utils/logger";

const logger = createLightweightApplicationLogger("DatabaseManager.ts");

export class DatabaseManager {
  private static instance: DatabaseManager;
  private isConnected = false;

  private constructor() {}

  static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  async initialize() {
    if (!this.isConnected) {
      await AppDataSource.initialize();
      this.isConnected = true;
      logger.info("Database initialized successfully");
    }
  }

  async close() {
    if (this.isConnected) {
      await AppDataSource.destroy();
      this.isConnected = false;
      logger.info("Database connection closed");
    }
  }
}
