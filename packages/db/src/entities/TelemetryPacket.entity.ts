import { Entity, Column, Index, PrimaryColumn } from "typeorm";
import { Hypertable, TimeColumn } from "@timescaledb/typeorm";

/**
 * Combines all sensor data into a single wide table for simplified insertions and queries
 */
@Entity("telemetry_packet")
@Hypertable({
  compression: {
    compress: true,
    compress_segmentby: "rfid",
    compress_orderby: "timestamp",
    policy: {
      schedule_interval: "7 days",
    },
  },
})
@Index(["rfid", "timestamp"])
@Index(["RaceName", "timestamp"])
export class TelemetryPacket {
  @TimeColumn()
  @PrimaryColumn({ type: "timestamptz" })
  timestamp!: Date;

  @PrimaryColumn({ type: "text" })
  rfid!: string;

  // ===============================================
  // Metadata Fields (from TelemetryMetadata)
  // ===============================================
  @Column({ type: "text", nullable: true })
  RaceName?: string;

  @Column({ type: "text", nullable: true })
  Title?: string;

  // ===============================================
  // B3 Fields (Button Board 3)
  // ===============================================
  @Column({ type: "float", nullable: true })
  Acceleration?: number;

  @Column({ type: "boolean", nullable: true })
  B3Heartbeat?: boolean;

  @Column({ type: "boolean", nullable: true })
  BrakeLightSignalStatus?: boolean;

  @Column({ type: "boolean", nullable: true })
  BrakeSwitchDigital?: boolean;

  @Column({ type: "boolean", nullable: true })
  DaytimeRunningLightSignalStatus?: boolean;

  @Column({ type: "boolean", nullable: true })
  ForwardDigital?: boolean;

  @Column({ type: "boolean", nullable: true })
  HandbrakeSwitchDigital?: boolean;

  @Column({ type: "boolean", nullable: true })
  HazardLightsInput?: boolean;

  @Column({ type: "boolean", nullable: true })
  HeadlightsSwitchInput?: boolean;

  @Column({ type: "boolean", nullable: true })
  HeadlightSignalStatus?: boolean;

  @Column({ type: "boolean", nullable: true })
  HornSignalStatus?: boolean;

  @Column({ type: "boolean", nullable: true })
  HornSwitchDigital?: boolean;

  @Column({ type: "boolean", nullable: true })
  LapDigital?: boolean;

  @Column({ type: "boolean", nullable: true })
  LeftSignalInput?: boolean;

  @Column({ type: "boolean", nullable: true })
  LeftSignalStatus?: boolean;

  @Column({ type: "boolean", nullable: true })
  MotorResetDigital?: boolean;

  @Column({ type: "boolean", nullable: true })
  NeutralDigital?: boolean;

  @Column({ type: "boolean", nullable: true })
  RaceModeDigital?: boolean;

  @Column({ type: "float", nullable: true })
  RegenBraking?: number;

  @Column({ type: "boolean", nullable: true })
  ReverseDigital?: boolean;

  @Column({ type: "boolean", nullable: true })
  RightSignalInput?: boolean;

  @Column({ type: "boolean", nullable: true })
  RightSignalStatus?: boolean;

  // ===============================================
  // Battery Fields
  // ===============================================
  @Column({ type: "boolean", nullable: true })
  AlwaysOnSignalStatus?: boolean;

  @Column({ type: "float", nullable: true })
  AverageCellVoltage?: number;

  @Column({ type: "float", nullable: true })
  AverageTemperature?: number;

  @Column({ type: "integer", nullable: true })
  BmuAlive?: number;

  @Column({ type: "boolean", nullable: true })
  ChargeRelayEnabled?: boolean;

  @Column({ type: "boolean", nullable: true })
  ChargerSafetyEnabled?: boolean;

  @Column({ type: "boolean", nullable: true })
  DischargeRelayEnabled?: boolean;

  @Column({ type: "float", nullable: true })
  FanSpeed?: number;

