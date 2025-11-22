import { Entity, Column, Index } from "typeorm";
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
  timestamp!: Date;

  @Column({ type: "text", primary: true })
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
