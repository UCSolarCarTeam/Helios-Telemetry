import { Entity, Column, Index, PrimaryGeneratedColumn } from "typeorm";
import { Hypertable, TimeColumn } from "@timescaledb/typeorm";

/**
 * Lap data hypertable
 * Stores computed lap metrics for each lap
 */
@Entity("lap")
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
export class Lap {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @TimeColumn()
  timestamp!: Date;

  @Column({ type: "text" })
  rfid!: string;

  @Column({ type: "float" })
  lap_time!: number;

  @Column({ type: "float" })
  total_power_in!: number;

  @Column({ type: "float" })
  total_power_out!: number;

  @Column({ type: "float" })
  net_power_out!: number;

  @Column({ type: "float" })
  distance!: number;

  @Column({ type: "float" })
  energy_consumed!: number;

  @Column({ type: "float" })
  amp_hours!: number;

  @Column({ type: "float" })
  average_pack_current!: number;

  @Column({ type: "float" })
  battery_seconds_remaining!: number;

  @Column({ type: "float" })
  average_speed!: number;
}
