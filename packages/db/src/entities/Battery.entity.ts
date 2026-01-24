import { Entity, Column, Index, PrimaryColumn } from "typeorm";
import { Hypertable, TimeColumn } from "@timescaledb/typeorm";

/**
 * Battery sensor data hypertable
 * Related to telemetry_metadata via timestamp + rfid
 */
@Entity("battery")
@Hypertable({
  timeColumnName: "timestamp",
  chunkTimeInterval: "1 month",
  compression: {
    compress: true,
    compress_segmentby: "rfid",
    compress_orderby: "timestamp DESC",
  },
})
@Index(["rfid", "timestamp"])
export class Battery {
  @TimeColumn()
  @PrimaryColumn({ type: "timestamptz" })
  Timestamp!: Date;

  @PrimaryColumn({ type: "text" })
  Rfid!: string;

  @Column({ type: "boolean" })
  AlwaysOnSignalStatus!: boolean;

  @Column({ type: "float" })
  AverageCellVoltage!: number;

  @Column({ type: "float" })
  AverageTemperature!: number;

  @Column({ type: "integer" })
  BmuAlive!: number;

  @Column({ type: "boolean" })
  ChargeRelayEnabled!: boolean;

  @Column({ type: "boolean" })
  ChargerSafetyEnabled!: boolean;

  @Column({ type: "boolean" })
  DischargeRelayEnabled!: boolean;

  @Column({ type: "float" })
  FanSpeed!: number;

  @Column({ type: "float" })
  FanVoltage!: number;

  @Column({ type: "float" })
  HighCellVoltage!: number;

  @Column({ type: "integer" })
  HighCellVoltageId!: number;

  @Column({ type: "float" })
  HighTemperature!: number;

  @Column({ type: "integer" })
  HighThermistorId!: number;

  @Column({ type: "float" })
  Input12v!: number;

  @Column({ type: "float" })
  InternalTemperature!: number;

  @Column({ type: "boolean" })
  IsChargingSignalStatus!: boolean;

  @Column({ type: "boolean" })
  IsReadySignalStatus!: boolean;

  @Column({ type: "float" })
  LowCellVoltage!: number;

  @Column({ type: "integer" })
  LowCellVoltageId!: number;

  @Column({ type: "float" })
  LowTemperature!: number;

  @Column({ type: "integer" })
  LowThermistorId!: number;

  @Column({ type: "boolean" })
  MalfunctionIndicatorActive!: boolean;

  @Column({ type: "float" })
  MaximumCellVoltage!: number;

  @Column({ type: "float" })
  MaximumPackVoltage!: number;

  @Column({ type: "float" })
  MinimumCellVoltage!: number;

  @Column({ type: "float" })
  MinimumPackVoltage!: number;

  @Column({ type: "boolean" })
  MultiPurposeInputSignalStatus!: boolean;

  @Column({ type: "float" })
  PackAmphours!: number;

  @Column({ type: "float" })
  PackCurrent!: number;

  @Column({ type: "float" })
  PackDepthOfDischarge!: number;

  @Column({ type: "float" })
  PackStateOfCharge!: number;

  @Column({ type: "float" })
  PackVoltage!: number;

  @Column({ type: "integer" })
  PopulatedCells!: number;

  @Column({ type: "float" })
  RequestedFanSpeed!: number;
}