  @Column({ type: "float", nullable: true })
  FanVoltage?: number;

  @Column({ type: "float", nullable: true })
  HighCellVoltage?: number;

  @Column({ type: "integer", nullable: true })
  HighCellVoltageId?: number;

  @Column({ type: "float", nullable: true })
  HighTemperature?: number;

  @Column({ type: "integer", nullable: true })
  HighThermistorId?: number;

  @Column({ type: "float", nullable: true })
  Input12v?: number;

  @Column({ type: "float", nullable: true })
  InternalTemperature?: number;

  @Column({ type: "boolean", nullable: true })
  IsChargingSignalStatus?: boolean;

  @Column({ type: "boolean", nullable: true })
  IsReadySignalStatus?: boolean;

  @Column({ type: "float", nullable: true })
  LowCellVoltage?: number;

  @Column({ type: "integer", nullable: true })
  LowCellVoltageId?: number;

  @Column({ type: "float", nullable: true })
  LowTemperature?: number;

  @Column({ type: "integer", nullable: true })
  LowThermistorId?: number;

  @Column({ type: "boolean", nullable: true })
  MalfunctionIndicatorActive?: boolean;

  @Column({ type: "float", nullable: true })
  MaximumCellVoltage?: number;

  @Column({ type: "float", nullable: true })
  MaximumPackVoltage?: number;

  @Column({ type: "float", nullable: true })
  MinimumCellVoltage?: number;

  @Column({ type: "float", nullable: true })
  MinimumPackVoltage?: number;

  @Column({ type: "boolean", nullable: true })
  MultiPurposeInputSignalStatus?: boolean;

  @Column({ type: "float", nullable: true })
  PackAmphours?: number;

  @Column({ type: "float", nullable: true })
  PackCurrent?: number;

  @Column({ type: "float", nullable: true })
  PackDepthOfDischarge?: number;

  @Column({ type: "float", nullable: true })
  PackStateOfCharge?: number;

  @Column({ type: "float", nullable: true })
  PackVoltage?: number;

  @Column({ type: "integer", nullable: true })
  PopulatedCells?: number;

  @Column({ type: "float", nullable: true })
  RequestedFanSpeed?: number;

  // ===============================================
  // Battery Faults Fields (Errors)
  // ===============================================
  @Column({ type: "boolean", nullable: true })
  ErrorAlwaysOnSupplyFault?: boolean;

  @Column({ type: "boolean", nullable: true })
  ErrorCanbusCommunicationFault?: boolean;

  @Column({ type: "boolean", nullable: true })
  ErrorChargeLimitEnforcementFault?: boolean;

  @Column({ type: "boolean", nullable: true })
  ErrorChargerSafetyRelayFault?: boolean;

  @Column({ type: "boolean", nullable: true })
  ErrorCurrentSensorFault?: boolean;

  @Column({ type: "boolean", nullable: true })
  ErrorDischargeLimitEnforcementFault?: boolean;

  @Column({ type: "boolean", nullable: true })
  ErrorFanMonitorFault?: boolean;

  @Column({ type: "boolean", nullable: true })
  ErrorHighVoltageIsolationFault?: boolean;

  @Column({ type: "boolean", nullable: true })
  ErrorInternalCommunicationFault?: boolean;

  @Column({ type: "boolean", nullable: true })
  ErrorInternalConversionFault?: boolean;

  @Column({ type: "boolean", nullable: true })
  ErrorInternalLogicFault?: boolean;

  @Column({ type: "boolean", nullable: true })
  ErrorInternalMemoryFault?: boolean;

  @Column({ type: "boolean", nullable: true })
  ErrorInternalThermistorFault?: boolean;

  @Column({ type: "boolean", nullable: true })
  ErrorLowCellVoltageFault?: boolean;

  @Column({ type: "boolean", nullable: true })
  ErrorOpenWiringFault?: boolean;

