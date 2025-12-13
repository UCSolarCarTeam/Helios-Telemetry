import { Entity, Column, Index, PrimaryColumn } from "typeorm";
import { Hypertable, TimeColumn } from "@timescaledb/typeorm";

/**
 * KeyMotor sensor data hypertable
 * Related to telemetry_metadata via timestamp + rfid
 */
@Entity("key_motor")
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
export class KeyMotor {
  @TimeColumn()
  @PrimaryColumn({ type: "timestamptz" })
  timestamp!: Date;

  @PrimaryColumn({ type: "text" })
  rfid!: string;

  @Column({ type: "float" })
  bus_current_out!: number;

  @Column({ type: "float" })
  key_motor_velocity!: number;

  @Column({ type: "float" })
  motor_current!: number;
}
