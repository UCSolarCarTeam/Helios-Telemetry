import { DatabaseService, TestTableService } from 'db';

export class DatabaseManager {
  private static instance: DatabaseManager;
  private databaseService: DatabaseService;
  private _testTableService: TestTableService | null = null;

  private constructor() {
    this.databaseService = new DatabaseService();
  }

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  public async initialize(): Promise<void> {
    try {
      await this.databaseService.initialize();
      console.log('DatabaseManager initialized successfully');
    } catch (error) {
      console.error('Failed to initialize DatabaseManager:', error);
      throw error;
    }
  }

  public async close(): Promise<void> {
    await this.databaseService.close();
    console.log('DatabaseManager closed');
  }

  // Lazy-load services
  public get testTableService(): TestTableService {
    if (!this._testTableService) {
      this._testTableService = new TestTableService(
        this.databaseService.testTableRepository
      );
    }
    return this._testTableService;
  }

  // Helper method to check connection status
  public get isConnected(): boolean {
    return this.databaseService.isConnected;
  }

  // Get raw database service if needed
  public get rawDatabaseService(): DatabaseService {
    return this.databaseService;
  }
}