  @Column({ type: "boolean", nullable: true })
  ErrorPackVoltageSensorFault?: boolean;

  @Column({ type: "boolean", nullable: true })
  ErrorPowerSupply12vFault?: boolean;

  @Column({ type: "boolean", nullable: true })
  ErrorThermistorFault?: boolean;

  @Column({ type: "boolean", nullable: true })
  ErrorVoltageRedundancyFault?: boolean;

  @Column({ type: "boolean", nullable: true })
  ErrorWeakCellFault?: boolean;

  @Column({ type: "boolean", nullable: true })
  ErrorWeakPackFault?: boolean;

  // ===============================================
  // Battery Faults Fields (Warnings)
  // ===============================================
  @Column({ type: "boolean", nullable: true })
  WarningCclReducedDueToAlternateCurrentLimit?: boolean;

  @Column({ type: "boolean", nullable: true })
  WarningCclReducedDueToChargerLatch?: boolean;

  @Column({ type: "boolean", nullable: true })
  WarningCclReducedDueToHighCellResistance?: boolean;

  @Column({ type: "boolean", nullable: true })
  WarningCclReducedDueToHighCellVoltage?: boolean;

  @Column({ type: "boolean", nullable: true })
  WarningCclReducedDueToHighPackVoltage?: boolean;

  @Column({ type: "boolean", nullable: true })
  WarningCclReducedDueToHighSoc?: boolean;

  @Column({ type: "boolean", nullable: true })
  WarningCclReducedDueToTemperature?: boolean;

  @Column({ type: "boolean", nullable: true })
  WarningDclAndCclReducedDueToCommunicationFailsafe?: boolean;

  @Column({ type: "boolean", nullable: true })
  WarningDclAndCclReducedDueToVoltageFailsafe?: boolean;

  @Column({ type: "boolean", nullable: true })
  WarningDclReducedDueToHighCellResistance?: boolean;

  @Column({ type: "boolean", nullable: true })
  WarningDclReducedDueToLowCellVoltage?: boolean;

  @Column({ type: "boolean", nullable: true })
  WarningDclReducedDueToLowPackVoltage?: boolean;

  @Column({ type: "boolean", nullable: true })
  WarningDclReducedDueToLowSoc?: boolean;

  @Column({ type: "boolean", nullable: true })
  WarningDclReducedDueToTemperature?: boolean;

  // ===============================================
  // Contactor Fields - Array
  // ===============================================
  @Column({ type: "boolean", nullable: true })
  ArrayBpsError?: boolean;

  @Column({ type: "float", nullable: true })
  ArrayChargeCurrent?: number;

  @Column({ type: "boolean", nullable: true })
  ArrayContactorClosed?: boolean;

  @Column({ type: "boolean", nullable: true })
  ArrayContactorClosing?: boolean;

  @Column({ type: "boolean", nullable: true })
  ArrayContactorError?: boolean;

  @Column({ type: "boolean", nullable: true })
  ArrayHeartbeat?: boolean;

  @Column({ type: "float", nullable: true })
  ArrayLineCurrent?: number;

  @Column({ type: "boolean", nullable: true })
  ArrayPrechargerClosed?: boolean;

  @Column({ type: "boolean", nullable: true })
  ArrayPrechargerClosing?: boolean;

  @Column({ type: "boolean", nullable: true })
  ArrayPrechargerError?: boolean;

  // ===============================================
  // Contactor Fields - Charge
  // ===============================================
  @Column({ type: "boolean", nullable: true })
  ChargeBpsError?: boolean;

  @Column({ type: "float", nullable: true })
  ChargeChargeCurrent?: number;

  @Column({ type: "boolean", nullable: true })
  ChargeContactorClosed?: boolean;

  @Column({ type: "boolean", nullable: true })
  ChargeContactorClosing?: boolean;

  @Column({ type: "boolean", nullable: true })
  ChargeContactorError?: boolean;

  @Column({ type: "boolean", nullable: true })
  ChargeHeartbeat?: boolean;

