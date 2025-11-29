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
  Timestamp!: Date;

  @PrimaryColumn({ type: "text" })
  Rfid!: string;

  @Column({ type: "float" })
  BusCurrentOut!: number;

  @Column({ type: "float" })
  KeyMotorVelocity!: number;

  @Column({ type: "float" })
  MotorCurrent!: number;
}
