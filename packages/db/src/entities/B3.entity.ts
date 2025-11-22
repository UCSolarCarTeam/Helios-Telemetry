import { Entity, Column, Index } from "typeorm";
import { Hypertable, TimeColumn } from "@timescaledb/typeorm";

/**
 * B3 (Button Board 3) sensor data hypertable
 * Related to telemetry_metadata via timestamp + rfid
 */
@Entity("b3")
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
export class B3 {
  @TimeColumn()
  timestamp!: Date;

  @Column({ type: "text", primary: true })
  rfid!: string;

  @Column({ type: "float" })
  acceleration!: number;

  @Column({ type: "boolean" })
  b3_heartbeat!: boolean;

  @Column({ type: "boolean" })
  brake_light_signal_status!: boolean;

  @Column({ type: "boolean" })
  brake_switch_digital!: boolean;

  @Column({ type: "boolean" })
  daytime_running_light_signal_status!: boolean;

  @Column({ type: "boolean" })
  forward_digital!: boolean;

  @Column({ type: "boolean" })
  handbrake_switch_digital!: boolean;

  @Column({ type: "boolean" })
  hazard_lights_input!: boolean;

  @Column({ type: "boolean" })
  headlights_switch_input!: boolean;

  @Column({ type: "boolean" })
  headlight_signal_status!: boolean;

  @Column({ type: "boolean" })
  horn_signal_status!: boolean;

  @Column({ type: "boolean" })
  horn_switch_digital!: boolean;

  @Column({ type: "boolean" })
  lap_digital!: boolean;

  @Column({ type: "boolean" })
  left_signal_input!: boolean;

  @Column({ type: "boolean" })
  left_signal_status!: boolean;

  @Column({ type: "boolean" })
  motor_reset_digital!: boolean;

  @Column({ type: "boolean" })
  neutral_digital!: boolean;

  @Column({ type: "boolean" })
  race_mode_digital!: boolean;

  @Column({ type: "float" })
  regen_braking!: number;

  @Column({ type: "boolean" })
  reverse_digital!: boolean;

  @Column({ type: "boolean" })
  right_signal_input!: boolean;

  @Column({ type: "boolean" })
  right_signal_status!: boolean;
}
