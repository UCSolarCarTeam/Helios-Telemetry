import { DataSource } from "typeorm";
import { AppDataSource } from "../data-source";

export class DatabaseService {
  private dataSource: DataSource;

  constructor() {
    this.dataSource = AppDataSource;
  }

  async initialize(): Promise<void> {
    try {
      if (!this.dataSource.isInitialized) {
        await this.dataSource.initialize();
        console.log("Database connection initialized successfully");
      }
    } catch (error) {
      console.error("Error during database initialization:", error);
      throw error;
    }
  }

  async close(): Promise<void> {
    if (this.dataSource.isInitialized) {
      await this.dataSource.destroy();
      console.log("Database connection closed");
    }
  }

  // Helper method to check if database is connected
  get isConnected(): boolean {
    return this.dataSource.isInitialized;
  }

  // Get the raw data source if needed for advanced operations
  get rawDataSource(): DataSource {
    return this.dataSource;
  }
}
