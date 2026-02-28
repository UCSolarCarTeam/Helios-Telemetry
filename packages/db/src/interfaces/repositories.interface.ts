import { DeepPartial, FindManyOptions, FindOneOptions } from "typeorm";

import { Driver } from "../entities/Driver.entity";
import { Lap } from "../entities/Lap.entity";

import { TelemetryPacket } from "../entities/TelemetryPacket.entity";

export interface IBaseRepository<T> {
  create(entity: DeepPartial<T>): Promise<T>;
  findById(timestamp: Date): Promise<T | null>;
  findOne(options: FindOneOptions<T>): Promise<T | null>;
  findMany(options?: FindManyOptions<T>): Promise<T[]>;
  update(timestamp: Date, updates: DeepPartial<T>): Promise<T | null>;
  delete(timestamp: Date): Promise<boolean>;
  count(options?: FindManyOptions<T>): Promise<number>;
}

export interface IDriverRepository extends IBaseRepository<Driver> {}

export interface ILapRepository extends IBaseRepository<Lap> {}

export interface ITelemetryPacketRepository extends IBaseRepository<TelemetryPacket> {}
