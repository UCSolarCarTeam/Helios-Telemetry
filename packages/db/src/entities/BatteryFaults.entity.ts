import { Entity, Column, Index, PrimaryColumn } from "typeorm";
import { Hypertable, TimeColumn } from "@timescaledb/typeorm";

/**
 * Battery Faults data hypertable (Errors and Warnings)
 * Related to telemetry_metadata via timestamp + rfid
 */
@Entity("battery_faults")
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
export class BatteryFaults {
  @TimeColumn()
  @PrimaryColumn({ type: "timestamptz" })
  timestamp!: Date;

  @PrimaryColumn({ type: "text" })
  rfid!: string;

  // Errors
  @Column({ type: "boolean" })
  error_always_on_supply_fault!: boolean;

  @Column({ type: "boolean" })
  error_canbus_communication_fault!: boolean;

  @Column({ type: "boolean" })
  error_charge_limit_enforcement_fault!: boolean;

  @Column({ type: "boolean" })
  error_charger_safety_relay_fault!: boolean;

  @Column({ type: "boolean" })
  error_current_sensor_fault!: boolean;

  @Column({ type: "boolean" })
  error_discharge_limit_enforcement_fault!: boolean;

  @Column({ type: "boolean" })
  error_fan_monitor_fault!: boolean;

  @Column({ type: "boolean" })
  error_high_voltage_isolation_fault!: boolean;

  @Column({ type: "boolean" })
  error_internal_communication_fault!: boolean;

  @Column({ type: "boolean" })
  error_internal_conversion_fault!: boolean;

  @Column({ type: "boolean" })
  error_internal_logic_fault!: boolean;

  @Column({ type: "boolean" })
  error_internal_memory_fault!: boolean;

  @Column({ type: "boolean" })
  error_internal_thermistor_fault!: boolean;

  @Column({ type: "boolean" })
  error_low_cell_voltage_fault!: boolean;

  @Column({ type: "boolean" })
  error_open_wiring_fault!: boolean;

  @Column({ type: "boolean" })
  error_pack_voltage_sensor_fault!: boolean;

  @Column({ type: "boolean" })
  error_power_supply_12v_fault!: boolean;

  @Column({ type: "boolean" })
  error_thermistor_fault!: boolean;

  @Column({ type: "boolean" })
  error_voltage_redundancy_fault!: boolean;

  @Column({ type: "boolean" })
  error_weak_cell_fault!: boolean;

  @Column({ type: "boolean" })
  error_weak_pack_fault!: boolean;

  // Warnings
  @Column({ type: "boolean" })
  warning_ccl_reduced_due_to_alternate_current_limit!: boolean;

  @Column({ type: "boolean" })
  warning_ccl_reduced_due_to_charger_latch!: boolean;

  @Column({ type: "boolean" })
  warning_ccl_reduced_due_to_high_cell_resistance!: boolean;

  @Column({ type: "boolean" })
  warning_ccl_reduced_due_to_high_cell_voltage!: boolean;

  @Column({ type: "boolean" })
  warning_ccl_reduced_due_to_high_pack_voltage!: boolean;

  @Column({ type: "boolean" })
  warning_ccl_reduced_due_to_high_soc!: boolean;

  @Column({ type: "boolean" })
  warning_ccl_reduced_due_to_temperature!: boolean;

  @Column({ type: "boolean" })
  warning_dcl_and_ccl_reduced_due_to_communication_failsafe!: boolean;

  @Column({ type: "boolean" })
  warning_dcl_and_ccl_reduced_due_to_voltage_failsafe!: boolean;

  @Column({ type: "boolean" })
  warning_dcl_reduced_due_to_high_cell_resistance!: boolean;

  @Column({ type: "boolean" })
  warning_dcl_reduced_due_to_low_cell_voltage!: boolean;

  @Column({ type: "boolean" })
  warning_dcl_reduced_due_to_low_pack_voltage!: boolean;

  @Column({ type: "boolean" })
  warning_dcl_reduced_due_to_low_soc!: boolean;

  @Column({ type: "boolean" })
  warning_dcl_reduced_due_to_temperature!: boolean;
}
