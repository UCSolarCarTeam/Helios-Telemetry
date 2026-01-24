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
  Timestamp!: Date;

  @PrimaryColumn({ type: "text" })
  Rfid!: string;

  // GPS Data
  @Column({ type: "float" })
  GpsAdditionalFlags!: number;

  @Column({ type: "float" })
  GpsDay!: number;

  @Column({ type: "float" })
  GpsFixStatusFlags!: number;

  @Column({ type: "float" })
  GpsHour!: number;

  @Column({ type: "float" })
  GpsLatitude!: number;

  @Column({ type: "float" })
  GpsLongitude!: number;

  @Column({ type: "float" })
  GpsMinute!: number;

  @Column({ type: "float" })
  GpsMonth!: number;

  @Column({ type: "float" })
  GpsSecond!: number;

  @Column({ type: "float" })
  GpsValidityFlags!: number;

  @Column({ type: "float" })
  GpsYear!: number;

  // MPU (Motion Processing Unit) Data
  @Column({ type: "float" })
  MpuAccelerationX!: number;

  @Column({ type: "float" })
  MpuAccelerationY!: number;

  @Column({ type: "float" })
  MpuAccelerationZ!: number;

  @Column({ type: "float" })
  MpuRotationX!: number;

  @Column({ type: "float" })
  MpuRotationY!: number;

  @Column({ type: "float" })
  MpuRotationZ!: number;

  @Column({ type: "float" })
  MpuTemperature!: number;
}
