//
import { createLightweightApplicationLogger } from "@/utils/logger";

import { AppDataSource } from "@db/data-source";
import { TelemetryService } from "@db/services/TelemetryService";
import { ITelemetryData } from "@shared/helios-types";

const logger = createLightweightApplicationLogger("DatabaseManager.ts");

export class DatabaseManager {
  private static instance: DatabaseManager;
  private telemetryService?: TelemetryService;
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
      this.telemetryService = new TelemetryService();
      this.isConnected = true;
      logger.info("Database initialized successfully");
    }
  }

  async insertTelemetryData(packet: ITelemetryData) {
    if (!this.telemetryService) {
      throw new Error("DatabaseManager not initialized");
    }
    return this.telemetryService.insertTelemetryPacket(packet);
  }

  async getTelemetryBetweenDates(start: Date, end: Date, rfid?: string) {
    if (!this.telemetryService) {
      throw new Error("DatabaseManager not initialized");
    }
    return this.telemetryService.getTelemetryBetweenDates(start, end, rfid);
  }

  async close() {
    if (this.isConnected) {
      await AppDataSource.destroy();
      this.isConnected = false;
      logger.info("Database connection closed");
    }
  }
}
