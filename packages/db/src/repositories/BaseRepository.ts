import {
  Repository,
  FindOptionsWhere,
  FindManyOptions,
  DeepPartial,
} from "typeorm";
import { ObjectLiteral, FindOneOptions } from "typeorm";

// every entity has either timestamp (car parts) and/or rfid (driver and car parts) as its primary key
interface BaseEntity {
  Timestamp?: Date;
  Rfid?: string;
}

export abstract class BaseRepository<T extends ObjectLiteral & BaseEntity> {
  constructor(
    protected repository: Repository<T>,
    protected primaryKey: keyof T = "timestamp" as keyof T,
  ) {}

  async findMany(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async findOne(options: FindOneOptions<T>): Promise<T | null> {
    return this.repository.findOne(options);
  }

  async findById(id: Date | string): Promise<T | null> {
    return this.repository.findOne({
      where: { [this.primaryKey]: id } as FindOptionsWhere<T>,
    });
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async update(id: Date | string, data: Partial<T>): Promise<T | null> {
    // no nested updates possible with current any entitiy so Partial<T> is okay
    await this.repository.update(
      { [this.primaryKey]: id } as FindOptionsWhere<T>,
      data,
    );
    return this.findById(id);
  }

  async delete(timestamp: Date): Promise<boolean> {
    const result = await this.repository.delete(timestamp);
    return (result.affected ?? 0) > 0;
  }

  async save(entity: DeepPartial<T>): Promise<T> {
    return this.repository.save(entity);
  }

  async count(options?: FindManyOptions<T>): Promise<number> {
    return this.repository.count(options);
  }
}