  @Column({ type: "float", nullable: true })
  ChargeLineCurrent?: number;

  @Column({ type: "boolean", nullable: true })
  ChargePrechargerClosed?: boolean;

  @Column({ type: "boolean", nullable: true })
  ChargePrechargerClosing?: boolean;

  @Column({ type: "boolean", nullable: true })
  ChargePrechargerError?: boolean;

  // ===============================================
  // Contactor Fields - Common
  // ===============================================
  @Column({ type: "float", nullable: true })
  CommonChargeCurrent?: number;

  @Column({ type: "boolean", nullable: true })
  CommonContactorClosed?: boolean;

  @Column({ type: "boolean", nullable: true })
  CommonContactorClosing?: boolean;

  @Column({ type: "boolean", nullable: true })
  CommonContactorError?: boolean;

  @Column({ type: "boolean", nullable: true })
  CommonContactorOpeningError?: boolean;

  @Column({ type: "boolean", nullable: true })
  CommonHeartbeat?: boolean;

  @Column({ type: "float", nullable: true })
  CommonLineCurrent?: number;

  @Column({ type: "boolean", nullable: true })
  CommonPrechargerClosed?: boolean;

  @Column({ type: "boolean", nullable: true })
  CommonPrechargerClosing?: boolean;

  @Column({ type: "boolean", nullable: true })
  CommonPrechargerError?: boolean;

  // ===============================================
  // Contactor Fields - LV
  // ===============================================
  @Column({ type: "boolean", nullable: true })
  LvBpsError?: boolean;

  @Column({ type: "float", nullable: true })
  LvChargeCurrent?: number;

  @Column({ type: "boolean", nullable: true })
  LvContactorClosed?: boolean;

  @Column({ type: "boolean", nullable: true })
  LvContactorClosing?: boolean;

  @Column({ type: "boolean", nullable: true })
  LvContactorError?: boolean;

  @Column({ type: "boolean", nullable: true })
  LvHeartbeat?: boolean;

  @Column({ type: "float", nullable: true })
  LvLineCurrent?: number;

  @Column({ type: "boolean", nullable: true })
  LvPrechargerClosed?: boolean;

  @Column({ type: "boolean", nullable: true })
  LvPrechargerClosing?: boolean;

  @Column({ type: "boolean", nullable: true })
  LvPrechargerError?: boolean;

  // ===============================================
  // Contactor Fields - Motor
  // ===============================================
  @Column({ type: "boolean", nullable: true })
  MotorBpsError?: boolean;

  @Column({ type: "float", nullable: true })
  MotorChargeCurrent?: number;

  @Column({ type: "boolean", nullable: true })
  MotorContactorClosed?: boolean;

  @Column({ type: "boolean", nullable: true })
  MotorContactorClosing?: boolean;

  @Column({ type: "boolean", nullable: true })
  MotorContactorError?: boolean;

  @Column({ type: "boolean", nullable: true })
  MotorHeartbeat?: boolean;

  @Column({ type: "float", nullable: true })
  MotorLineCurrent?: number;

  @Column({ type: "boolean", nullable: true })
  MotorPrechargerClosed?: boolean;

  @Column({ type: "boolean", nullable: true })
  MotorPrechargerClosing?: boolean;

  @Column({ type: "boolean", nullable: true })
  MotorPrechargerError?: boolean;

  // ===============================================
  // KeyMotor Fields
  // ===============================================
  @Column({ type: "float", nullable: true })
  BusCurrentOut?: number;

  @Column({ type: "float", nullable: true })
  KeyMotorVelocity?: number;

  @Column({ type: "float", nullable: true })
  MotorCurrent?: number;

  // ===============================================
  // MBMS Fields (Master Battery Management System)
  // ===============================================
  @Column({ type: "boolean", nullable: true })
  AbattDisable?: boolean;

  @Column({ type: "boolean", nullable: true })
  ArrayContactorCommand?: boolean;

