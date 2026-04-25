import {
  ILapData,
  ITelemetryData,
} from "@shared/helios-types";
import { Prisma } from "@prisma/client";
import { prisma } from "../data-source";
import { GenericResponse } from "./DatabaseService.types";

export class DatabaseService {
  private isConnected = false;
  private static instance: DatabaseService;

  async initialize() {
    if (!this.isConnected) {
      await prisma.$connect();
      this.isConnected = true;
    }
  }

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  public async getDrivers() {
    this.assertConnected();

    const drivers = await prisma.driver.findMany({
      select: { rfid: true, Name: true },
    });

    return drivers.map((driver) => ({
      driver: driver.Name,
      rfid: driver.rfid,
    }));
  }

  public async getDriverNameUsingRfid(Rfid: string) {
    this.assertConnected();

    const row = await prisma.driver.findUnique({
      where: { rfid: Rfid },
      select: { Name: true },
    });

    if (!row) {
      return "Driver not found";
    }

    return row.Name;
  }

  public async getDriverLaps(Rfid: string) {
    this.assertConnected();

    return prisma.lap.findMany({
      where: { rfid: Rfid },
      orderBy: { timestamp: "desc" },
    });
  }

  public async updateDriverInfo(Rfid: string, name: string) {
    this.assertConnected();

    if (typeof Rfid !== "string") {
      throw new Error("Rfid must be a string");
    }

    const existing = await prisma.driver.findUnique({
      where: { rfid: Rfid },
      select: { Name: true },
    });

    if (!existing) {
      return { message: "Driver Rfid not found in driver table" };
    }

    const oldName = existing.Name;
    await prisma.driver.update({
      where: { rfid: Rfid },
      data: { Name: name },
    });

    return {
      message: `Driver name updated from ${oldName} to ${name}`,
    };
  }

  async close(): Promise<void> {
    if (this.isConnected) {
      await prisma.$disconnect();
      this.isConnected = false;
    }
  }

  public async getPacketData(timestamp: string) {
    this.assertConnected();

    return prisma.telemetry_packet.findFirst({
      where: { timestamp: new Date(timestamp) },
    });
  }

  public async scanPacketDataBetweenDates(
    startUTCDate: number,
    endUTCDate: number,
  ) {
    this.assertConnected();

    return prisma.telemetry_packet.findMany({
      where: {
        timestamp: {
          gte: new Date(startUTCDate),
          lte: new Date(endUTCDate),
        },
      },
      orderBy: { timestamp: "asc" },
    });
  }

  /**
   * Inserts a telemetry row, or updates non-key columns if `(timestamp, rfid)` already exists.
   * That upsert behavior matches the previous SQL `ON CONFLICT … DO UPDATE` and helps when the
   * same logical packet is published more than once (MQTT redelivery, reconnects) without
   * failing on the composite primary key. If you need strict “insert only, error on duplicate”
   * instead, switch this to `create` and handle Prisma P2002.
   */
  public async upsertPacketData(
    packet: ITelemetryData,
  ): Promise<GenericResponse> {
    this.assertConnected();

    const flattenedData = flattenTelemetryData(packet);
    const entries = Object.entries(flattenedData).filter(
      ([, value]) => value !== undefined,
    );

    if (entries.length === 0) {
      return {
        httpStatusCode: 400,
        message: "No telemetry data to insert",
      };
    }

    const row = Object.fromEntries(
      entries,
    ) as Prisma.telemetry_packetUncheckedCreateInput;

    if (row.timestamp === undefined || row.rfid === undefined) {
      return {
        httpStatusCode: 400,
        message: "Missing timestamp or rfid in telemetry payload",
      };
    }

    const { timestamp, rfid, ...updateFields } = row;
    const hasFieldsToPatch = Object.keys(updateFields).length > 0;

    if (hasFieldsToPatch) {
      await prisma.telemetry_packet.upsert({
        where: { timestamp_rfid: { timestamp, rfid } },
        create: row,
        update: updateFields as Prisma.telemetry_packetUncheckedUpdateInput,
      });
    } else {
      // Same as ON CONFLICT DO NOTHING when the row is only the composite key: skip update path.
      await prisma.telemetry_packet.create({ data: row }).catch((error: unknown) => {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2002"
        ) {
          return;
        }
        throw error;
      });
    }

    return {
      httpStatusCode: 201,
      message: "Packet data inserted successfully",
    };
  }

  public async getFirstAndLastPacketDates(): Promise<{
    firstDateUTC: number | null;
    lastDateUTC: number | null;
  }> {
    this.assertConnected();

    const [first, last] = await prisma.$transaction([
      prisma.telemetry_packet.findFirst({
        orderBy: { timestamp: "asc" },
        select: { timestamp: true },
      }),
      prisma.telemetry_packet.findFirst({
        orderBy: { timestamp: "desc" },
        select: { timestamp: true },
      }),
    ]);

    return {
      firstDateUTC: first?.timestamp ? first.timestamp.getTime() : null,
      lastDateUTC: last?.timestamp ? last.timestamp.getTime() : null,
    };
  }

  public async insertLapData(lapData: ILapData): Promise<GenericResponse> {
    this.assertConnected();

    await prisma.lap.create({data: lapData});

    return {
      httpStatusCode: 201,
      message: "Lap data inserted successfully",
    };
  }

  public async getLapData() {
    this.assertConnected();

    return prisma.lap.findMany({
      orderBy: { timestamp: "desc" },
    });
  }

  private assertConnected() {
    if (!this.isConnected) {
      throw new Error("Database not connected");
    }
  }
}

// TODO: Check every once in a while if Rfid and Timestamp can be made back into Uppercase
export function flattenTelemetryData(
  packet: ITelemetryData,
): Record<string, unknown> {
  const timestamp = new Date(packet.TimeStamp * 1000);
  const Rfid = packet.Pi.Rfid;

  return {
    RaceName: packet.Title,
    rfid: Rfid,
    timestamp,
    Title: packet.Title,
    ...packet.B3,
    ...packet.Battery,
    ...packet.BatteryFaults.Errors,
    ...packet.BatteryFaults.Warnings,
    ...packet.Contactor,
    ...packet.KeyMotor,
    ...packet.MBMS,
    ...packet.MPPT,
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
    ...packet.ProximitySensors,
    ...packet.Telemetry,
  };
}
