export type CoordUpdateResponse =
  | Coords
  | {
      error?: string;
      invalidFields?: Array<keyof CoordInfoUpdate>;
    };

export interface Coords {
  lat: number;
  long: number;
}

export interface CoordInfoUpdate {
  lat: string;
  long: string;
  password: string;
}

enum Motor {
  RightMotor = 1,
  LeftMotor = 0,
}

export interface ITelemetryData {
  Pi: IPi;
  B3: IB3;
  Battery: IBattery;
  BatteryFaults: IBatteryFaults;
  KeyMotor: IKeyMotor;
  MBMS: IMbms;
  MPPT: IMPPT[];
  MotorDetails: IMotorDetails[];
  ProximitySensors: IProximitySensors;
  Telemetry: ITelemetry;
  TimeStamp: string;
  Title: string;
}

export interface ILapData {
  ampHours: number;
  averagePackCurrent: number;
  averageSpeed: number;
  batterySecondsRemaining: number;
  distance: number;
  lapTime: number;
  netPowerOut: number;
  timeStamp: number;
  totalPowerIn: number;
  totalPowerOut: number;
}

export class LapData {
  constructor(
    timestamp: number,
    lapTime: number,
    totalPowerIn: number,
    totalPowerOut: number,
    netPowerOut: number,
    distance: number,
    amphours: number,
    averagePackCurrent: number,
    batterySecondsRemaining: number,
    averageSpeed: number,
  ) {
    this.timestamp = timestamp;
    this.lapTime = lapTime;
    this.totalPowerIn = totalPowerIn;
    this.totalPowerOut = totalPowerOut;
    this.netPowerOut = netPowerOut;
    this.distance = distance;
    this.amphours = amphours;
    this.averagePackCurrent = averagePackCurrent;
    this.batterySecondsRemaining = batterySecondsRemaining;
    this.averageSpeed = averageSpeed;
  }

  lapNumber = -1;
  timestamp = -1;
  lapTime = -1;
  totalPowerIn = -1;
  totalPowerOut = -1;
  netPowerOut = -1;
  distance = -1;
  amphours = -1;
  averagePackCurrent = -1;
  batterySecondsRemaining = -1;
  lapsRemaining = -1;
  averageSpeed = -1;
}

export interface IPi {
  rfid: number;
}

export interface IB3 {
  Acceleration: number;
  BrakeLightSignalOut: boolean;
  BrakeSwitch: boolean;
  DaytimeRunningLightSignalOut: boolean;
  ForwardIn: boolean;
  ForwardSwitchIn: boolean;
  HandbrakeSwitch: boolean;
  HazardLightsIn: boolean;
  HeadightsSwitchIn: boolean;
  HeadlightSignalOut: boolean;
  HornSignalOut: boolean;
  HornSwitchIn: boolean;
  Lap: boolean;
  LeftSignalIn: boolean;
  LeftSignalOut: boolean;
  MotorReset: boolean;
  Neutral: boolean;
  RaceMode: boolean;
  RegenBraking: number;
  Reverse: boolean;
  RightSignalIn: boolean;
  RightSignalOut: boolean;
  ZoomZoom: boolean;
}

export interface IBattery {
  AlwaysOnSignalStatus: boolean;
  AverageCellVoltage: number;
  AverageTemperature: number;
  BmuAlive: number;
  ChargeRelayEnabled: boolean;
  ChargerSafetyEnabled: boolean;
  DischargeRelayEnabled: boolean;
  FanSpeed: number;
  FanVoltage: number;
  HighCellVoltage: number;
  HighCellVoltageId: number;
  HighTemperature: number;
  HighThermistorId: number;
  Input12V: number;
  InternalTemperature: number;
  IsChargingSignalStatus: boolean;
  IsReadySignalStatus: boolean;
  LowCellVoltage: number;
  LowCellVoltageId: number;
  LowTemperature: number;
  LowThermistorId: number;
  MalfunctionIndicatorActive: boolean;
  MultiPurposeInputSignalStatus: boolean;
  PackAmphours: number;
  PackCurrent: number;
  PackDepthOfDischarge: number;
  PackStateOfCharge: number;
  PackVoltage: number;
  PopulatedCells: number;
  RequestedFanSpeed: number;
}

