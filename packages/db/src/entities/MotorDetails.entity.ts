import { Entity, Column, Index, PrimaryColumn } from "typeorm";
import { Hypertable, TimeColumn } from "@timescaledb/typeorm";

/**
 * Motor details sensor data hypertable
 * Related to telemetry_metadata via timestamp + rfid
 * Note: We have MotorDetails0 and MotorDetails1, so motor_id will differentiate them
 */
@Entity("motor_details")
@Hypertable({
  timeColumnName: "timestamp",
  chunkTimeInterval: "1 month",
  compression: {
    compress: true,
    compress_segmentby: "rfid, motor_id",
    compress_orderby: "timestamp DESC",
  },
})
@Index(["rfid", "timestamp"])
@Index(["motor_id", "timestamp"])
export class MotorDetails {
  @TimeColumn()
  @PrimaryColumn({ type: "timestamptz" })
  timestamp!: Date;

  @PrimaryColumn({ type: "text" })
  rfid!: string;

  @PrimaryColumn({ type: "int" })
  motor_id!: number;

  @Column({ type: "float" })
  active_motor!: number;

  @Column({ type: "float" })
  bemf_d!: number;

  @Column({ type: "float" })
  bemf_q!: number;

  @Column({ type: "float" })
  bus_current!: number;

  @Column({ type: "float" })
  bus_voltage!: number;

  @Column({ type: "float" })
  dc_bus_ah!: number;

  @Column({ type: "float" })
  dsp_board_temperature!: number;

  @Column({ type: "float" })
  error_flags!: number;

  @Column({ type: "float" })
  heatsink_temperature!: number;

  @Column({ type: "float" })
  id!: number;

  @Column({ type: "float" })
  iq!: number;

  @Column({ type: "float" })
  limit_flags!: number;

  @Column({ type: "float" })
  motor_temperature!: number;

  @Column({ type: "float" })
  motor_velocity!: number;

  @Column({ type: "float" })
  odometer!: number;

  @Column({ type: "float" })
  phase_current_b!: number;

  @Column({ type: "float" })
  phase_current_c!: number;

  @Column({ type: "float" })
  rx_error_count!: number;

  @Column({ type: "float" })
  serial_number!: number;

  @Column({ type: "float" })
  slip_speed!: number;

  @Column({ type: "float" })
  supply_15v!: number;

  @Column({ type: "float" })
  supply_1v9!: number;

  @Column({ type: "float" })
  supply_3v3!: number;

  @Column({ type: "float" })
  tritium_id!: number;

  @Column({ type: "float" })
  tx_error_count!: number;

  @Column({ type: "float" })
  vd!: number;

  @Column({ type: "float" })
  vehicle_velocity!: number;

  @Column({ type: "float" })
  vq!: number;
}
