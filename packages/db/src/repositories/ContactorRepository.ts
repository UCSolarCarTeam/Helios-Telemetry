import { Repository } from "typeorm";
import { BaseRepository } from "./BaseRepository";
import { Contactor } from "../entities/Contactor.entity";
import { IContactorRepository } from "../interfaces/repositories.interface";

export class ContactorRepository
  extends BaseRepository<Contactor>
  implements IContactorRepository
{
  constructor(repository: Repository<Contactor>) {
    super(repository);
  }
}
