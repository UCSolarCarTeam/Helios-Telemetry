import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from "typeorm";
import { IBaseRepository } from "../interfaces/repositories.interface";

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  constructor(protected repository: Repository<T>) {}

  async create(entity: DeepPartial<T>): Promise<T> {
    const newEntity = this.repository.create(entity);
    return await this.repository.save(newEntity);
  }

  async findById(id: string | number): Promise<T | null> {
    return await this.repository.findOne({
      where: { id } as any,
    });
  }

  async findOne(options: FindOneOptions<T>): Promise<T | null> {
    return await this.repository.findOne(options);
  }

  async findMany(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options);
  }

  async update(
    id: string | number,
    updates: DeepPartial<T>,
  ): Promise<T | null> {
    await this.repository.update(id as string, updates);
    return await this.findById(id);
  }

  async delete(id: string | number): Promise<boolean> {
    const result = await this.repository.delete(id as any);
    return (result.affected ?? 0) > 0;
  }

  async count(options?: FindManyOptions<T>): Promise<number> {
    return await this.repository.count(options);
  }
}
