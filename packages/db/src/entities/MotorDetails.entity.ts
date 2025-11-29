import { Entity, Column, Index, PrimaryColumn } from "typeorm";
import { Hypertable, TimeColumn } from "@timescaledb/typeorm";

/**
 * Motor details sensor data hypertable
 * Related to telemetry_metadata via timestamp + rfid
 * Note: We have MotorDetails0 and MotorDetails1, so motor_id will differentiate them
 */
@Entity("motor_details")
@Hypertable({
  timeColumnName: "timestamp",
  chunkTimeInterval: "1 month",
  compression: {
    compress: true,
    compress_segmentby: "rfid, motor_id",
    compress_orderby: "timestamp DESC",
  },
})
@Index(["rfid", "timestamp"])
@Index(["motor_id", "timestamp"])
export class MotorDetails {
  @TimeColumn()
  @PrimaryColumn({ type: "timestamptz" })
  Timestamp!: Date;

  @PrimaryColumn({ type: "text" })
  Rfid!: string;

  @PrimaryColumn({ type: "int" })
  MotorId!: number;

  @Column({ type: "float" })
  ActiveMotor!: number;

  @Column({ type: "float" })
  BemfD!: number;

  @Column({ type: "float" })
  BemfQ!: number;

  @Column({ type: "float" })
  BusCurrent!: number;

  @Column({ type: "float" })
  BusVoltage!: number;

  @Column({ type: "float" })
  DcBusAh!: number;

  @Column({ type: "float" })
  DspBoardTemperature!: number;

  @Column({ type: "float" })
  ErrorFlags!: number;

  @Column({ type: "float" })
  HeatsinkTemperature!: number;

  @Column({ type: "float" })
  Id!: number;

  @Column({ type: "float" })
  Iq!: number;

  @Column({ type: "float" })
  LimitFlags!: number;

  @Column({ type: "float" })
  MotorTemperature!: number;

  @Column({ type: "float" })
  MotorVelocity!: number;

  @Column({ type: "float" })
  Odometer!: number;

  @Column({ type: "float" })
  PhaseCurrentB!: number;

  @Column({ type: "float" })
  PhaseCurrentC!: number;

  @Column({ type: "float" })
  RxErrorCount!: number;

  @Column({ type: "float" })
  SerialNumber!: number;

  @Column({ type: "float" })
  SlipSpeed!: number;

  @Column({ type: "float" })
  Supply15v!: number;

  @Column({ type: "float" })
  Supply1v9!: number;

  @Column({ type: "float" })
  Supply3v3!: number;

  @Column({ type: "float" })
  TritiumId!: number;

  @Column({ type: "float" })
  TxErrorCount!: number;

  @Column({ type: "float" })
  Vd!: number;

  @Column({ type: "float" })
  VehicleVelocity!: number;

  @Column({ type: "float" })
  Vq!: number;
}
