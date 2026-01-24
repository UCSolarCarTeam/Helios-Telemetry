import { Entity, Column, Index, PrimaryColumn } from "typeorm";
import { Hypertable, TimeColumn } from "@timescaledb/typeorm";

/**
 * B3 (Button Board 3) sensor data hypertable
 * Related to telemetry_metadata via timestamp + rfid
 */
@Entity("b3")
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
export class B3 {
  @TimeColumn()
  @PrimaryColumn({ type: "timestamptz" })
  Timestamp!: Date;

  @PrimaryColumn({ type: "text" })
  Rfid!: string;

  @Column({ type: "float" })
  Acceleration!: number;

  @Column({ type: "boolean" })
  B3Heartbeat!: boolean;

  @Column({ type: "boolean" })
  BrakeLightSignalStatus!: boolean;

  @Column({ type: "boolean" })
  BrakeSwitchDigital!: boolean;

  @Column({ type: "boolean" })
  DaytimeRunningLightSignalStatus!: boolean;

  @Column({ type: "boolean" })
  ForwardDigital!: boolean;

  @Column({ type: "boolean" })
  HandbrakeSwitchDigital!: boolean;

  @Column({ type: "boolean" })
  HazardLightsInput!: boolean;

  @Column({ type: "boolean" })
  HeadlightsSwitchInput!: boolean;

  @Column({ type: "boolean" })
  HeadlightSignalStatus!: boolean;

  @Column({ type: "boolean" })
  HornSignalStatus!: boolean;

  @Column({ type: "boolean" })
  HornSwitchDigital!: boolean;

  @Column({ type: "boolean" })
  LapDigital!: boolean;

  @Column({ type: "boolean" })
  LeftSignalInput!: boolean;

  @Column({ type: "boolean" })
  LeftSignalStatus!: boolean;

  @Column({ type: "boolean" })
  MotorResetDigital!: boolean;

  @Column({ type: "boolean" })
  NeutralDigital!: boolean;

  @Column({ type: "boolean" })
  RaceModeDigital!: boolean;

  @Column({ type: "float" })
  RegenBraking!: number;

  @Column({ type: "boolean" })
  ReverseDigital!: boolean;

  @Column({ type: "boolean" })
  RightSignalInput!: boolean;

  @Column({ type: "boolean" })
  RightSignalStatus!: boolean;
}
