import { Repository } from "typeorm";
import { BaseRepository } from "./BaseRepository";
import { ProximitySensors } from "../entities/ProximitySensors.entity";
import { IProximitySensorsRepository } from "../interfaces/repositories.interface";

export class ProximitySensorsRepository
  extends BaseRepository<ProximitySensors>
  implements IProximitySensorsRepository
{
  constructor(repository: Repository<ProximitySensors>) {
    super(repository);
  }
}
