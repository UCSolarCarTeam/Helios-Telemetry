import * as t from "io-ts";

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

// the codec: smaller data types which make up the large io-ts type for incoming packets (ITelemetryDataType)
const IB3Type = t.exact(
  t.type({
    Acceleration: t.number,
    BrakeLightSignalOut: t.boolean,
    BrakeSwitch: t.boolean,
    DaytimeRunningLightSignalOut: t.boolean,
    ForwardIn: t.boolean,
    ForwardSwitchIn: t.boolean,
    HandbrakeSwitch: t.boolean,
    HazardLightsIn: t.boolean,
    HeadightsSwitchIn: t.boolean,
    HeadlightSignalOut: t.boolean,
    HornSignalOut: t.boolean,
    HornSwitchIn: t.boolean,
    Lap: t.boolean,
    LeftSignalIn: t.boolean,
    LeftSignalOut: t.boolean,
    MotorReset: t.boolean,
    Neutral: t.boolean,
    RaceMode: t.boolean,
    RegenBraking: t.number,
    Reverse: t.boolean,
    RightSignalIn: t.boolean,
    RightSignalOut: t.boolean,
    ZoomZoom: t.boolean,
  }),
);

const IBatteryCellType = t.exact(
  t.type({
    AverageCellVoltage: t.number,
    HighCellVoltage: t.number,
    HighCellVoltageId: t.number,
    LowCellVoltage: t.number,
    LowCellVoltageId: t.number,
    PopulatedCells: t.number,
  }),
);

const IBatteryFanType = t.exact(
  t.type({
    FanSpeed: t.number,
    FanVoltage: t.number,
    RequestedFanSpeed: t.number,
  }),
);

const IBatteryPackType = t.exact(
  t.type({
    Input12V: t.number,
    PackAmphours: t.number,
    PackCurrent: t.number,
    PackDepthOfDischarge: t.number,
    PackStateOfCharge: t.number,
    PackVoltage: t.number,
  }),
);

const IBatteryTemperatureType = t.exact(
  t.type({
    AverageTemperature: t.number,
    HighTemperature: t.number,
    InternalTemperature: t.number,
    LowTemperature: t.number,
  }),
);

const IBatteryFaultsWarningsType = t.exact(
  t.type({
    CclReducedDueToAlternateCurrentLimit: t.boolean,
    CclReducedDueToChargerLatch: t.boolean,
    CclReducedDueToHighCellResistance: t.boolean,
    CclReducedDueToHighCellVoltage: t.boolean,
    CclReducedDueToHighPackVoltage: t.boolean,
    CclReducedDueToHighSoc: t.boolean,
    CclReducedDueToTemperature: t.boolean,
    DclAndCclReducedDueToCommunicationFailsafe: t.boolean,
    DclAndCclReducedDueToVoltageFailsafe: t.boolean,
    DclReducedDueToHighCellResistance: t.boolean,
    DclReducedDueToLowCellVoltage: t.boolean,
    DclReducedDueToLowPackVoltage: t.boolean,
    DclReducedDueToLowSoc: t.boolean,
    DclReducedDueToTemperature: t.boolean,
  }),
);

const IBatteryFaultsErrorsType = t.exact(
  t.type({
    AlwaysOnSupplyFault: t.boolean,
    CanbusCommunicationFault: t.boolean,
    ChargeLimitEnforcementFault: t.boolean,
    ChargerSafetyRelayFault: t.boolean,
    CurrentSensorFault: t.boolean,
    DischargeLimitEnforcementFault: t.boolean,
    FanMonitorFault: t.boolean,
    HighVoltageIsolationFault: t.boolean,
    InternalCommunicationFault: t.boolean,
    InternalConversionFault: t.boolean,
    InternalLogicFault: t.boolean,
    InternalMemoryFault: t.boolean,
    InternalThermistorFault: t.boolean,
    LowCellVoltageFault: t.boolean,
    OpenWiringFault: t.boolean,
    PackVoltageSensorFault: t.boolean,
    PowerSupply12VFault: t.boolean,
    ThermistorFault: t.boolean,
    VoltageRedundancyFault: t.boolean,
    WeakCellFault: t.boolean,
    WeakPackFault: t.boolean,
  }),
);

