import { DeepPartial, FindManyOptions, FindOneOptions } from "typeorm";
import { B3 } from "../entities/B3.entity";
import { BatteryFaults } from "../entities/BatteryFaults.entity";
import { Battery } from "../entities/Battery.entity";
import { Contactor } from "../entities/Contactor.entity";
import { Driver } from "../entities/Driver.entity";
import { KeyMotor } from "../entities/KeyMotor.entity";
import { Lap } from "../entities/Lap.entity";
import { MBMS } from "../entities/MBMS.entity";
import { MotorDetails } from "../entities/MotorDetails.entity";
import { MPPT } from "../entities/MPPT.entity";
import { ProximitySensors } from "../entities/ProximitySensors.entity";
import { Telemetry } from "../entities/Telemetry.entity";
import { TelemetryMetadata } from "../entities/TelemetryMetadata.entity";

export interface IBaseRepository<T> {
  create(entity: DeepPartial<T>): Promise<T>;
  findById(timestamp: Date): Promise<T | null>;
  findOne(options: FindOneOptions<T>): Promise<T | null>;
  findMany(options?: FindManyOptions<T>): Promise<T[]>;
  update(timestamp: Date, updates: DeepPartial<T>): Promise<T | null>;
  delete(timestamp: Date): Promise<boolean>;
  count(options?: FindManyOptions<T>): Promise<number>;
}

export interface IB3Repository extends IBaseRepository<B3> {}

export interface IBatteryRepository extends IBaseRepository<Battery> {}

export interface IBatteryFaultsRepository
  extends IBaseRepository<BatteryFaults> {}

export interface IContactorRepository extends IBaseRepository<Contactor> {}

export interface IDriverRepository extends IBaseRepository<Driver> {}

export interface IKeyMotorRepository extends IBaseRepository<KeyMotor> {}

export interface ILapRepository extends IBaseRepository<Lap> {}

export interface IMBMSRepository extends IBaseRepository<MBMS> {}

export interface IMotorDetailsRepository
  extends IBaseRepository<MotorDetails> {}

export interface IMPPTRepository extends IBaseRepository<MPPT> {}

export interface IProximitySensorsRepository
  extends IBaseRepository<ProximitySensors> {}

export interface ITelemetryRepository extends IBaseRepository<Telemetry> {}

export interface ITelemetryMetadataRepository
  extends IBaseRepository<TelemetryMetadata> {}
