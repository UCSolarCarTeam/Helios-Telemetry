import { Entity, Column, Index, PrimaryColumn } from "typeorm";
import { Hypertable, TimeColumn } from "@timescaledb/typeorm";

/**
 * Metadata table for all telemetry packets
 * This is the main reference table that links to all sensor-specific hypertables
 * via timestamp and RFID
 */
@Entity("telemetry_metadata")
@Hypertable({
  timeColumnName: "timestamp",
  chunkTimeInterval: "1 month", // Adjust based on race frequency
  compression: {
    compress: true,
    compress_segmentby: "rfid, race_name",
    compress_orderby: "timestamp DESC",
  },
})
@Index(["rfid", "timestamp"])
@Index(["race_name", "timestamp"])
export class TelemetryMetadata {
  @TimeColumn()
  @PrimaryColumn({ type: "timestamptz" })
  timestamp!: Date;

  @PrimaryColumn({ type: "text" })
  rfid!: string;

  @Column({ type: "text", nullable: true })
  race_name?: string;

  @Column({ type: "text", nullable: true })
  title?: string;
}
