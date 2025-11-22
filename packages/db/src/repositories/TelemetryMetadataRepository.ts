import { Repository } from "typeorm";
import { BaseRepository } from "./BaseRepository";
import { TelemetryMetadata } from "../entities/TelemetryMetadata.entity";
import { ITelemetryMetadataRepository } from "../interfaces/repositories.interface";

export class TelemetryMetadataRepository
  extends BaseRepository<TelemetryMetadata>
  implements ITelemetryMetadataRepository
{
  constructor(repository: Repository<TelemetryMetadata>) {
    super(repository);
  }
}
