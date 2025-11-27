import { Repository } from "typeorm";
import { BaseRepository } from "./BaseRepository";
import { Battery } from "../entities/Battery.entity";
import { IBatteryRepository } from "../interfaces/repositories.interface";

export class BatteryRepository
  extends BaseRepository<Battery>
  implements IBatteryRepository
{
  constructor(repository: Repository<Battery>) {
    super(repository);
  }
}
