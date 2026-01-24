import { Entity, Column, Index, PrimaryGeneratedColumn } from "typeorm";
import { TimeColumn } from "@timescaledb/typeorm";

/**
 * Lap data hypertable
 * Stores computed lap metrics for each lap
 */
@Entity("lap")
@Index(["Rfid", "Timestamp"])
export class Lap {
  @PrimaryGeneratedColumn("uuid")
  Id!: string;

  @TimeColumn()
  Timestamp!: Date;

  @Column({ type: "text" })
  Rfid!: string;

  @Column({ type: "float" })
  LapTime!: number;

  @Column({ type: "float" })
  TotalPowerIn!: number;

  @Column({ type: "float" })
  TotalPowerOut!: number;

  @Column({ type: "float" })
  NetPowerOut!: number;

  @Column({ type: "float" })
  Distance!: number;

  @Column({ type: "float" })
  EnergyConsumed!: number;

  @Column({ type: "float" })
  AmpHours!: number;

  @Column({ type: "float" })
  AveragePackCurrent!: number;

  @Column({ type: "float" })
  BatterySecondsRemaining!: number;

  @Column({ type: "float" })
  AverageSpeed!: number;
}
