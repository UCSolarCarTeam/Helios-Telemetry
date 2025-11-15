import { DataSource } from 'typeorm';
import { AppDataSource } from '../data-source';
import { TestTable } from '../entities/TestTable.entity';
import { TestTableRepository } from '../repositories/TestTableRepository';

export class DatabaseService {
  private dataSource: DataSource;
  private _testTableRepository: TestTableRepository | null = null;

  constructor() {
    this.dataSource = AppDataSource;
  }

  async initialize(): Promise<void> {
    try {
      if (!this.dataSource.isInitialized) {
        await this.dataSource.initialize();
        console.log('Database connection initialized successfully');
      }
    } catch (error) {
      console.error('Error during database initialization:', error);
      throw error;
    }
  }

  async close(): Promise<void> {
    if (this.dataSource.isInitialized) {
      await this.dataSource.destroy();
      console.log('Database connection closed');
    }
  }

  get testTableRepository(): TestTableRepository {
    if (!this._testTableRepository) {
      const repository = this.dataSource.getRepository(TestTable);
      this._testTableRepository = new TestTableRepository(repository);
    }
    return this._testTableRepository;
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
