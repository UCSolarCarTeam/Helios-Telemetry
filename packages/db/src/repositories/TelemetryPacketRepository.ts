import { Repository } from "typeorm";
import { BaseRepository } from "./BaseRepository";
import { TelemetryPacket } from "../entities/TelemetryPacket.entity";
import { ITelemetryPacketRepository } from "../interfaces/repositories.interface";

export class TelemetryRepository
  extends BaseRepository<TelemetryPacket>
  implements ITelemetryPacketRepository
{
  constructor(repository: Repository<TelemetryPacket>) {
    super(repository);
  }
}