const IBatteryType = t.exact(
  t.type({
    AlwaysOnSignalStatus: t.boolean,
    BatteryCell: IBatteryCellType,
    BatteryFan: IBatteryFanType,
    BatteryPack: IBatteryPackType,
    BatteryTemperature: IBatteryTemperatureType,
    BmuAlive: t.number,
    ChargeRelayEnabled: t.boolean,
    ChargerSafetyEnabled: t.boolean,
    DischargeRelayEnabled: t.boolean,
    HighThermistorId: t.number,
    IsChargingSignalStatus: t.boolean,
    IsReadySignalStatus: t.boolean,
    LowThermistorId: t.number,
    MalfunctionIndicatorActive: t.boolean,
    MultiPurposeInputSignalStatus: t.boolean,
  }),
);

const IBatteryFaultsType = t.exact(
  t.type({
    Errors: IBatteryFaultsErrorsType,
    Warnings: IBatteryFaultsWarningsType,
  }),
);

const IKeyMotorType = t.exact(
  t.type({
    ControlMode: t.boolean,
    DebugMode: t.boolean,
    MotorMode: t.boolean,
    MotorSetpoint: t.number,
    SoftwareEnable: t.boolean,
  }),
);

const IMbmsType = t.exact(
  t.type({
    AllowCharge: t.boolean,
    AllowDischarge: t.boolean,
    ArrayContactorError: t.boolean,
    ArrayContactorState: t.boolean,
    ArrayCurrent: t.number,
    ArrayHighTemperatureCurrentTrip: t.boolean,
    ArrayVoltage: t.number,
    AuxillaryBatteryVoltage: t.number,
    ChargeContactorError: t.boolean,
    ChargeContactorState: t.boolean,
    ChargeCurrent: t.number,
    ChargeHighTemperatureCurrentTrip: t.boolean,
    ChargeShouldTrip: t.boolean,
    ChargeVoltage: t.number,
    CommonContactorError: t.boolean,
    CommonContactorState: t.boolean,
    CommonCurrent: t.number,
    ContactorDisconnectedUnexpectedlyTrip: t.boolean,
    DischargeShouldTrip: t.boolean,
    HighCellVoltageTrip: t.boolean,
    HighCommonCurrentTrip: t.boolean,
    HighVoltageEnableState: t.boolean,
    LowCellVoltageTrip: t.boolean,
    LvContactorError: t.boolean,
    LvContactorState: t.boolean,
    LvCurrent: t.number,
    LvHighTemperatureCurrentTrip: t.boolean,
    LvVoltage: t.number,
    MotorContactorError: t.boolean,
    MotorContactorState: t.boolean,
    MotorCurrent: t.number,
    MotorHighTemperatureCurrentTrip: t.boolean,
    MotorVoltage: t.number,
    OrionCanReceivedRecently: t.boolean,
    OrionMessageTimeoutTrip: t.boolean,
    ProtectionTrip: t.boolean,
    StrobeBmsLight: t.boolean,
  }),
);

const IMPPTType = t.exact(
  t.type({
    ArrayCurrent: t.number,
    ArrayVoltage: t.number,
    BatteryVoltage: t.number,
    ChannelNumber: t.number,
    IsAlive: t.boolean,
    Temperature: t.number,
  }),
);

const IMotorErrorsType = t.exact(
  t.type({
    CanCommsTimeoutError: t.boolean,
    ControllerDataReadingTimeout: t.boolean,
    DcOvervoltageError: t.boolean,
    DcUndervoltageError: t.boolean,
    ErrorInDclinkCommunication: t.boolean,
    ErrorReadingEncoder: t.boolean,
    ErrorReadingTempSensor: t.boolean,
    InvalidHallSensorSequence: t.boolean,
    Inverter1FaultError: t.boolean,
    Inverter1OvercurrentError: t.boolean,
    Inverter2FaultError: t.boolean,
    Inverter2OvercurrentError: t.boolean,
    Inverter3FaultError: t.boolean,
    Inverter3OvercurrentError: t.boolean,
    Inverter4FaultError: t.boolean,
    Inverter4OvercurrentError: t.boolean,
    Inverter5FaultError: t.boolean,
    Inverter5OvercurrentError: t.boolean,
    Inverter6FaultError: t.boolean,
    Inverter6OvercurrentError: t.boolean,
    LostFramesOnCanBusError: t.boolean,
    OverspeedError: t.boolean,
    PositionSensorReadingError: t.boolean,
  }),
);

