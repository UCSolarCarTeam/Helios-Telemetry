import { Repository } from "typeorm";
import { BaseRepository } from "./BaseRepository";
import { MPPT } from "../entities/MPPT.entity";
import { IMPPTRepository } from "../interfaces/repositories.interface";

export class MPPTRepository
  extends BaseRepository<MPPT>
  implements IMPPTRepository
{
  constructor(repository: Repository<MPPT>) {
    super(repository);
  }
}
