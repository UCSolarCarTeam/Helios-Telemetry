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
  Timestamp!: Date;

  @PrimaryColumn({ type: "text" })
  Rfid!: string;

  @Column({ type: "text", nullable: true })
  RaceName?: string;

  @Column({ type: "text", nullable: true })
  Title?: string;
}