  @Column({ type: "boolean", nullable: true })
  ArrayHeartbeatDeadTrip?: boolean;

  @Column({ type: "boolean", nullable: true })
  ArrayHighCurrentTrip?: boolean;

  @Column({ type: "boolean", nullable: true })
  ArrayHighCurrentWarning?: boolean;

  @Column({ type: "float", nullable: true })
  AuxiliaryBatteryVoltage?: number;

  @Column({ type: "boolean", nullable: true })
  CanOc12vWarning?: boolean;

  @Column({ type: "boolean", nullable: true })
  ChargeContactorCommand?: boolean;

  @Column({ type: "boolean", nullable: true })
  ChargeEnable?: boolean;

  @Column({ type: "boolean", nullable: true })
  ChargeHeartbeatDeadTrip?: boolean;

  @Column({ type: "boolean", nullable: true })
  ChargeHighCurrentTrip?: boolean;

  @Column({ type: "boolean", nullable: true })
  ChargeHighCurrentWarning?: boolean;

  @Column({ type: "boolean", nullable: true })
  ChargeSafety?: boolean;

  @Column({ type: "boolean", nullable: true })
  ChargeShouldTrip?: boolean;

  @Column({ type: "boolean", nullable: true })
  ChgFault?: boolean;

  @Column({ type: "boolean", nullable: true })
  ChgLvEn?: boolean;

  @Column({ type: "boolean", nullable: true })
  ChgOn?: boolean;

  @Column({ type: "boolean", nullable: true })
  CommonContactorCommand?: boolean;

  @Column({ type: "boolean", nullable: true })
  CommonHeartbeatDeadTrip?: boolean;

  @Column({ type: "boolean", nullable: true })
  CommonHighCurrentTrip?: boolean;

  @Column({ type: "boolean", nullable: true })
  CommonHighCurrentWarning?: boolean;

  @Column({ type: "boolean", nullable: true })
  ContactorConnectedUnexpectedlyTrip?: boolean;

  @Column({ type: "boolean", nullable: true })
  ContactorDisconnectedUnexpectedlyTrip?: boolean;

  @Column({ type: "boolean", nullable: true })
  DcdcFault?: boolean;

  @Column({ type: "boolean", nullable: true })
  DcdcOn?: boolean;

  @Column({ type: "boolean", nullable: true })
  DischargeEnable?: boolean;

  @Column({ type: "boolean", nullable: true })
  DischargeShouldTrip?: boolean;

  @Column({ type: "boolean", nullable: true })
  En1?: boolean;

  @Column({ type: "boolean", nullable: true })
  EsdEnabledTrip?: boolean;

  @Column({ type: "boolean", nullable: true })
  ExternalShutdown?: boolean;

  @Column({ type: "boolean", nullable: true })
  Heartbeat?: boolean;

  @Column({ type: "boolean", nullable: true })
  HighCellVoltageTrip?: boolean;

  @Column({ type: "boolean", nullable: true })
  HighCellVoltageWarning?: boolean;

  @Column({ type: "boolean", nullable: true })
  HighTemperatureTrip?: boolean;

  @Column({ type: "boolean", nullable: true })
  HighTemperatureWarning?: boolean;

  @Column({ type: "boolean", nullable: true })
  Key?: boolean;

  @Column({ type: "boolean", nullable: true })
  LowCellVoltageTrip?: boolean;

  @Column({ type: "boolean", nullable: true })
  LowCellVoltageWarning?: boolean;

  @Column({ type: "boolean", nullable: true })
  LowTemperatureTrip?: boolean;

  @Column({ type: "boolean", nullable: true })
  LowTemperatureWarning?: boolean;

  @Column({ type: "boolean", nullable: true })
  LvContactorCommand?: boolean;

  @Column({ type: "boolean", nullable: true })
  LvHeartbeatDeadTrip?: boolean;

  @Column({ type: "boolean", nullable: true })
  LvHighCurrentTrip?: boolean;