const IMotorWarningsType = t.exact(
  t.type({
    CanCommsTimeoutWarning: t.boolean,
    DcOvervoltageWarning: t.boolean,
    DcUndervoltageWarning: t.boolean,
    Inverter1FaultWarning: t.boolean,
    Inverter1OverCurrentWarning: t.boolean,
    Inverter2FaultWarning: t.boolean,
    Inverter2OverCurrentWarning: t.boolean,
    Inverter3FaultWarning: t.boolean,
    Inverter3OverCurrentWarning: t.boolean,
    Inverter4FaultWarning: t.boolean,
    Inverter4OverCurrentWarning: t.boolean,
    Inverter5FaultWarning: t.boolean,
    Inverter5OverCurrentWarning: t.boolean,
    Inverter6FaultWarning: t.boolean,
    Inverter6OverCurrentWarning: t.boolean,
    LostFramesOnCanBusWarning: t.boolean,
    OverspeedWarning: t.boolean,
  }),
);

const IMotorDetailsType = t.exact(
  t.type({
    AbsoluteAngle: t.number,
    CanSendError: t.boolean,
    CanSendWarning: t.boolean,
    ControlMode: t.boolean,
    ControlValue: t.number,
    CpuOverload: t.boolean,
    CpuTempTooHigh: t.boolean,
    CpuTemperatureVeryHigh: t.boolean,
    CurrentMotorPower: t.number,
    CurrentMotorTorque: t.number,
    CurrentRpmValue: t.number,
    DclinkTempTooHigh: t.boolean,
    DclinkTemperatureVeryHigh: t.boolean,
    DebugMode: t.boolean,
    DelayInDclinkCommunication: t.boolean,
    DelayInReadingPosSensor: t.boolean,
    DelayInReadingTempSensor: t.boolean,
    DoubleCanIdOnBus: t.boolean,
    HallTempTooHigh: t.boolean,
    HallTemperatureVeryHigh: t.boolean,
    HwEnableNotSet: t.boolean,
    InitError: t.boolean,
    InvalidHallSector: t.boolean,
    Inverter1TempTooHigh: t.boolean,
    Inverter1TempVeryHigh: t.boolean,
    Inverter2TempTooHigh: t.boolean,
    Inverter2TempVeryHigh: t.boolean,
    Inverter3TempTooHigh: t.boolean,
    Inverter3TempVeryHigh: t.boolean,
    Inverter4TempTooHigh: t.boolean,
    Inverter4TempVeryHigh: t.boolean,
    Inverter5TempTooHigh: t.boolean,
    Inverter5TempVeryHigh: t.boolean,
    Inverter6TempTooHigh: t.boolean,
    Inverter6TempVeryHigh: t.boolean,
    InverterPeakCurrent: t.number,
    MotorAboutToStall: t.boolean,
    MotorErrors: IMotorErrorsType,
    MotorMode: t.boolean,
    MotorStalled: t.boolean,
    MotorTemperature: t.number,
    MotorWarnings: IMotorWarningsType,
    SettingsNotFound: t.boolean,
    SoftwareEnable: t.boolean,
    StartAtHighRpm: t.boolean,
    TorqueLimited: t.boolean,
    ZeroPositionOffsetNotSet: t.boolean,
  }),
);

const IProximitySensorsType = t.exact(
  t.type({
    ProximitySensor1: t.number,
    ProximitySensor2: t.number,
    ProximitySensor3: t.number,
    ProximitySensor4: t.number,
  }),
);

