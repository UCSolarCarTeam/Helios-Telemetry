import { Repository, Like } from 'typeorm';
import { BaseRepository } from './BaseRepository';
import { TestTable } from '../entities/TestTable.entity';
import { ITestTableRepository } from '../interfaces/repositories.interface';

export class TestTableRepository extends BaseRepository<TestTable> implements ITestTableRepository {
  constructor(repository: Repository<TestTable>) {
    super(repository);
  }

  async findByName(name: string): Promise<TestTable[]> {
    return await this.repository.find({
      where: {
        name: Like(`%${name}%`),
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findActiveRecords(): Promise<TestTable[]> {
    return await this.repository.find({
      where: {
        isActive: true,
      },
      order: {
        updatedAt: 'DESC',
      },
    });
  }

  async findByValueRange(min: number, max: number): Promise<TestTable[]> {
    return await this.repository
      .createQueryBuilder('test')
      .where('test.value >= :min AND test.value <= :max', { min, max })
      .orderBy('test.value', 'ASC')
      .getMany();
  }
}
