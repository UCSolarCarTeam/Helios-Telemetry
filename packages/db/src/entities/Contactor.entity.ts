import { Entity, Column, Index, PrimaryColumn } from "typeorm";
import { Hypertable, TimeColumn } from "@timescaledb/typeorm";

/**
 * Contactor sensor data hypertable
 * Related to telemetry_metadata via timestamp + rfid
 */
@Entity("contactor")
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
export class Contactor {
  @TimeColumn()
  @PrimaryColumn({ type: "timestamptz" })
  Timestamp!: Date;

  @PrimaryColumn({ type: "text" })
  Rfid!: string;

  // Array Contactor
  @Column({ type: "boolean" })
  ArrayBpsError!: boolean;

  @Column({ type: "float" })
  ArrayChargeCurrent!: number;

  @Column({ type: "boolean" })
  ArrayContactorClosed!: boolean;

  @Column({ type: "boolean" })
  ArrayContactorClosing!: boolean;

  @Column({ type: "boolean" })
  ArrayContactorError!: boolean;

  @Column({ type: "boolean" })
  ArrayHeartbeat!: boolean;

  @Column({ type: "float" })
  ArrayLineCurrent!: number;

  @Column({ type: "boolean" })
  ArrayPrechargerClosed!: boolean;

  @Column({ type: "boolean" })
  ArrayPrechargerClosing!: boolean;

  @Column({ type: "boolean" })
  ArrayPrechargerError!: boolean;

  // Charge Contactor
  @Column({ type: "boolean" })
  ChargeBpsError!: boolean;

  @Column({ type: "float" })
  ChargeChargeCurrent!: number;

  @Column({ type: "boolean" })
  ChargeContactorClosed!: boolean;

  @Column({ type: "boolean" })
  ChargeContactorClosing!: boolean;

  @Column({ type: "boolean" })
  ChargeContactorError!: boolean;

  @Column({ type: "boolean" })
  ChargeHeartbeat!: boolean;

  @Column({ type: "float" })
  ChargeLineCurrent!: number;

  @Column({ type: "boolean" })
  ChargePrechargerClosed!: boolean;

  @Column({ type: "boolean" })
  ChargePrechargerClosing!: boolean;

  @Column({ type: "boolean" })
  ChargePrechargerError!: boolean;

  // Common Contactor
  @Column({ type: "float" })
  CommonChargeCurrent!: number;

  @Column({ type: "boolean" })
  CommonContactorClosed!: boolean;

  @Column({ type: "boolean" })
  CommonContactorClosing!: boolean;

  @Column({ type: "boolean" })
  CommonContactorError!: boolean;

  @Column({ type: "boolean" })
  CommonContactorOpeningError!: boolean;

  @Column({ type: "boolean" })
  CommonHeartbeat!: boolean;

  @Column({ type: "float" })
  CommonLineCurrent!: number;

  @Column({ type: "boolean" })
  CommonPrechargerClosed!: boolean;

  @Column({ type: "boolean" })
  CommonPrechargerClosing!: boolean;

  @Column({ type: "boolean" })
  CommonPrechargerError!: boolean;

  // LV Contactor
  @Column({ type: "boolean" })
  LvBpsError!: boolean;

  @Column({ type: "float" })
  LvChargeCurrent!: number;

  @Column({ type: "boolean" })
  LvContactorClosed!: boolean;

  @Column({ type: "boolean" })
  LvContactorClosing!: boolean;

  @Column({ type: "boolean" })
  LvContactorError!: boolean;

  @Column({ type: "boolean" })
  LvHeartbeat!: boolean;

  @Column({ type: "float" })
  LvLineCurrent!: number;

  @Column({ type: "boolean" })
  LvPrechargerClosed!: boolean;

  @Column({ type: "boolean" })
  LvPrechargerClosing!: boolean;

  @Column({ type: "boolean" })
  LvPrechargerError!: boolean;

  // Motor Contactor
  @Column({ type: "boolean" })
  MotorBpsError!: boolean;

  @Column({ type: "float" })
  MotorChargeCurrent!: number;

  @Column({ type: "boolean" })
  MotorContactorClosed!: boolean;

  @Column({ type: "boolean" })
  MotorContactorClosing!: boolean;

  @Column({ type: "boolean" })
  MotorContactorError!: boolean;

  @Column({ type: "boolean" })
  MotorHeartbeat!: boolean;

  @Column({ type: "float" })
  MotorLineCurrent!: number;

  @Column({ type: "boolean" })
  MotorPrechargerClosed!: boolean;

  @Column({ type: "boolean" })
  MotorPrechargerClosing!: boolean;

  @Column({ type: "boolean" })
  MotorPrechargerError!: boolean;
}
