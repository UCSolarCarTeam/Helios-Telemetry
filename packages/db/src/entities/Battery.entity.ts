import { Entity, Column, Index, PrimaryColumn } from "typeorm";
import { Hypertable, TimeColumn } from "@timescaledb/typeorm";

/**
 * Battery sensor data hypertable
 * Related to telemetry_metadata via timestamp + rfid
 */
@Entity("battery")
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
export class Battery {
  @TimeColumn()
  @PrimaryColumn({ type: "timestamptz" })
  timestamp!: Date;

  @PrimaryColumn({ type: "text" })
  rfid!: string;

  @Column({ type: "boolean" })
  always_on_signal_status!: boolean;

  @Column({ type: "float" })
  average_cell_voltage!: number;

  @Column({ type: "float" })
  average_temperature!: number;

  @Column({ type: "integer" })
  bmu_alive!: number;

  @Column({ type: "boolean" })
  charge_relay_enabled!: boolean;

  @Column({ type: "boolean" })
  charger_safety_enabled!: boolean;

  @Column({ type: "boolean" })
  discharge_relay_enabled!: boolean;

  @Column({ type: "float" })
  fan_speed!: number;

  @Column({ type: "float" })
  fan_voltage!: number;

  @Column({ type: "float" })
  high_cell_voltage!: number;

  @Column({ type: "integer" })
  high_cell_voltage_id!: number;

  @Column({ type: "float" })
  high_temperature!: number;

  @Column({ type: "integer" })
  high_thermistor_id!: number;

  @Column({ type: "float" })
  input_12v!: number;

  @Column({ type: "float" })
  internal_temperature!: number;

  @Column({ type: "boolean" })
  is_charging_signal_status!: boolean;

  @Column({ type: "boolean" })
  is_ready_signal_status!: boolean;

  @Column({ type: "float" })
  low_cell_voltage!: number;

  @Column({ type: "integer" })
  low_cell_voltage_id!: number;

  @Column({ type: "float" })
  low_temperature!: number;

  @Column({ type: "integer" })
  low_thermistor_id!: number;

  @Column({ type: "boolean" })
  malfunction_indicator_active!: boolean;

  @Column({ type: "float" })
  maximum_cell_voltage!: number;

  @Column({ type: "float" })
  maximum_pack_voltage!: number;

  @Column({ type: "float" })
  minimum_cell_voltage!: number;

  @Column({ type: "float" })
  minimum_pack_voltage!: number;

  @Column({ type: "boolean" })
  multi_purpose_input_signal_status!: boolean;

  @Column({ type: "float" })
  pack_amphours!: number;

  @Column({ type: "float" })
  pack_current!: number;

  @Column({ type: "float" })
  pack_depth_of_discharge!: number;

  @Column({ type: "float" })
  pack_state_of_charge!: number;

  @Column({ type: "float" })
  pack_voltage!: number;

  @Column({ type: "integer" })
  populated_cells!: number;

  @Column({ type: "float" })
  requested_fan_speed!: number;
}
