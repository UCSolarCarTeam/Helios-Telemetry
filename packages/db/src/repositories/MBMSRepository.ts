import { Repository } from "typeorm";
import { BaseRepository } from "./BaseRepository";
import { MBMS } from "../entities/MBMS.entity";
import { IMBMSRepository } from "../interfaces/repositories.interface";

export class MBMSRepository
  extends BaseRepository<MBMS>
  implements IMBMSRepository
{
  constructor(repository: Repository<MBMS>) {
    super(repository);
  }
}