export interface IBatteryFaults {
  AlwaysOnSupplyFault: boolean;
  CanbusCommunicationFault: boolean;
  CclReducedDueToAlternateCurrentLimit: boolean;
  CclReducedDueToChargerLatch: boolean;
  CclReducedDueToHighCellResistance: boolean;
  CclReducedDueToHighCellVoltage: boolean;
  CclReducedDueToHighPackVoltage: boolean;
  CclReducedDueToHighSoc: boolean;
  CclReducedDueToTemperature: boolean;
  ChargeLimitEnforcementFault: boolean;
  ChargerSafetyRelayFault: boolean;
  CurrentSensorFault: boolean;
  DclAndCclReducedDueToCommunicationFailsafe: boolean;
  DclAndCclReducedDueToVoltageFailsafe: boolean;
  DclReducedDueToHighCellResistance: boolean;
  DclReducedDueToLowCellVoltage: boolean;
  DclReducedDueToLowPackVoltage: boolean;
  DclReducedDueToLowSoc: boolean;
  DclReducedDueToTemperature: boolean;
  DischargeLimitEnforcementFault: boolean;
  FanMonitorFault: boolean;
  HighVoltageIsolationFault: boolean;
  InternalCommunicationFault: boolean;
  InternalConversionFault: boolean;
  InternalLogicFault: boolean;
  InternalMemoryFault: boolean;
  InternalThermistorFault: boolean;
  LowCellVoltageFault: boolean;
  OpenWiringFault: boolean;
  PackVoltageSensorFault: boolean;
  PowerSupply12VFault: boolean;
  ThermistorFault: boolean;
  VoltageRedundancyFault: boolean;
  WeakCellFault: boolean;
  WeakPackFault: boolean;
}

export interface IKeyMotor {
  ControlMode: boolean;
  DebugMode: boolean;
  MotorMode: boolean;
  MotorSetpoint: number;
  SoftwareEnable: boolean;
}

export interface IMbms {
  AllowCharge: boolean;
  AllowDischarge: boolean;
  ArrayContactorError: boolean;
  ArrayContactorState: boolean;
  ArrayCurrent: number;
  ArrayHighTemperatureCurrentTrip: boolean;
  ArrayVoltage: number;
  AuxillaryBatteryVoltage: number;
  ChargeContactorError: boolean;
  ChargeContactorState: boolean;
  ChargeCurrent: number;
  ChargeHighTemperatureCurrentTrip: boolean;
  ChargeShouldTrip: boolean;
  ChargeVoltage: number;
  CommonContactorError: boolean;
  CommonContactorState: boolean;
  CommonCurrent: number;
  ContactorDisconnectedUnexpectedlyTrip: boolean;
  DischargeShouldTrip: boolean;
  HighCellVoltageTrip: boolean;
  HighCommonCurrentTrip: boolean;
  HighVoltageEnableState: boolean;
  LowCellVoltageTrip: boolean;
  LvContactorError: boolean;
  LvContactorState: boolean;
  LvCurrent: number;
  LvHighTemperatureCurrentTrip: boolean;
  LvVoltage: number;
  MotorContactorError: boolean;
  MotorContactorState: boolean;
  MotorCurrent: number;
  MotorHighTemperatureCurrentTrip: boolean;
  MotorVoltage: number;
  OrionCanReceivedRecently: boolean;
  OrionMessageTimeoutTrip: boolean;
  ProtectionTrip: boolean;
  StrobeBmsLight: boolean;
}

export interface IMPPT {
  ArrayCurrent: number;
  ArrayVoltage: number;
  BatteryVoltage: number;
  ChannelNumber: number;
  IsAlive: number;
  Temperature: number;
}

