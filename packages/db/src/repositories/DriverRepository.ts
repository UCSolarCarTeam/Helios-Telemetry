import { Repository } from "typeorm";
import { BaseRepository } from "./BaseRepository";
import { Driver } from "../entities/Driver.entity";
import { IDriverRepository } from "../interfaces/repositories.interface";

export class DriverRepository
  extends BaseRepository<Driver>
  implements IDriverRepository
{
  constructor(repository: Repository<Driver>) {
    super(repository);
  }
}
