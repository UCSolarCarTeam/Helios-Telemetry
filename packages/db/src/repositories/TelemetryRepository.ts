import { Repository } from "typeorm";
import { BaseRepository } from "./BaseRepository";
import { Telemetry } from "../entities/Telemetry.entity";
import { ITelemetryRepository } from "../interfaces/repositories.interface";

export class TelemetryRepository
  extends BaseRepository<Telemetry>
  implements ITelemetryRepository
{
  constructor(repository: Repository<Telemetry>) {
    super(repository);
  }
}
