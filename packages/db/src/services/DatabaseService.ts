import { Between, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { ITelemetryData } from "@shared/helios-types";
import { TelemetryPacket } from "../entities/TelemetryPacket.entity";
import { Driver } from "../entities/Driver.entity";
import { Lap } from "../entities/Lap.entity";
import { GenericResponse } from "./DatabaseService.types";

export class DatabaseService {
  private isConnected = false;
  private static instance: DatabaseService;
  private telemetryPacketRepo: Repository<TelemetryPacket>;
  private driverRepo: Repository<Driver>;
  private lapRepo: Repository<Lap>;

  constructor() {
    this.telemetryPacketRepo = AppDataSource.getRepository(TelemetryPacket);
    this.driverRepo = AppDataSource.getRepository(Driver);
    this.lapRepo = AppDataSource.getRepository(Lap);
  }

  async initialize() {
    if (!this.isConnected) {
      await AppDataSource.initialize();
      this.isConnected = true;
    }
  }

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  private flattenTelemetryData(
    packet: ITelemetryData,
  ): Partial<TelemetryPacket> {
    const timestamp = new Date(packet.TimeStamp * 1000);
    const Rfid = packet.Pi.Rfid;

    return {
      // Metadata
      RaceName: packet.Title,
      Rfid,
      // Primary keys
      Timestamp: timestamp,
      Title: packet.Title,

      // B3 data
      ...packet.B3,

      // Battery data
      ...packet.Battery,

      // Battery Faults (flatten Errors and Warnings)
      ...packet.BatteryFaults.Errors,
      ...packet.BatteryFaults.Warnings,

      // Contactor data
      ...packet.Contactor,

      // KeyMotor data
      ...packet.KeyMotor,

      // MBMS data
      ...packet.MBMS,

      // MPPT data
      ...packet.MPPT,

      // Motor 0 data (prefix all fields with Motor0)
      Motor0ActiveMotor: packet.MotorDetails0.ActiveMotor,
      Motor0BemfD: packet.MotorDetails0.BEMF_D,
      Motor0BemfQ: packet.MotorDetails0.BEMF_Q,
      Motor0BusCurrent: packet.MotorDetails0.BusCurrent,
      Motor0BusVoltage: packet.MotorDetails0.BusVoltage,
      Motor0DcBusAh: packet.MotorDetails0.DC_Bus_Ah,
      Motor0DspBoardTemperature: packet.MotorDetails0.DspBoardTemperature,
      Motor0ErrorFlags: packet.MotorDetails0.ErrorFlags,
      Motor0HeatsinkTemperature: packet.MotorDetails0.HeatsinkTemperature,
      Motor0Id: packet.MotorDetails0.Id,
      Motor0Iq: packet.MotorDetails0.Iq,
      Motor0LimitFlags: packet.MotorDetails0.LimitFlags,
      Motor0MotorTemperature: packet.MotorDetails0.MotorTemperature,
      Motor0MotorVelocity: packet.MotorDetails0.MotorVelocity,
      Motor0Odometer: packet.MotorDetails0.Odometer,
      Motor0PhaseCurrentB: packet.MotorDetails0.PhaseCurrentB,
      Motor0PhaseCurrentC: packet.MotorDetails0.PhaseCurrentC,
      Motor0RxErrorCount: packet.MotorDetails0.RxErrorCount,
      Motor0SerialNumber: packet.MotorDetails0.SerialNumber,
      Motor0SlipSpeed: packet.MotorDetails0.SlipSpeed,
      Motor0Supply15v: packet.MotorDetails0.Supply15V,
      Motor0Supply1v9: packet.MotorDetails0.Supply1V9,
      Motor0Supply3v3: packet.MotorDetails0.Supply3V3,
      Motor0TritiumId: packet.MotorDetails0.TritiumId,
      Motor0TxErrorCount: packet.MotorDetails0.TxErrorCount,
      Motor0Vd: packet.MotorDetails0.Vd,
      Motor0VehicleVelocity: packet.MotorDetails0.VehicleVelocity,
      Motor0Vq: packet.MotorDetails0.Vq,

      // Motor 1 data (prefix all fields with Motor1)
      Motor1ActiveMotor: packet.MotorDetails1.ActiveMotor,
      Motor1BemfD: packet.MotorDetails1.BEMF_D,
      Motor1BemfQ: packet.MotorDetails1.BEMF_Q,
      Motor1BusCurrent: packet.MotorDetails1.BusCurrent,
      Motor1BusVoltage: packet.MotorDetails1.BusVoltage,
      Motor1DcBusAh: packet.MotorDetails1.DC_Bus_Ah,
      Motor1DspBoardTemperature: packet.MotorDetails1.DspBoardTemperature,
      Motor1ErrorFlags: packet.MotorDetails1.ErrorFlags,
      Motor1HeatsinkTemperature: packet.MotorDetails1.HeatsinkTemperature,
      Motor1Id: packet.MotorDetails1.Id,
      Motor1Iq: packet.MotorDetails1.Iq,
      Motor1LimitFlags: packet.MotorDetails1.LimitFlags,
      Motor1MotorTemperature: packet.MotorDetails1.MotorTemperature,
      Motor1MotorVelocity: packet.MotorDetails1.MotorVelocity,
      Motor1Odometer: packet.MotorDetails1.Odometer,
      Motor1PhaseCurrentB: packet.MotorDetails1.PhaseCurrentB,
      Motor1PhaseCurrentC: packet.MotorDetails1.PhaseCurrentC,
      Motor1RxErrorCount: packet.MotorDetails1.RxErrorCount,
      Motor1SerialNumber: packet.MotorDetails1.SerialNumber,
      Motor1SlipSpeed: packet.MotorDetails1.SlipSpeed,
      Motor1Supply15v: packet.MotorDetails1.Supply15V,
      Motor1Supply1v9: packet.MotorDetails1.Supply1V9,
      Motor1Supply3v3: packet.MotorDetails1.Supply3V3,
      Motor1TritiumId: packet.MotorDetails1.TritiumId,
      Motor1TxErrorCount: packet.MotorDetails1.TxErrorCount,
      Motor1Vd: packet.MotorDetails1.Vd,
      Motor1VehicleVelocity: packet.MotorDetails1.VehicleVelocity,
      Motor1Vq: packet.MotorDetails1.Vq,

      // ProximitySensors data
      ...packet.ProximitySensors,

      // Telemetry data (GPS + MPU)
      ...packet.Telemetry,
    };
  }

  public async getDrivers() {
    try {
      const drivers = await this.driverRepo.find();
      return drivers.map((driver) => ({
        Rfid: driver.Rfid,
        driver: driver.Name,
      }));
    } catch (error: unknown) {
      console.error("Error getting drivers");
    }
  }

  public async getDriverNameUsingRfid(Rfid: string) {
    try {
      const driver = await this.driverRepo.findOne({
        where: { Rfid },
      });

      if (!driver) {
        console.error(`No driver found for Rfid: ${Rfid}`);
        return "Driver not found";
      }

      return driver.Name;
    } catch (error: unknown) {
      console.error("Error getting driver name using the given Rfid");
      throw new Error((error as Error).message);
    }
  }

  public async getDriverLaps(Rfid: string) {
    try {
      const laps = await this.lapRepo.find({
        order: { Timestamp: "DESC" },
        where: { Rfid },
      });
      return laps;
    } catch (error: unknown) {
      console.error("Error getting lap data for driver", error);
      throw new Error(
        (error as Error).message || "Failed to fetch driver laps",
      );
    }
  }

  public async updateDriverInfo(Rfid: string, name: string) {
    try {
      if (typeof Rfid !== "string") {
        throw new Error("Rfid must be a string");
      }

      const existingDriver = await this.driverRepo.findOne({
        where: { Rfid },
      });

      if (!existingDriver) {
        return { message: "Driver Rfid not found in driver table" };
      }

      const oldName = existingDriver.Name;
      existingDriver.Name = name;
      await this.driverRepo.save(existingDriver);

      return {
        message: `Driver name updated from ${oldName} to ${name}`,
      };
    } catch (error: unknown) {
      console.error("Error updating driver info: " + (error as Error).message);
      throw new Error((error as Error).message);
    }
  }

  async close(): Promise<void> {
    if (this.isConnected) {
      await AppDataSource.destroy();
      console.log("Database connection closed");
      this.isConnected = false;
    }
  }

  public async getPacketData(timestamp: string) {
    if (!this.isConnected) {
      throw new Error("Database not connected");
    }

    try {
      const packet = await this.telemetryPacketRepo.findOneBy({
        Timestamp: new Date(timestamp),
      });
      return packet;
    } catch (error: unknown) {
      throw new Error(
        "Failed to retrieve packet date: " + (error as Error).message,
      );
    }
  }

  public async scanPacketDataBetweenDates(
    startUTCDate: number,
    endUTCDate: number,
  ) {
    if (!this.isConnected) {
      throw new Error("Database not connected");
    }

    try {
      const packets = await this.telemetryPacketRepo.find({
        where: {
          Timestamp: Between(new Date(startUTCDate), new Date(endUTCDate)),
        },
      });
      return packets;
    } catch (error: unknown) {
      throw new Error(
        "Failed to scan packets between dates: " + (error as Error).message,
      );
    }
  }

  public async insertPacketData(
    packet: ITelemetryData,
  ): Promise<GenericResponse> {
    if (!this.isConnected) {
      throw new Error("Database not connected");
    }
    try {
      const flattenedData = this.flattenTelemetryData(packet);
      await this.telemetryPacketRepo.save(flattenedData);
      return {
        httpStatusCode: 201,
        message: "Packet data inserted successfully",
      };
    } catch (error: unknown) {
      throw new Error(
        "Failed to insert packet data: " + (error as Error).message,
      );
    }
  }

  public async getFirstAndLastPacketDates(): Promise<{
    firstDateUTC: number | null;
    lastDateUTC: number | null;
  }> {
    if (!this.isConnected) {
      throw new Error("Database not connected");
    }

    try {
      const firstPacket = await this.telemetryPacketRepo.findOne({
        order: { Timestamp: "ASC" },
      });

      const lastPacket = await this.telemetryPacketRepo.findOne({
        order: { Timestamp: "DESC" },
      });

      return {
        firstDateUTC: firstPacket
          ? Number(firstPacket.Timestamp.getTime())
          : null,
        lastDateUTC: lastPacket ? Number(lastPacket.Timestamp.getTime()) : null,
      };
    } catch (error: unknown) {
      throw new Error(
        "Failed to retrieve first and last packet dates: " +
          (error as Error).message,
      );
    }
  }

  public async insertLapData(lapData: Partial<Lap>): Promise<GenericResponse> {
    if (!this.isConnected) {
      throw new Error("Database not connected");
    }

    try {
      await this.lapRepo.save(lapData);
      return {
        httpStatusCode: 201,
        message: "Lap data inserted successfully",
      };
    } catch (error: unknown) {
      throw new Error("Failed to insert lap data: " + (error as Error).message);
    }
  }

  public async getLapData(): Promise<Lap[]> {
    if (!this.isConnected) {
      throw new Error("Database not connected");
    }

    try {
      const laps = await this.lapRepo.find();
      return laps;
    } catch (error: unknown) {
      throw new Error(
        "Failed to retrieve lap data: " + (error as Error).message,
      );
    }
  }

  public async insertIntoGpsLapCountTable(
    rfid: string,
    timestamp: number,
  ): Promise<GenericResponse> {
    if (!this.isConnected) {
      throw new Error("Database not connected");
    }

    try {
      await this.lapRepo.save({
        Rfid: rfid ?? "unknown driver",
        Timestamp: timestamp ?? new Date().getTime(),
        Type: "gps-lap",
      });
      return {
        httpStatusCode: 201,
        message: "Inserted into GPS lap count table successfully",
      };
    } catch (error: unknown) {
      throw new Error(
        "Failed to insert into GPS lap count table: " +
          (error as Error).message,
      );
    }
  }
}
