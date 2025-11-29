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
  Timestamp!: Date;

  @PrimaryColumn({ type: "text" })
  Rfid!: string;

  // Errors
  @Column({ type: "boolean" })
  ErrorAlwaysOnSupplyFault!: boolean;

  @Column({ type: "boolean" })
  ErrorCanbusCommunicationFault!: boolean;

  @Column({ type: "boolean" })
  ErrorChargeLimitEnforcementFault!: boolean;

  @Column({ type: "boolean" })
  ErrorChargerSafetyRelayFault!: boolean;

  @Column({ type: "boolean" })
  ErrorCurrentSensorFault!: boolean;

  @Column({ type: "boolean" })
  ErrorDischargeLimitEnforcementFault!: boolean;

  @Column({ type: "boolean" })
  ErrorFanMonitorFault!: boolean;

  @Column({ type: "boolean" })
  ErrorHighVoltageIsolationFault!: boolean;

  @Column({ type: "boolean" })
  ErrorInternalCommunicationFault!: boolean;

  @Column({ type: "boolean" })
  ErrorInternalConversionFault!: boolean;

  @Column({ type: "boolean" })
  ErrorInternalLogicFault!: boolean;

  @Column({ type: "boolean" })
  ErrorInternalMemoryFault!: boolean;

  @Column({ type: "boolean" })
  ErrorInternalThermistorFault!: boolean;

  @Column({ type: "boolean" })
  ErrorLowCellVoltageFault!: boolean;

  @Column({ type: "boolean" })
  ErrorOpenWiringFault!: boolean;

  @Column({ type: "boolean" })
  ErrorPackVoltageSensorFault!: boolean;

  @Column({ type: "boolean" })
  ErrorPowerSupply12vFault!: boolean;

  @Column({ type: "boolean" })
  ErrorThermistorFault!: boolean;

  @Column({ type: "boolean" })
  ErrorVoltageRedundancyFault!: boolean;

  @Column({ type: "boolean" })
  ErrorWeakCellFault!: boolean;

  @Column({ type: "boolean" })
  ErrorWeakPackFault!: boolean;

  // Warnings
  @Column({ type: "boolean" })
  WarningCclReducedDueToAlternateCurrentLimit!: boolean;

  @Column({ type: "boolean" })
  WarningCclReducedDueToChargerLatch!: boolean;

  @Column({ type: "boolean" })
  WarningCclReducedDueToHighCellResistance!: boolean;

  @Column({ type: "boolean" })
  WarningCclReducedDueToHighCellVoltage!: boolean;

  @Column({ type: "boolean" })
  WarningCclReducedDueToHighPackVoltage!: boolean;

  @Column({ type: "boolean" })
  WarningCclReducedDueToHighSoc!: boolean;

  @Column({ type: "boolean" })
  WarningCclReducedDueToTemperature!: boolean;

  @Column({ type: "boolean" })
  WarningDclAndCclReducedDueToCommunicationFailsafe!: boolean;

  @Column({ type: "boolean" })
  WarningDclAndCclReducedDueToVoltageFailsafe!: boolean;

  @Column({ type: "boolean" })
  WarningDclReducedDueToHighCellResistance!: boolean;

  @Column({ type: "boolean" })
  WarningDclReducedDueToLowCellVoltage!: boolean;

  @Column({ type: "boolean" })
  WarningDclReducedDueToLowPackVoltage!: boolean;

  @Column({ type: "boolean" })
  WarningDclReducedDueToLowSoc!: boolean;

  @Column({ type: "boolean" })
  WarningDclReducedDueToTemperature!: boolean;
}
