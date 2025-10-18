import { TestTable } from '../entities/TestTable.entity';
import { TestTableRepository } from '../repositories/TestTableRepository';

export interface CreateTestTableDto {
  name: string;
  description?: string;
  value?: number;
  isActive?: boolean;
}

export interface UpdateTestTableDto {
  name?: string;
  description?: string;
  value?: number;
  isActive?: boolean;
}

export class TestTableService {
  constructor(private testTableRepository: TestTableRepository) {}

  async createTestEntry(data: CreateTestTableDto): Promise<TestTable> {
    // Add business logic here (validation, transformation, etc.)
    if (!data.name || data.name.trim().length === 0) {
      throw new Error('Name is required');
    }

    if (data.name.length > 255) {
      throw new Error('Name must be less than 255 characters');
    }

    return await this.testTableRepository.create({
      name: data.name.trim(),
      description: data.description?.trim(),
      value: data.value ?? 0,
      isActive: data.isActive ?? true,
    });
  }

  async updateTestEntry(id: string, data: UpdateTestTableDto): Promise<TestTable | null> {
    // Business logic for updates
    if (data.name !== undefined && data.name.trim().length === 0) {
      throw new Error('Name cannot be empty');
    }

    if (data.name && data.name.length > 255) {
      throw new Error('Name must be less than 255 characters');
    }

    const updateData: Partial<TestTable> = {};
    if (data.name !== undefined) updateData.name = data.name.trim();
    if (data.description !== undefined) updateData.description = data.description?.trim();
    if (data.value !== undefined) updateData.value = data.value;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    return await this.testTableRepository.update(id, updateData);
  }

  async getTestEntryById(id: string): Promise<TestTable | null> {
    return await this.testTableRepository.findById(id);
  }

  async getAllTestEntries(): Promise<TestTable[]> {
    return await this.testTableRepository.findMany({
      order: { createdAt: 'DESC' },
    });
  }

  async getActiveTestEntries(): Promise<TestTable[]> {
    return await this.testTableRepository.findActiveRecords();
  }

  async searchTestEntriesByName(name: string): Promise<TestTable[]> {
    if (!name || name.trim().length === 0) {
      throw new Error('Search name cannot be empty');
    }
    
    return await this.testTableRepository.findByName(name.trim());
  }

  async deleteTestEntry(id: string): Promise<boolean> {
    const exists = await this.testTableRepository.findById(id);
    if (!exists) {
      throw new Error('Test entry not found');
    }
    
    return await this.testTableRepository.delete(id);
  }

  async getTestEntriesCount(): Promise<number> {
    return await this.testTableRepository.count();
  }
}
