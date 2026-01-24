import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { ITelemetryData } from "@shared/helios-types";
import { TelemetryPacket } from "../entities/TelemetryPacket.entity";

export class DatabaseService {
  private isConnected = false;
  private static instance: DatabaseService;
  private telemetryPacketRepo: Repository<TelemetryPacket>;

  constructor() {
    this.telemetryPacketRepo = AppDataSource.getRepository(TelemetryPacket);
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

  /**
   * Helper function to flatten ITelemetryData into TelemetryPacket format
   */
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

  async insertPacketData(message: ITelemetryData): Promise<void> {
    if (this.isConnected) {
      console.log("Inserting packet data into database");
      const flattenedData = this.flattenTelemetryData(message);
      await this.telemetryPacketRepo.save(flattenedData);
    }
  }

  async close(): Promise<void> {
    if (this.isConnected) {
      await AppDataSource.destroy();
      console.log("Database connection closed");
    }
  }
}
