import { DeepPartial, FindManyOptions, FindOneOptions } from "typeorm";
import { TestTable } from "../entities/TestTable.entity";

export interface IBaseRepository<T> {
  create(entity: DeepPartial<T>): Promise<T>;
  findById(id: string | number): Promise<T | null>;
  findOne(options: FindOneOptions<T>): Promise<T | null>;
  findMany(options?: FindManyOptions<T>): Promise<T[]>;
  update(id: string | number, updates: DeepPartial<T>): Promise<T | null>;
  delete(id: string | number): Promise<boolean>;
  count(options?: FindManyOptions<T>): Promise<number>;
}

export interface ITestTableRepository extends IBaseRepository<TestTable> {
  findByName(name: string): Promise<TestTable[]>;
  findActiveRecords(): Promise<TestTable[]>;
}