const ITelemetryType = t.exact(
  t.type({
    GpsAdditionalFlags: t.number,
    GpsDay: t.number,
    GpsFixStatusFlags: t.number,
    GpsHour: t.number,
    GpsLatitude: t.number,
    GpsLongitude: t.number,
    GpsMinute: t.number,
    GpsMonth: t.number,
    GpsSecond: t.number,
    GpsValidityFlags: t.number,
    GpsYear: t.number,
    MpuAccelerationX: t.number,
    MpuAccelerationY: t.number,
    MpuAccelerationZ: t.number,
    MpuRotationX: t.number,
    MpuRotationY: t.number,
    MpuRotationZ: t.number,
    MpuTemperature: t.number,
  }),
);

export const ITelemetryDataType = t.exact(
  t.type({
    B3: IB3Type,
    Battery: IBatteryType,
    BatteryFaults: IBatteryFaultsType,
    KeyMotor: IKeyMotorType,
    MBMS: IMbmsType,
    MPPT0: IMPPTType,
    MPPT1: IMPPTType,
    MPPT2: IMPPTType,
    MPPT3: IMPPTType,
    MotorDetails0: IMotorDetailsType,
    MotorDetails1: IMotorDetailsType,
    Pi: t.exact(
      t.type({
        rfid: t.number,
      }),
    ),
    ProximitySensors: IProximitySensorsType,
    Telemetry: ITelemetryType,
    TimeStamp: t.number,
    Title: t.string,
  }),
);

export type ITelemetryData = t.TypeOf<typeof ITelemetryDataType>;

//old data type definitions
export interface IDriverData {
  driver: string;
  rfid: string;
}

export interface ILapData {
  data: {
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
  };
  rfid: number;
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
  BatteryCell: IBatteryCell;
  BatteryFan: IBatteryFan;
  BatteryPack: IBatteryPack;
  BatteryTemperature: IBatteryTemperature;
  BmuAlive: number;
  ChargeRelayEnabled: boolean;
  ChargerSafetyEnabled: boolean;
  DischargeRelayEnabled: boolean;
  HighThermistorId: number;
  IsChargingSignalStatus: boolean;
  IsReadySignalStatus: boolean;
  LowThermistorId: number;
  MalfunctionIndicatorActive: boolean;
  MultiPurposeInputSignalStatus: boolean;
}

export interface IBatteryCell {
  AverageCellVoltage: number;
  HighCellVoltage: number;
  HighCellVoltageId: number;
  LowCellVoltage: number;
  LowCellVoltageId: number;
  PopulatedCells: number;
}

export interface IBatteryFan {
  FanSpeed: number;
  FanVoltage: number;
  RequestedFanSpeed: number;
}

export interface IBatteryPack {
  Input12V: number;
  PackAmphours: number;
  PackCurrent: number;
  PackDepthOfDischarge: number;
  PackStateOfCharge: number;
  PackVoltage: number;
}

export interface IBatteryTemperature {
  LowTemperature: number;
  AverageTemperature: number;
  InternalTemperature: number;
  HighTemperature: number;
}

export interface IBatteryFaults {
  Warnings: IBatteryFaultsWarnings;
  Errors: IBatteryFaultsErrors;
}

