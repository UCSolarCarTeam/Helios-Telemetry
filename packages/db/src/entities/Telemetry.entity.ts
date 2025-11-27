import { Entity, Column, Index, PrimaryColumn } from "typeorm";
import { Hypertable, TimeColumn } from "@timescaledb/typeorm";

/**
 * Telemetry sensor data hypertable (GPS and MPU data)
 * Related to telemetry_metadata via timestamp + rfid
 */
@Entity("telemetry")
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
export class Telemetry {
  @TimeColumn()
  @PrimaryColumn({ type: "timestamptz" })
  timestamp!: Date;

  @PrimaryColumn({ type: "text" })
  rfid!: string;

  // GPS Data
  @Column({ type: "float" })
  gps_additional_flags!: number;

  @Column({ type: "float" })
  gps_day!: number;

  @Column({ type: "float" })
  gps_fix_status_flags!: number;

  @Column({ type: "float" })
  gps_hour!: number;

  @Column({ type: "float" })
  gps_latitude!: number;

  @Column({ type: "float" })
  gps_longitude!: number;

  @Column({ type: "float" })
  gps_minute!: number;

  @Column({ type: "float" })
  gps_month!: number;

  @Column({ type: "float" })
  gps_second!: number;

  @Column({ type: "float" })
  gps_validity_flags!: number;

  @Column({ type: "float" })
  gps_year!: number;

  // MPU (Motion Processing Unit) Data
  @Column({ type: "float" })
  mpu_acceleration_x!: number;

  @Column({ type: "float" })
  mpu_acceleration_y!: number;

  @Column({ type: "float" })
  mpu_acceleration_z!: number;

  @Column({ type: "float" })
  mpu_rotation_x!: number;

  @Column({ type: "float" })
  mpu_rotation_y!: number;

  @Column({ type: "float" })
  mpu_rotation_z!: number;

  @Column({ type: "float" })
  mpu_temperature!: number;
}
