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
  timestamp!: Date;

  @PrimaryColumn({ type: "text" })
  rfid!: string;

  @Column({ type: "float" })
  proximity_sensor_1!: number;

  @Column({ type: "float" })
  proximity_sensor_2!: number;

  @Column({ type: "float" })
  proximity_sensor_3!: number;

  @Column({ type: "float" })
  proximity_sensor_4!: number;
}
