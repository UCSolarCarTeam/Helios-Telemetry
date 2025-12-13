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
  timestamp!: Date;

  @PrimaryColumn({ type: "text" })
  rfid!: string;

  @Column({ type: "float" })
  mppt0_ch0_array_current!: number;

  @Column({ type: "float" })
  mppt0_ch0_array_voltage!: number;

  @Column({ type: "float" })
  mppt0_ch0_battery_voltage!: number;

  @Column({ type: "float" })
  mppt0_ch0_unit_temperature!: number;

  @Column({ type: "float" })
  mppt0_ch1_array_current!: number;

  @Column({ type: "float" })
  mppt0_ch1_array_voltage!: number;

  @Column({ type: "float" })
  mppt0_ch1_battery_voltage!: number;

  @Column({ type: "float" })
  mppt0_ch1_unit_temperature!: number;

  @Column({ type: "float" })
  mppt1_ch0_array_current!: number;

  @Column({ type: "float" })
  mppt1_ch0_array_voltage!: number;

  @Column({ type: "float" })
  mppt1_ch0_battery_voltage!: number;

  @Column({ type: "float" })
  mppt1_ch0_unit_temperature!: number;

  @Column({ type: "float" })
  mppt1_ch1_array_current!: number;

  @Column({ type: "float" })
  mppt1_ch1_array_voltage!: number;

  @Column({ type: "float" })
  mppt1_ch1_battery_voltage!: number;

  @Column({ type: "float" })
  mppt1_ch1_unit_temperature!: number;

  @Column({ type: "float" })
  mppt2_ch0_array_current!: number;

  @Column({ type: "float" })
  mppt2_ch0_array_voltage!: number;

  @Column({ type: "float" })
  mppt2_ch0_battery_voltage!: number;

  @Column({ type: "float" })
  mppt2_ch0_unit_temperature!: number;

  // MPPT 2 Channel 1
  @Column({ type: "float" })
  mppt2_ch1_array_current!: number;

  @Column({ type: "float" })
  mppt2_ch1_array_voltage!: number;

  @Column({ type: "float" })
  mppt2_ch1_battery_voltage!: number;

  @Column({ type: "float" })
  mppt2_ch1_unit_temperature!: number;

  // MPPT 3 Channel 0
  @Column({ type: "float" })
  mppt3_ch0_array_current!: number;

  @Column({ type: "float" })
  mppt3_ch0_array_voltage!: number;

  @Column({ type: "float" })
  mppt3_ch0_battery_voltage!: number;

  @Column({ type: "float" })
  mppt3_ch0_unit_temperature!: number;

  // MPPT 3 Channel 1
  @Column({ type: "float" })
  mppt3_ch1_array_current!: number;

  @Column({ type: "float" })
  mppt3_ch1_array_voltage!: number;

  @Column({ type: "float" })
  mppt3_ch1_battery_voltage!: number;

  @Column({ type: "float" })
  mppt3_ch1_unit_temperature!: number;
}
