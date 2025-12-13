import { Repository } from "typeorm";
import { BaseRepository } from "./BaseRepository";
import { Lap } from "../entities/Lap.entity";
import { ILapRepository } from "../interfaces/repositories.interface";

export class LapRepository
  extends BaseRepository<Lap>
  implements ILapRepository
{
  constructor(repository: Repository<Lap>) {
    super(repository);
  }
}
