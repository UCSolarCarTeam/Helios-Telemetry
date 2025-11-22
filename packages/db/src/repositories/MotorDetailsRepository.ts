import { Repository } from "typeorm";
import { BaseRepository } from "./BaseRepository";
import { MotorDetails } from "../entities/MotorDetails.entity";
import { IMotorDetailsRepository } from "../interfaces/repositories.interface";

export class MotorDetailsRepository
  extends BaseRepository<MotorDetails>
  implements IMotorDetailsRepository
{
  constructor(repository: Repository<MotorDetails>) {
    super(repository);
  }
}
