import { Entity, Column, Index, PrimaryColumn } from "typeorm";
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
  @PrimaryColumn({ type: "timestamptz" })
  Timestamp!: Date;

  @PrimaryColumn({ type: "text" })
  Rfid!: string;

  @Column({ type: "boolean" })
  AbattDisable!: boolean;

  @Column({ type: "boolean" })
  ArrayContactorCommand!: boolean;

  @Column({ type: "boolean" })
  ArrayHeartbeatDeadTrip!: boolean;

  @Column({ type: "boolean" })
  ArrayHighCurrentTrip!: boolean;

  @Column({ type: "boolean" })
  ArrayHighCurrentWarning!: boolean;

  @Column({ type: "float" })
  AuxiliaryBatteryVoltage!: number;

  @Column({ type: "boolean" })
  CanOc12vWarning!: boolean;

  @Column({ type: "boolean" })
  ChargeContactorCommand!: boolean;

  @Column({ type: "boolean" })
  ChargeEnable!: boolean;

  @Column({ type: "boolean" })
  ChargeHeartbeatDeadTrip!: boolean;

  @Column({ type: "boolean" })
  ChargeHighCurrentTrip!: boolean;

  @Column({ type: "boolean" })
  ChargeHighCurrentWarning!: boolean;

  @Column({ type: "boolean" })
  ChargeSafety!: boolean;

  @Column({ type: "boolean" })
  ChargeShouldTrip!: boolean;

  @Column({ type: "boolean" })
  ChgFault!: boolean;

  @Column({ type: "boolean" })
  ChgLvEn!: boolean;

  @Column({ type: "boolean" })
  ChgOn!: boolean;

  @Column({ type: "boolean" })
  CommonContactorCommand!: boolean;

  @Column({ type: "boolean" })
  CommonHeartbeatDeadTrip!: boolean;

  @Column({ type: "boolean" })
  CommonHighCurrentTrip!: boolean;

  @Column({ type: "boolean" })
  CommonHighCurrentWarning!: boolean;

  @Column({ type: "boolean" })
  ContactorConnectedUnexpectedlyTrip!: boolean;

  @Column({ type: "boolean" })
  ContactorDisconnectedUnexpectedlyTrip!: boolean;

  @Column({ type: "boolean" })
  DcdcFault!: boolean;

  @Column({ type: "boolean" })
  DcdcOn!: boolean;

  @Column({ type: "boolean" })
  DischargeEnable!: boolean;

  @Column({ type: "boolean" })
  DischargeShouldTrip!: boolean;

  @Column({ type: "boolean" })
  En1!: boolean;

  @Column({ type: "boolean" })
  EsdEnabledTrip!: boolean;

  @Column({ type: "boolean" })
  ExternalShutdown!: boolean;

  @Column({ type: "boolean" })
  Heartbeat!: boolean;

  @Column({ type: "boolean" })
  HighCellVoltageTrip!: boolean;

  @Column({ type: "boolean" })
  HighCellVoltageWarning!: boolean;

  @Column({ type: "boolean" })
  HighTemperatureTrip!: boolean;

  @Column({ type: "boolean" })
  HighTemperatureWarning!: boolean;

  @Column({ type: "boolean" })
  Key!: boolean;

  @Column({ type: "boolean" })
  LowCellVoltageTrip!: boolean;

  @Column({ type: "boolean" })
  LowCellVoltageWarning!: boolean;

  @Column({ type: "boolean" })
  LowTemperatureTrip!: boolean;

  @Column({ type: "boolean" })
  LowTemperatureWarning!: boolean;

  @Column({ type: "boolean" })
  LvContactorCommand!: boolean;

  @Column({ type: "boolean" })
  LvHeartbeatDeadTrip!: boolean;

  @Column({ type: "boolean" })
  LvHighCurrentTrip!: boolean;

  @Column({ type: "boolean" })
  LvHighCurrentWarning!: boolean;

  @Column({ type: "boolean" })
  MainPowerSwitch!: boolean;

  @Column({ type: "boolean" })
  MotorContactorCommand!: boolean;

  @Column({ type: "boolean" })
  MotorHeartbeatDeadTrip!: boolean;

  @Column({ type: "boolean" })
  MotorHighCurrentTrip!: boolean;

  @Column({ type: "boolean" })
  MotorHighCurrentWarning!: boolean;

  @Column({ type: "boolean" })
  MpsDisabledTrip!: boolean;

  @Column({ type: "boolean" })
  OrionCanReceivedRecently!: boolean;

  @Column({ type: "boolean" })
  OrionMessageTimeoutTrip!: boolean;

  @Column({ type: "boolean" })
  ProtectionTrip!: boolean;

  @Column({ type: "float" })
  StartupState!: number;

  @Column({ type: "boolean" })
  StrobeBmsLight!: boolean;

  @Column({ type: "float" })
  SystemState!: number;

  @Column({ type: "boolean" })
  ThreeAOc!: boolean;
}
