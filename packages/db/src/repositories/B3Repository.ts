import { Repository } from "typeorm";
import { BaseRepository } from "./BaseRepository";
import { B3 } from "../entities/B3.entity";
import { IB3Repository } from "../interfaces/repositories.interface";

export class B3Repository extends BaseRepository<B3> implements IB3Repository {
  constructor(repository: Repository<B3>) {
    super(repository);
  }
}
