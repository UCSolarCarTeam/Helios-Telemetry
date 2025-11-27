import { Entity, Column, Index, PrimaryColumn } from "typeorm";
import { Hypertable, TimeColumn } from "@timescaledb/typeorm";

/**
 * Contactor sensor data hypertable
 * Related to telemetry_metadata via timestamp + rfid
 */
@Entity("contactor")
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
export class Contactor {
  @TimeColumn()
  @PrimaryColumn({ type: "timestamptz" })
  timestamp!: Date;

  @PrimaryColumn({ type: "text" })
  rfid!: string;

  // Array Contactor
  @Column({ type: "boolean" })
  array_bps_error!: boolean;

  @Column({ type: "float" })
  array_charge_current!: number;

  @Column({ type: "boolean" })
  array_contactor_closed!: boolean;

  @Column({ type: "boolean" })
  array_contactor_closing!: boolean;

  @Column({ type: "boolean" })
  array_contactor_error!: boolean;

  @Column({ type: "boolean" })
  array_heartbeat!: boolean;

  @Column({ type: "float" })
  array_line_current!: number;

  @Column({ type: "boolean" })
  array_precharger_closed!: boolean;

  @Column({ type: "boolean" })
  array_precharger_closing!: boolean;

  @Column({ type: "boolean" })
  array_precharger_error!: boolean;

  // Charge Contactor
  @Column({ type: "boolean" })
  charge_bps_error!: boolean;

  @Column({ type: "float" })
  charge_charge_current!: number;

  @Column({ type: "boolean" })
  charge_contactor_closed!: boolean;

  @Column({ type: "boolean" })
  charge_contactor_closing!: boolean;

  @Column({ type: "boolean" })
  charge_contactor_error!: boolean;

  @Column({ type: "boolean" })
  charge_heartbeat!: boolean;

  @Column({ type: "float" })
  charge_line_current!: number;

  @Column({ type: "boolean" })
  charge_precharger_closed!: boolean;

  @Column({ type: "boolean" })
  charge_precharger_closing!: boolean;

  @Column({ type: "boolean" })
  charge_precharger_error!: boolean;

  // Common Contactor
  @Column({ type: "float" })
  common_charge_current!: number;

  @Column({ type: "boolean" })
  common_contactor_closed!: boolean;

  @Column({ type: "boolean" })
  common_contactor_closing!: boolean;

  @Column({ type: "boolean" })
  common_contactor_error!: boolean;

  @Column({ type: "boolean" })
  common_contactor_opening_error!: boolean;

  @Column({ type: "boolean" })
  common_heartbeat!: boolean;

  @Column({ type: "float" })
  common_line_current!: number;

  @Column({ type: "boolean" })
  common_precharger_closed!: boolean;

  @Column({ type: "boolean" })
  common_precharger_closing!: boolean;

  @Column({ type: "boolean" })
  common_precharger_error!: boolean;

  // LV Contactor
  @Column({ type: "boolean" })
  lv_bps_error!: boolean;

  @Column({ type: "float" })
  lv_charge_current!: number;

  @Column({ type: "boolean" })
  lv_contactor_closed!: boolean;

  @Column({ type: "boolean" })
  lv_contactor_closing!: boolean;

  @Column({ type: "boolean" })
  lv_contactor_error!: boolean;

  @Column({ type: "boolean" })
  lv_heartbeat!: boolean;

  @Column({ type: "float" })
  lv_line_current!: number;

  @Column({ type: "boolean" })
  lv_precharger_closed!: boolean;

  @Column({ type: "boolean" })
  lv_precharger_closing!: boolean;

  @Column({ type: "boolean" })
  lv_precharger_error!: boolean;

  // Motor Contactor
  @Column({ type: "boolean" })
  motor_bps_error!: boolean;

  @Column({ type: "float" })
  motor_charge_current!: number;

  @Column({ type: "boolean" })
  motor_contactor_closed!: boolean;

  @Column({ type: "boolean" })
  motor_contactor_closing!: boolean;

  @Column({ type: "boolean" })
  motor_contactor_error!: boolean;

  @Column({ type: "boolean" })
  motor_heartbeat!: boolean;

  @Column({ type: "float" })
  motor_line_current!: number;

  @Column({ type: "boolean" })
  motor_precharger_closed!: boolean;

  @Column({ type: "boolean" })
  motor_precharger_closing!: boolean;

  @Column({ type: "boolean" })
  motor_precharger_error!: boolean;
}