export interface IBatteryFaultsErrors {
  AlwaysOnSupplyFault: boolean;
  CanbusCommunicationFault: boolean;
  ChargeLimitEnforcementFault: boolean;
  ChargerSafetyRelayFault: boolean;
  CurrentSensorFault: boolean;
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

export interface IBatteryFaultsWarnings {
  CclReducedDueToAlternateCurrentLimit: boolean;
  CclReducedDueToChargerLatch: boolean;
  CclReducedDueToHighCellResistance: boolean;
  CclReducedDueToHighCellVoltage: boolean;
  CclReducedDueToHighPackVoltage: boolean;
  CclReducedDueToHighSoc: boolean;
  CclReducedDueToTemperature: boolean;
  DclAndCclReducedDueToCommunicationFailsafe: boolean;
  DclAndCclReducedDueToVoltageFailsafe: boolean;
  DclReducedDueToHighCellResistance: boolean;
  DclReducedDueToLowCellVoltage: boolean;
  DclReducedDueToLowPackVoltage: boolean;
  DclReducedDueToLowSoc: boolean;
  DclReducedDueToTemperature: boolean;
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
  IsAlive: boolean;
  Temperature: number;
}

export interface IMotorDetails {
  AbsoluteAngle: number;
  CanSendError: boolean;
  CanSendWarning: boolean;
  ControlMode: boolean;
  ControlValue: number;
  CpuOverload: boolean;
  CpuTempTooHigh: boolean;
  CpuTemperatureVeryHigh: boolean;
  CurrentMotorPower: number;
  CurrentMotorTorque: number;
  CurrentRpmValue: number;
  DclinkTempTooHigh: boolean;
  DclinkTemperatureVeryHigh: boolean;
  DebugMode: boolean;
  DelayInDclinkCommunication: boolean;
  DelayInReadingPosSensor: boolean;
  DelayInReadingTempSensor: boolean;
  DoubleCanIdOnBus: boolean;
  HallTempTooHigh: boolean;
  HallTemperatureVeryHigh: boolean;
  HwEnableNotSet: boolean;
  InitError: boolean;
  InvalidHallSector: boolean;
  Inverter1TempTooHigh: boolean;
  Inverter1TempVeryHigh: boolean;
  Inverter2TempTooHigh: boolean;
  Inverter2TempVeryHigh: boolean;
  Inverter3TempTooHigh: boolean;
  Inverter3TempVeryHigh: boolean;
  Inverter4TempTooHigh: boolean;
  Inverter4TempVeryHigh: boolean;
  Inverter5TempTooHigh: boolean;
  Inverter5TempVeryHigh: boolean;
  Inverter6TempTooHigh: boolean;
  Inverter6TempVeryHigh: boolean;
  InverterPeakCurrent: number;
  MotorAboutToStall: boolean;
  MotorErrors: IMotorErrors;
  MotorWarnings: IMotorWarnings;
  MotorMode: boolean;
  MotorStalled: boolean;
  MotorTemperature: number;
  SettingsNotFound: boolean;
  SoftwareEnable: boolean;
  StartAtHighRpm: boolean;
  TorqueLimited: boolean;
  ZeroPositionOffsetNotSet: boolean;
}

export interface IMotorErrors {
  CanCommsTimeoutError: boolean;
  ControllerDataReadingTimeout: boolean;
  DcOvervoltageError: boolean;
  ErrorInDclinkCommunication: boolean;
  ErrorReadingEncoder: boolean;
  ErrorReadingTempSensor: boolean;
  DcUndervoltageError: boolean;
  InvalidHallSensorSequence: boolean;
  Inverter1FaultError: boolean;
  Inverter1OvercurrentError: boolean;
  Inverter2FaultError: boolean;
  Inverter2OvercurrentError: boolean;
  Inverter3FaultError: boolean;
  Inverter3OvercurrentError: boolean;
  Inverter4FaultError: boolean;
  Inverter4OvercurrentError: boolean;
  Inverter5FaultError: boolean;
  Inverter5OvercurrentError: boolean;
  Inverter6FaultError: boolean;
  Inverter6OvercurrentError: boolean;
  LostFramesOnCanBusError: boolean;
  OverspeedError: boolean;
  PositionSensorReadingError: boolean;
}

export interface IMotorWarnings {
  CanCommsTimeoutWarning: boolean;
  DcOvervoltageWarning: boolean;
  DcUndervoltageWarning: boolean;
  Inverter1OverCurrentWarning: boolean;
  Inverter1FaultWarning: boolean;
  Inverter2FaultWarning: boolean;
  Inverter2OverCurrentWarning: boolean;
  Inverter3FaultWarning: boolean;
  Inverter3OverCurrentWarning: boolean;
  Inverter4FaultWarning: boolean;
  Inverter4OverCurrentWarning: boolean;
  Inverter5FaultWarning: boolean;
  Inverter6FaultWarning: boolean;
  Inverter5OverCurrentWarning: boolean;
  Inverter6OverCurrentWarning: boolean;
  LostFramesOnCanBusWarning: boolean;
  OverspeedWarning: boolean;
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
export interface IFormattedLapData {
  data: {
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
  };
  rfid: number;
}
