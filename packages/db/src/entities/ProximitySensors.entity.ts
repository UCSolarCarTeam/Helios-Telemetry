import { Entity, Column, Index, PrimaryColumn } from "typeorm";
import { Hypertable, TimeColumn } from "@timescaledb/typeorm";

/**
 * Proximity Sensors data hypertable
 * Related to telemetry_metadata via timestamp + rfid
 */
@Entity("proximity_sensors")
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
export class ProximitySensors {
  @TimeColumn()
  @PrimaryColumn({ type: "timestamptz" })
  Timestamp!: Date;

  @PrimaryColumn({ type: "text" })
  Rfid!: string;

  @Column({ type: "float" })
  ProximitySensor1!: number;

  @Column({ type: "float" })
  ProximitySensor2!: number;

  @Column({ type: "float" })
  RroximitySensor3!: number;

  @Column({ type: "float" })
  ProximitySensor4!: number;
}