  @Column({ type: "boolean", nullable: true })
  LvHighCurrentWarning?: boolean;

  @Column({ type: "boolean", nullable: true })
  MainPowerSwitch?: boolean;

  @Column({ type: "boolean", nullable: true })
  MotorContactorCommand?: boolean;

  @Column({ type: "boolean", nullable: true })
  MotorHeartbeatDeadTrip?: boolean;

  @Column({ type: "boolean", nullable: true })
  MotorHighCurrentTrip?: boolean;

  @Column({ type: "boolean", nullable: true })
  MotorHighCurrentWarning?: boolean;

  @Column({ type: "boolean", nullable: true })
  MpsDisabledTrip?: boolean;

  @Column({ type: "boolean", nullable: true })
  OrionCanReceivedRecently?: boolean;

  @Column({ type: "boolean", nullable: true })
  OrionMessageTimeoutTrip?: boolean;

  @Column({ type: "boolean", nullable: true })
  ProtectionTrip?: boolean;

  @Column({ type: "float", nullable: true })
  StartupState?: number;

  @Column({ type: "boolean", nullable: true })
  StrobeBmsLight?: boolean;

  @Column({ type: "float", nullable: true })
  SystemState?: number;

  @Column({ type: "boolean", nullable: true })
  ThreeAOc?: boolean;

  // ===============================================
  // MotorDetails Fields (Motor 0)
  // Note: Motor 1 fields would need to be added separately with different names
  // e.g., Motor0ActiveMotor, Motor1ActiveMotor
  // ===============================================
  @Column({ type: "float", nullable: true })
  Motor0ActiveMotor?: number;

  @Column({ type: "float", nullable: true })
  Motor0BemfD?: number;

  @Column({ type: "float", nullable: true })
  Motor0BemfQ?: number;

  @Column({ type: "float", nullable: true })
  Motor0BusCurrent?: number;

  @Column({ type: "float", nullable: true })
  Motor0BusVoltage?: number;

  @Column({ type: "float", nullable: true })
  Motor0DcBusAh?: number;

  @Column({ type: "float", nullable: true })
  Motor0DspBoardTemperature?: number;

  @Column({ type: "float", nullable: true })
  Motor0ErrorFlags?: number;

  @Column({ type: "float", nullable: true })
  Motor0HeatsinkTemperature?: number;

  @Column({ type: "float", nullable: true })
  Motor0Id?: number;

  @Column({ type: "float", nullable: true })
  Motor0Iq?: number;

  @Column({ type: "float", nullable: true })
  Motor0LimitFlags?: number;

  @Column({ type: "float", nullable: true })
  Motor0MotorTemperature?: number;

  @Column({ type: "float", nullable: true })
  Motor0MotorVelocity?: number;

  @Column({ type: "float", nullable: true })
  Motor0Odometer?: number;

  @Column({ type: "float", nullable: true })
  Motor0PhaseCurrentB?: number;

  @Column({ type: "float", nullable: true })
  Motor0PhaseCurrentC?: number;

  @Column({ type: "float", nullable: true })
  Motor0RxErrorCount?: number;

  @Column({ type: "float", nullable: true })
  Motor0SerialNumber?: number;

  @Column({ type: "float", nullable: true })
  Motor0SlipSpeed?: number;

  @Column({ type: "float", nullable: true })
  Motor0Supply15v?: number;

  @Column({ type: "float", nullable: true })
  Motor0Supply1v9?: number;

  @Column({ type: "float", nullable: true })
  Motor0Supply3v3?: number;

  @Column({ type: "float", nullable: true })
  Motor0TritiumId?: number;

  @Column({ type: "float", nullable: true })
  Motor0TxErrorCount?: number;

  @Column({ type: "float", nullable: true })
  Motor0Vd?: number;

  @Column({ type: "float", nullable: true })
  Motor0VehicleVelocity?: number;

