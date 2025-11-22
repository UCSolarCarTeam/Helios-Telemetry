import { Repository } from "typeorm";
import { BaseRepository } from "./BaseRepository";
import { KeyMotor } from "../entities/KeyMotor.entity";
import { IKeyMotorRepository } from "../interfaces/repositories.interface";

export class KeyMotorRepository
  extends BaseRepository<KeyMotor>
  implements IKeyMotorRepository
{
  constructor(repository: Repository<KeyMotor>) {
    super(repository);
  }
}