export interface IMotorDetails {
  AbsoluteAngle: number;
  CanCommsTimeoutError: boolean;
  CanCommsTimeoutWarning: boolean;
  CanSendError: boolean;
  CanSendWarning: boolean;
  ControlMode: boolean;
  ControlValue: number;
  ControllerDataReadingTimeout: boolean;
  CpuOverload: boolean;
  CpuTempTooHigh: boolean;
  CpuTemperatureVeryHigh: boolean;
  CurrentMotorPower: number;
  CurrentMotorTorque: number;
  CurrentRpmValue: number;
  DcOvervoltageError: boolean;
  DcOvervoltageWarning: boolean;
  DcUndervoltageError: boolean;
  DcUndervoltageWarning: boolean;
  DclinkTempTooHigh: boolean;
  DclinkTemperatureVeryHigh: boolean;
  DebugMode: boolean;
  DelayInDclinkCommunication: boolean;
  DelayInReadingPosSensor: boolean;
  DelayInReadingTempSensor: boolean;
  DoubleCanIdOnBus: boolean;
  ErrorInDclinkCommunication: boolean;
  ErrorReadingEncoder: boolean;
  ErrorReadingTempSensor: boolean;
  HallTempTooHigh: boolean;
  HallTemperatureVeryHigh: boolean;
  HwEnableNotSet: boolean;
  InitError: boolean;
  InvalidHallSector: boolean;
  InvalidHallSensorSequence: boolean;
  Inverter1FaultError: boolean;
  Inverter1FaultWarning: boolean;
  Inverter1OverCurrentWarning: boolean;
  Inverter1OvercurrentError: boolean;
  Inverter1TempTooHigh: boolean;
  Inverter1TempVeryHigh: boolean;
  Inverter2FaultError: boolean;
  Inverter2FaultWarning: boolean;
  Inverter2OverCurrentWarning: boolean;
  Inverter2OvercurrentError: boolean;
  Inverter2TempTooHigh: boolean;
  Inverter2TempVeryHigh: boolean;
  Inverter3FaultError: boolean;
  Inverter3FaultWarning: boolean;
  Inverter3OverCurrentWarning: boolean;
  Inverter3OvercurrentError: boolean;
  Inverter3TempTooHigh: boolean;
  Inverter3TempVeryHigh: boolean;
  Inverter4FaultError: boolean;
  Inverter4FaultWarning: boolean;
  Inverter4OverCurrentWarning: boolean;
  Inverter4OvercurrentError: boolean;
  Inverter4TempTooHigh: boolean;
  Inverter4TempVeryHigh: boolean;
  Inverter5FaultError: boolean;
  Inverter5FaultWarning: boolean;
  Inverter5OverCurrentWarning: boolean;
  Inverter5OvercurrentError: boolean;
  Inverter5TempTooHigh: boolean;
  Inverter5TempVeryHigh: boolean;
  Inverter6FaultError: boolean;
  Inverter6FaultWarning: boolean;
  Inverter6OverCurrentWarning: boolean;
  Inverter6OvercurrentError: boolean;
  Inverter6TempTooHigh: boolean;
  Inverter6TempVeryHigh: boolean;
  InverterPeakCurrent: number;
  LostFramesOnCanBusError: boolean;
  LostFramesOnCanBusWarning: boolean;
  MotorAboutToStall: boolean;
  MotorMode: boolean;
  MotorStalled: boolean;
  MotorTemperature: number;
  OverspeedError: boolean;
  OverspeedWarning: boolean;
  PositionSensorReadingError: boolean;
  SettingsNotFound: boolean;
  SoftwareEnable: boolean;
  StartAtHighRpm: boolean;
  TorqueLimited: boolean;
  ZeroPositionOffsetNotSet: boolean;
}

export interface IProximitySensors {
  ProximitySensor1: number;
  ProximitySensor2: number;
  ProximitySensor3: number;
  ProximitySensor4: number;
}

export interface ITelemetry {
  GpsAdditionalFlags: number;
  GpsDay: number;
  GpsFixStatusFlags: number;
  GpsHour: number;
  GpsLatitude: number;
  GpsLongitude: number;
  GpsMinute: number;
  GpsMonth: number;
  GpsSecond: number;
  GpsValidityFlags: number;
  GpsYear: number;
  MpuAccelerationX: number;
  MpuAccelerationY: number;
  MpuAccelerationZ: number;
  MpuRotationX: number;
  MpuRotationY: number;
  MpuRotationZ: number;
  MpuTemperature: number;
}