  @Column({ type: "float", nullable: true })
  Motor0Vq?: number;

  // ===============================================
  // MotorDetails Fields (Motor 1)
  // ===============================================
  @Column({ type: "float", nullable: true })
  Motor1ActiveMotor?: number;

  @Column({ type: "float", nullable: true })
  Motor1BemfD?: number;

  @Column({ type: "float", nullable: true })
  Motor1BemfQ?: number;

  @Column({ type: "float", nullable: true })
  Motor1BusCurrent?: number;

  @Column({ type: "float", nullable: true })
  Motor1BusVoltage?: number;

  @Column({ type: "float", nullable: true })
  Motor1DcBusAh?: number;

  @Column({ type: "float", nullable: true })
  Motor1DspBoardTemperature?: number;

  @Column({ type: "float", nullable: true })
  Motor1ErrorFlags?: number;

  @Column({ type: "float", nullable: true })
  Motor1HeatsinkTemperature?: number;

  @Column({ type: "float", nullable: true })
  Motor1Id?: number;

  @Column({ type: "float", nullable: true })
  Motor1Iq?: number;

  @Column({ type: "float", nullable: true })
  Motor1LimitFlags?: number;

  @Column({ type: "float", nullable: true })
  Motor1MotorTemperature?: number;

  @Column({ type: "float", nullable: true })
  Motor1MotorVelocity?: number;

  @Column({ type: "float", nullable: true })
  Motor1Odometer?: number;

  @Column({ type: "float", nullable: true })
  Motor1PhaseCurrentB?: number;

  @Column({ type: "float", nullable: true })
  Motor1PhaseCurrentC?: number;

  @Column({ type: "float", nullable: true })
  Motor1RxErrorCount?: number;

  @Column({ type: "float", nullable: true })
  Motor1SerialNumber?: number;

  @Column({ type: "float", nullable: true })
  Motor1SlipSpeed?: number;

  @Column({ type: "float", nullable: true })
  Motor1Supply15v?: number;

  @Column({ type: "float", nullable: true })
  Motor1Supply1v9?: number;

  @Column({ type: "float", nullable: true })
  Motor1Supply3v3?: number;

  @Column({ type: "float", nullable: true })
  Motor1TritiumId?: number;

  @Column({ type: "float", nullable: true })
  Motor1TxErrorCount?: number;

  @Column({ type: "float", nullable: true })
  Motor1Vd?: number;

  @Column({ type: "float", nullable: true })
  Motor1VehicleVelocity?: number;

  @Column({ type: "float", nullable: true })
  Motor1Vq?: number;

  // ===============================================
  // MPPT Fields (Maximum Power Point Tracker)
  // ===============================================
  @Column({ type: "float", nullable: true })
  Mppt0Ch0ArrayCurrent?: number;

  @Column({ type: "float", nullable: true })
  Mppt0Ch0ArrayVoltage?: number;

  @Column({ type: "float", nullable: true })
  Mppt0Ch0BatteryVoltage?: number;

  @Column({ type: "float", nullable: true })
  Mppt0Ch0UnitTemperature?: number;

  @Column({ type: "float", nullable: true })
  Mppt0Ch1ArrayCurrent?: number;

  @Column({ type: "float", nullable: true })
  Mppt0Ch1ArrayVoltage?: number;

  @Column({ type: "float", nullable: true })
  Mppt0Ch1BatteryVoltage?: number;

  @Column({ type: "float", nullable: true })
  Mppt0Ch1UnitTemperature?: number;

  @Column({ type: "float", nullable: true })
  Mppt1Ch0ArrayCurrent?: number;

  @Column({ type: "float", nullable: true })
  Mppt1Ch0ArrayVoltage?: number;

  @Column({ type: "float", nullable: true })
  Mppt1Ch0BatteryVoltage?: number;

  @Column({ type: "float", nullable: true })
  Mppt1Ch0UnitTemperature?: number;

