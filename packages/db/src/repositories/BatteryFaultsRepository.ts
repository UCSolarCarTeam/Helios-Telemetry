import { Repository } from "typeorm";
import { BaseRepository } from "./BaseRepository";
import { BatteryFaults } from "../entities/BatteryFaults.entity";
import { IBatteryFaultsRepository } from "../interfaces/repositories.interface";

export class BatteryFaultsRepository
  extends BaseRepository<BatteryFaults>
  implements IBatteryFaultsRepository
{
  constructor(repository: Repository<BatteryFaults>) {
    super(repository);
  }
}
