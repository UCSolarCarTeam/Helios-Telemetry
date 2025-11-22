import { Entity, Column, Index } from "typeorm";
import { Hypertable, TimeColumn } from "@timescaledb/typeorm";

/**
 * MBMS (Master Battery Management System) sensor data hypertable
 * Related to telemetry_metadata via timestamp + rfid
 */
@Entity("mbms")
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
export class MBMS {
  @TimeColumn()
  timestamp!: Date;

  @Column({ type: "text", primary: true })
  rfid!: string;

  @Column({ type: "boolean" })
  abatt_disable!: boolean;

  @Column({ type: "boolean" })
  array_contactor_command!: boolean;

  @Column({ type: "boolean" })
  array_heartbeat_dead_trip!: boolean;

  @Column({ type: "boolean" })
  array_high_current_trip!: boolean;

  @Column({ type: "boolean" })
  array_high_current_warning!: boolean;

  @Column({ type: "float" })
  auxiliary_battery_voltage!: number;

  @Column({ type: "boolean" })
  can_oc_12v_warning!: boolean;

  @Column({ type: "boolean" })
  charge_contactor_command!: boolean;

  @Column({ type: "boolean" })
  charge_enable!: boolean;

  @Column({ type: "boolean" })
  charge_heartbeat_dead_trip!: boolean;

  @Column({ type: "boolean" })
  charge_high_current_trip!: boolean;

  @Column({ type: "boolean" })
  charge_high_current_warning!: boolean;

  @Column({ type: "boolean" })
  charge_safety!: boolean;

  @Column({ type: "boolean" })
  charge_should_trip!: boolean;

  @Column({ type: "boolean" })
  chg_fault!: boolean;

  @Column({ type: "boolean" })
  chg_lv_en!: boolean;

  @Column({ type: "boolean" })
  chg_on!: boolean;

  @Column({ type: "boolean" })
  common_contactor_command!: boolean;

  @Column({ type: "boolean" })
  common_heartbeat_dead_trip!: boolean;

  @Column({ type: "boolean" })
  common_high_current_trip!: boolean;

  @Column({ type: "boolean" })
  common_high_current_warning!: boolean;

  @Column({ type: "boolean" })
  contactor_connected_unexpectedly_trip!: boolean;

  @Column({ type: "boolean" })
  contactor_disconnected_unexpectedly_trip!: boolean;

  @Column({ type: "boolean" })
  dcdc_fault!: boolean;

  @Column({ type: "boolean" })
  dcdc_on!: boolean;

  @Column({ type: "boolean" })
  discharge_enable!: boolean;

  @Column({ type: "boolean" })
  discharge_should_trip!: boolean;

  @Column({ type: "boolean" })
  en1!: boolean;

  @Column({ type: "boolean" })
  esd_enabled_trip!: boolean;

  @Column({ type: "boolean" })
  external_shutdown!: boolean;

  @Column({ type: "boolean" })
  heartbeat!: boolean;

  @Column({ type: "boolean" })
  high_cell_voltage_trip!: boolean;

  @Column({ type: "boolean" })
  high_cell_voltage_warning!: boolean;

  @Column({ type: "boolean" })
  high_temperature_trip!: boolean;

  @Column({ type: "boolean" })
  high_temperature_warning!: boolean;

  @Column({ type: "boolean" })
  key!: boolean;

  @Column({ type: "boolean" })
  low_cell_voltage_trip!: boolean;

  @Column({ type: "boolean" })
  low_cell_voltage_warning!: boolean;

  @Column({ type: "boolean" })
  low_temperature_trip!: boolean;

  @Column({ type: "boolean" })
  low_temperature_warning!: boolean;

  @Column({ type: "boolean" })
  lv_contactor_command!: boolean;

  @Column({ type: "boolean" })
  lv_heartbeat_dead_trip!: boolean;

  @Column({ type: "boolean" })
  lv_high_current_trip!: boolean;

  @Column({ type: "boolean" })
  lv_high_current_warning!: boolean;

  @Column({ type: "boolean" })
  main_power_switch!: boolean;

  @Column({ type: "boolean" })
  motor_contactor_command!: boolean;

  @Column({ type: "boolean" })
  motor_heartbeat_dead_trip!: boolean;

  @Column({ type: "boolean" })
  motor_high_current_trip!: boolean;

  @Column({ type: "boolean" })
  motor_high_current_warning!: boolean;

  @Column({ type: "boolean" })
  mps_disabled_trip!: boolean;

  @Column({ type: "boolean" })
  orion_can_received_recently!: boolean;

  @Column({ type: "boolean" })
  orion_message_timeout_trip!: boolean;

  @Column({ type: "boolean" })
  protection_trip!: boolean;

  @Column({ type: "float" })
  startup_state!: number;

  @Column({ type: "boolean" })
  strobe_bms_light!: boolean;

  @Column({ type: "float" })
  system_state!: number;

  @Column({ type: "boolean" })
  three_a_oc!: boolean;
}