  @Column({ type: "float", nullable: true })
  Mppt1Ch1ArrayCurrent?: number;

  @Column({ type: "float", nullable: true })
  Mppt1Ch1ArrayVoltage?: number;

  @Column({ type: "float", nullable: true })
  Mppt1Ch1BatteryVoltage?: number;

  @Column({ type: "float", nullable: true })
  Mppt1Ch1UnitTemperature?: number;

  @Column({ type: "float", nullable: true })
  Mppt2Ch0ArrayCurrent?: number;

  @Column({ type: "float", nullable: true })
  Mppt2Ch0ArrayVoltage?: number;

  @Column({ type: "float", nullable: true })
  Mppt2Ch0BatteryVoltage?: number;

  @Column({ type: "float", nullable: true })
  Mppt2Ch0UnitTemperature?: number;

  @Column({ type: "float", nullable: true })
  Mppt2Ch1ArrayCurrent?: number;

  @Column({ type: "float", nullable: true })
  Mppt2Ch1ArrayVoltage?: number;

  @Column({ type: "float", nullable: true })
  Mppt2Ch1BatteryVoltage?: number;

  @Column({ type: "float", nullable: true })
  Mppt2Ch1UnitTemperature?: number;

  @Column({ type: "float", nullable: true })
  Mppt3Ch0ArrayCurrent?: number;

  @Column({ type: "float", nullable: true })
  Mppt3Ch0ArrayVoltage?: number;

  @Column({ type: "float", nullable: true })
  Mppt3Ch0BatteryVoltage?: number;

  @Column({ type: "float", nullable: true })
  Mppt3Ch0UnitTemperature?: number;

  @Column({ type: "float", nullable: true })
  Mppt3Ch1ArrayCurrent?: number;

  @Column({ type: "float", nullable: true })
  Mppt3Ch1ArrayVoltage?: number;

  @Column({ type: "float", nullable: true })
  Mppt3Ch1BatteryVoltage?: number;

  @Column({ type: "float", nullable: true })
  Mppt3Ch1UnitTemperature?: number;

  // ===============================================
  // ProximitySensors Fields
  // ===============================================
  @Column({ type: "float", nullable: true })
  ProximitySensor1?: number;

  @Column({ type: "float", nullable: true })
  ProximitySensor2?: number;

  @Column({ type: "float", nullable: true })
  ProximitySensor3?: number;

  @Column({ type: "float", nullable: true })
  ProximitySensor4?: number;

  // ===============================================
  // Telemetry Fields (GPS and MPU)
  // ===============================================
  @Column({ type: "float", nullable: true })
  GpsAdditionalFlags?: number;

  @Column({ type: "float", nullable: true })
  GpsDay?: number;

  @Column({ type: "float", nullable: true })
  GpsFixStatusFlags?: number;

  @Column({ type: "float", nullable: true })
  GpsHour?: number;

  @Column({ type: "float", nullable: true })
  GpsLatitude?: number;

  @Column({ type: "float", nullable: true })
  GpsLongitude?: number;

  @Column({ type: "float", nullable: true })
  GpsMinute?: number;

  @Column({ type: "float", nullable: true })
  GpsMonth?: number;

  @Column({ type: "float", nullable: true })
  GpsSecond?: number;

  @Column({ type: "float", nullable: true })
  GpsValidityFlags?: number;

  @Column({ type: "float", nullable: true })
  GpsYear?: number;

  @Column({ type: "float", nullable: true })
  MpuAccelerationX?: number;

  @Column({ type: "float", nullable: true })
  MpuAccelerationY?: number;

  @Column({ type: "float", nullable: true })
  MpuAccelerationZ?: number;

  @Column({ type: "float", nullable: true })
  MpuRotationX?: number;

  @Column({ type: "float", nullable: true })
  MpuRotationY?: number;

  @Column({ type: "float", nullable: true })
  MpuRotationZ?: number;

  @Column({ type: "float", nullable: true })
  MpuTemperature?: number;
}
