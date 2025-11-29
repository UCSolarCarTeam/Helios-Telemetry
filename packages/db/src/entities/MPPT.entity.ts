import { Entity, Column, Index, PrimaryColumn } from "typeorm";
import { Hypertable, TimeColumn } from "@timescaledb/typeorm";

/**
 * MPPT (Maximum Power Point Tracker) sensor data hypertable
 * Related to telemetry_metadata via timestamp + rfid
 */
@Entity("mppt")
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
export class MPPT {
  @TimeColumn()
  @PrimaryColumn({ type: "timestamptz" })
  Timestamp!: Date;

  @PrimaryColumn({ type: "text" })
  Rfid!: string;

  @Column({ type: "float" })
  Mppt0Ch0ArrayCurrent!: number;

  @Column({ type: "float" })
  Mppt0Ch0ArrayVoltage!: number;

  @Column({ type: "float" })
  Mppt0Ch0BatteryVoltage!: number;

  @Column({ type: "float" })
  Mppt0Ch0UnitTemperature!: number;

  @Column({ type: "float" })
  Mppt0Ch1ArrayCurrent!: number;

  @Column({ type: "float" })
  Mppt0Ch1ArrayVoltage!: number;

  @Column({ type: "float" })
  Mppt0Ch1BatteryVoltage!: number;

  @Column({ type: "float" })
  Mppt0Ch1UnitTemperature!: number;

  @Column({ type: "float" })
  Mppt1Ch0ArrayCurrent!: number;

  @Column({ type: "float" })
  Mppt1Ch0ArrayVoltage!: number;

  @Column({ type: "float" })
  Mppt1Ch0BatteryVoltage!: number;

  @Column({ type: "float" })
  Mppt1Ch0UnitTemperature!: number;

  @Column({ type: "float" })
  Mppt1Ch1ArrayCurrent!: number;

  @Column({ type: "float" })
  Mppt1Ch1ArrayVoltage!: number;

  @Column({ type: "float" })
  Mppt1Ch1BatteryVoltage!: number;

  @Column({ type: "float" })
  Mppt1Ch1UnitTemperature!: number;

  @Column({ type: "float" })
  Mppt2Ch0ArrayCurrent!: number;

  @Column({ type: "float" })
  Mppt2Ch0ArrayVoltage!: number;

  @Column({ type: "float" })
  Mppt2Ch0BatteryVoltage!: number;

  @Column({ type: "float" })
  Mppt2Ch0UnitTemperature!: number;

  // MPPT 2 Channel 1
  @Column({ type: "float" })
  Mppt2Ch1ArrayCurrent!: number;

  @Column({ type: "float" })
  Mppt2Ch1ArrayVoltage!: number;

  @Column({ type: "float" })
  Mppt2Ch1BatteryVoltage!: number;

  @Column({ type: "float" })
  Mppt2Ch1UnitTemperature!: number;

  // MPPT 3 Channel 0
  @Column({ type: "float" })
  Mppt3Ch0ArrayCurrent!: number;

  @Column({ type: "float" })
  Mppt3Ch0ArrayVoltage!: number;

  @Column({ type: "float" })
  Mppt3Ch0BatteryVoltage!: number;

  @Column({ type: "float" })
  Mppt3Ch0UnitTemperature!: number;

  // MPPT 3 Channel 1
  @Column({ type: "float" })
  Mppt3Ch1ArrayCurrent!: number;

  @Column({ type: "float" })
  Mppt3Ch1ArrayVoltage!: number;

  @Column({ type: "float" })
  Mppt3Ch1BatteryVoltage!: number;

  @Column({ type: "float" })
  Mppt3Ch1UnitTemperature!: number;
}
