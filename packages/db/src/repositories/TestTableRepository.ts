import { Repository, Like, FindManyOptions } from "typeorm";
import { BaseRepository } from "./BaseRepository";
import { TestTable } from "../entities/TestTable.entity";
import { ITestTableRepository } from "../interfaces/repositories.interface";

export class TestTableRepository
  extends BaseRepository<TestTable>
  implements ITestTableRepository
{
  constructor(repository: Repository<TestTable>) {
    super(repository);
  }

  async findMany(
    options?: FindManyOptions<TestTable> | undefined,
  ): Promise<TestTable[]> {
    return this.repository.find(options);
  }

  async findByName(name: string): Promise<TestTable[]> {
    return await this.repository.find({
      order: {
        createdAt: "DESC",
      },
      where: {
        name: Like(`%${name}%`),
      },
    });
  }

  async findActiveRecords(): Promise<TestTable[]> {
    return await this.repository.find({
      order: {
        updatedAt: "DESC",
      },
      where: {
        isActive: true,
      },
    });
  }

  async findByValueRange(min: number, max: number): Promise<TestTable[]> {
    return await this.repository
      .createQueryBuilder("test")
      .where("test.value >= :min AND test.value <= :max", { max, min })
      .orderBy("test.value", "ASC")
      .getMany();
  }
}
