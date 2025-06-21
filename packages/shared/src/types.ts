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

export interface IDriverNameUpdate {
  name: string;
  Rfid: string;
}

enum Motor {
  RightMotor = 1,
  LeftMotor = 0,
}

const IContactorType = t.type({
  ArrayBPSError: t.boolean,
  ArrayChargeCurrent: t.Integer,
  ArrayContactorClosed: t.boolean,
  ArrayContactorClosing: t.boolean,
  ArrayContactorError: t.boolean,
  ArrayHeartbeat: t.boolean,
  ArrayLineCurrent: t.Integer,
  ArrayPrechargerClosed: t.boolean,
  ArrayPrechargerClosing: t.boolean,
  ArrayPrechargerError: t.boolean,
  ChargeBPSError: t.boolean,
  ChargeChargeCurrent: t.Integer,
  ChargeContactorClosed: t.boolean,
  ChargeContactorClosing: t.boolean,
  ChargeContactorError: t.boolean,
  ChargeHeartbeat: t.boolean,
  ChargeLineCurrent: t.Integer,
  ChargePrechargerClosed: t.boolean,
  ChargePrechargerClosing: t.boolean,
  ChargePrechargerError: t.boolean,
  CommonChargeCurrent: t.Integer,
  CommonContactorClosed: t.boolean,
  CommonContactorClosing: t.boolean,
  CommonContactorError: t.boolean,
  CommonContactorOpeningError: t.boolean,
  CommonHeartbeat: t.boolean,
  CommonLineCurrent: t.Integer,
  CommonPrechargerClosed: t.boolean,
  CommonPrechargerClosing: t.boolean,
  CommonPrechargerError: t.boolean,
  LvBpsError: t.boolean,
  LvChargeCurrent: t.Integer,
  LvContactorClosed: t.boolean,
  LvContactorClosing: t.boolean,
  LvContactorError: t.boolean,
  LvHeartbeat: t.boolean,
  LvLineCurrent: t.Integer,
  LvPrechargerClosed: t.boolean,
  LvPrechargerClosing: t.boolean,
  LvPrechargerError: t.boolean,
  MotorBPSError: t.boolean,
  MotorChargeCurrent: t.Integer,
  MotorContactorClosed: t.boolean,
  MotorContactorClosing: t.boolean,
  MotorContactorError: t.boolean,
  MotorHeartbeat: t.boolean,
  MotorLineCurrent: t.Integer,
  MotorPrechargerClosed: t.boolean,
  MotorPrechargerClosing: t.boolean,
  MotorPrechargerError: t.boolean,
});

const IBatteryType = t.type({
  AlwaysOnSignalStatus: t.boolean,
  AverageCellVoltage: t.Integer,
  AverageTemperature: t.Integer,
  BmuAlive: t.Integer,
  ChargeRelayEnabled: t.boolean,
  ChargerSafetyEnabled: t.boolean,
  DischargeRelayEnabled: t.boolean,
  FanSpeed: t.Integer,
  FanVoltage: t.Integer,
  HighCellVoltage: t.Integer,
  HighCellVoltageId: t.Integer,
  HighTemperature: t.Integer,
  HighThermistorId: t.Integer,
  Input12V: t.Integer,
  InternalTemperature: t.Integer,
  IsChargingSignalStatus: t.boolean,
  IsReadySignalStatus: t.boolean,
  LowCellVoltage: t.Integer,
  LowCellVoltageId: t.Integer,
  LowTemperature: t.Integer,
  LowThermistorId: t.Integer,
  MalfunctionIndicatorActive: t.boolean,
  MaximumCellVoltage: t.Integer,
  MaximumPackVoltage: t.Integer,
  MinimumCellVoltage: t.Integer,
  MinimumPackVoltage: t.Integer,
  MultiPurposeInputSignalStatus: t.boolean,
  PackAmphours: t.Integer,
  PackCurrent: t.Integer,
  PackDepthOfDischarge: t.Integer,
  PackStateOfCharge: t.Integer,
  PackVoltage: t.Integer,
  PopulatedCells: t.Integer,
  RequestedFanSpeed: t.Integer,
});

const IBatteryFaultErrorsType = t.type({
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
});

const IBatteryFaultWarningsType = t.type({
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
});

const IBatteryFaultsType = t.type({
  Errors: IBatteryFaultErrorsType,
  Warnings: IBatteryFaultWarningsType,
});

const IB3Type = t.type({
  Acceleration: t.Integer,
  B3Heartbeat: t.boolean,
  BrakeLightSignalStatus: t.boolean,
  BrakeSwitchDigital: t.boolean,
  DaytimeRunningLightSignalStatus: t.boolean,
  ForwardDigital: t.boolean,
  HandbrakeSwitchDigital: t.boolean,
  HazardLightsInput: t.boolean,
  HeadightsSwitchInput: t.boolean,
  HeadlightSignalStatus: t.boolean,
  HornSignalStatus: t.boolean,
  HornSwitchDigital: t.boolean,
  LapDigital: t.boolean,
  LeftSignalInput: t.boolean,
  LeftSignalStatus: t.boolean,
  MotorResetDigital: t.boolean,
  NeutralDigital: t.boolean,
  RaceModeDigital: t.boolean,
  RegenBraking: t.Integer,
  ReverseDigital: t.boolean,
  RightSignalInput: t.boolean,
  RightSignalStatus: t.boolean,
});

const IKeyMotorType = t.type({
  BusCurrentOut: t.Integer,
  KeyMotorVelocity: t.Integer,
  MotorCurrent: t.Integer,
});

const IMBMSType = t.type({
  AbattDisable: t.boolean,
  ArrayContactorCommand: t.boolean,
  ArrayHeartbeatDeadTrip: t.boolean,
  ArrayHighCurrentTrip: t.boolean,
  ArrayHighCurrentWarning: t.boolean,
  AuxiliaryBatteryVoltage: t.Integer,
  CanOc12VWarning: t.boolean,
  ChargeContactorCommand: t.boolean,
  ChargeEnable: t.boolean,
  ChargeHeartbeatDeadTrip: t.boolean,
  ChargeHighCurrentTrip: t.boolean,
  ChargeHighCurrentWarning: t.boolean,
  ChargeSafety: t.boolean,
  ChargeShouldTrip: t.boolean,
  ChgFault: t.boolean,
  ChgLvEn: t.boolean,
  ChgOn: t.boolean,
  CommonContactorCommand: t.boolean,
  CommonHeartbeatDeadTrip: t.boolean,
  CommonHighCurrentTrip: t.boolean,
  CommonHighCurrentWarning: t.boolean,
  ContactorConnectedUnexpectedlyTrip: t.boolean,
  ContactorDisconnectedUnexpectedlyTrip: t.boolean,
  DcdcFault: t.boolean,
  DcdcOn: t.boolean,
  DischargeEnable: t.boolean,
  DischargeShouldTrip: t.boolean,
  En1: t.boolean,
  EsdEnabledTrip: t.boolean,
  ExternalShutdown: t.boolean,
  Heartbeat: t.boolean,
  HighCellVoltageTrip: t.boolean,
  HighCellVoltageWarning: t.boolean,
  HighTemperatureTrip: t.boolean,
  HighTemperatureWarning: t.boolean,
  Key: t.boolean,
  LowCellVoltageTrip: t.boolean,
  LowCellVoltageWarning: t.boolean,
  LowTemperatureTrip: t.boolean,
  LowTemperatureWarning: t.boolean,
  LvContactorCommand: t.boolean,
  LvHeartbeatDeadTrip: t.boolean,
  LvHighCurrentTrip: t.boolean,
  LvHighCurrentWarning: t.boolean,
  MainPowerSwitch: t.boolean,
  MotorContactorCommand: t.boolean,
  MotorHeartbeatDeadTrip: t.boolean,
  MotorHighCurrentTrip: t.boolean,
  MotorHighCurrentWarning: t.boolean,
  MpsDisabledTrip: t.boolean,
  OrionCanReceivedRecently: t.boolean,
  OrionMessageTimeoutTrip: t.boolean,
  ProtectionTrip: t.boolean,
  StartupState: t.Integer,
  StrobeBmsLight: t.boolean,
  SystemState: t.Integer,
  ThreeAOc: t.boolean,
});

const IMotorDetails0Type = t.type({
  ActiveMotor: t.Integer,
  BEMF_D: t.Integer,
  BEMF_Q: t.Integer,
  BusCurrent: t.Integer,
  BusVoltage: t.Integer,
  DC_Bus_Ah: t.Integer,
  DspBoardTemperature: t.Integer,
  ErrorFlags: t.Integer,
  HeatsinkTemperature: t.Integer,
  Id: t.Integer,
  Iq: t.Integer,
  LimitFlags: t.Integer,
  MotorId: t.Integer,
  MotorTemperature: t.Integer,
  MotorVelocity: t.Integer,
  Odometer: t.Integer,
  PhaseCurrentB: t.Integer,
  PhaseCurrentC: t.Integer,
  RxErrorCount: t.Integer,
  SerialNumber: t.Integer,
  SlipSpeed: t.Integer,
  Supply15V: t.Integer,
  Supply1V9: t.Integer,
  Supply3V3: t.Integer,
  TritiumId: t.Integer,
  TxErrorCount: t.Integer,
  Vd: t.Integer,
  VehicleVelocity: t.Integer,
  Vq: t.Integer,
});

const IMPPTType = t.type({
  Mppt0Ch0ArrayCurrent: t.Integer,
  Mppt0Ch0ArrayVoltage: t.Integer,
  Mppt0Ch0BatteryVoltage: t.Integer,
  Mppt0Ch0UnitTemperature: t.Integer,
  Mppt0Ch1ArrayCurrent: t.Integer,
  Mppt0Ch1ArrayVoltage: t.Integer,
  Mppt0Ch1BatteryVoltage: t.Integer,
  Mppt0Ch1UnitTemperature: t.Integer,
  Mppt1Ch0ArrayCurrent: t.Integer,
  Mppt1Ch0ArrayVoltage: t.Integer,
  Mppt1Ch0BatteryVoltage: t.Integer,
  Mppt1Ch0UnitTemperature: t.Integer,
  Mppt1Ch1ArrayCurrent: t.Integer,
  Mppt1Ch1ArrayVoltage: t.Integer,
  Mppt1Ch1BatteryVoltage: t.Integer,
  Mppt1Ch1UnitTemperature: t.Integer,
  Mppt2Ch0ArrayCurrent: t.Integer,
  Mppt2Ch0ArrayVoltage: t.Integer,
  Mppt2Ch0BatteryVoltage: t.Integer,
  Mppt2Ch0UnitTemperature: t.Integer,
  Mppt2Ch1ArrayCurrent: t.Integer,
  Mppt2Ch1ArrayVoltage: t.Integer,
  Mppt2Ch1BatteryVoltage: t.Integer,
  Mppt2Ch1UnitTemperature: t.Integer,
  Mppt3Ch0ArrayCurrent: t.Integer,
  Mppt3Ch0ArrayVoltage: t.Integer,
  Mppt3Ch0BatteryVoltage: t.Integer,
  Mppt3Ch0UnitTemperature: t.Integer,
  Mppt3Ch1ArrayCurrent: t.Integer,
  Mppt3Ch1ArrayVoltage: t.Integer,
  Mppt3Ch1BatteryVoltage: t.Integer,
  Mppt3Ch1UnitTemperature: t.Integer,
});

const IPiType = t.type({
  Rfid: t.string,
});

const IProximitySensorsType = t.type({
  ProximitySensor1: t.Integer,
  ProximitySensor2: t.Integer,
  ProximitySensor3: t.Integer,
  ProximitySensor4: t.Integer,
});

const ITelemetryType = t.type({
  GpsAdditionalFlags: t.Integer,
  GpsDay: t.Integer,
  GpsFixStatusFlags: t.Integer,
  GpsHour: t.Integer,
  GpsLatitude: t.Integer,
  GpsLongitude: t.Integer,
  GpsMinute: t.Integer,
  GpsMonth: t.Integer,
  GpsSecond: t.Integer,
  GpsValidityFlags: t.Integer,
  GpsYear: t.Integer,
  MpuAccelerationX: t.Integer,
  MpuAccelerationY: t.Integer,
  MpuAccelerationZ: t.Integer,
  MpuRotationX: t.Integer,
  MpuRotationY: t.Integer,
  MpuRotationZ: t.Integer,
  MpuTemperature: t.Integer,
});

const ITelemetryDataType = t.type({
  Contactor: IContactorType,
  IB3: IB3Type,
  IBattery: IBatteryType,
  IBatteryFaults: IBatteryFaultsType,
  KeyMotor: IKeyMotorType,
  MBMS: IMBMSType,
  MPPT: IMPPTType,
  MotorDetails0: IMotorDetails0Type,
  MotorDetails1: IMotorDetails0Type,
  Pi: IPiType,
  ProximitySensors: IProximitySensorsType,
  Telemetry: ITelemetryType,
  TimeStamp: t.Integer,
  Title: t.string,
});
// the codec: smaller data types which make up the large io-ts type for incoming packets (ITelemetryDataType)
export type ITelemetryData = t.TypeOf<typeof ITelemetryDataType>;
export type IContactor = t.TypeOf<typeof IContactorType>;
export type IBattery = t.TypeOf<typeof IBatteryType>;
export type IBatteryFaults = t.TypeOf<typeof IBatteryFaultsType>;
export type IBatteryFaultErrors = t.TypeOf<typeof IBatteryFaultErrorsType>;
export type IBatteryFaultWarnings = t.TypeOf<typeof IBatteryFaultWarningsType>;
export type IB3 = t.TypeOf<typeof IB3Type>;
export type IKeyMotor = t.TypeOf<typeof IKeyMotorType>;
export type IMBMS = t.TypeOf<typeof IMBMSType>;
export type IMotorDetails0 = t.TypeOf<typeof IMotorDetails0Type>;
export type IMPPT = t.TypeOf<typeof IMPPTType>;
export type IPi = t.TypeOf<typeof IPiType>;
export type IProximitySensors = t.TypeOf<typeof IProximitySensorsType>;
export type ITelemetry = t.TypeOf<typeof ITelemetryType>;
// the codec: large io-ts type for incoming packets (ITelemetryDataType)

//old data type definitions
export interface IDriverData {
  driver: string;
  Rfid: string;
}

export interface ILapData {
  data: {
    ampHours: number;
    averagePackCurrent: number;
    averageSpeed: number;
    batterySecondsRemaining: number;
    distance: number;
    energyConsumed: number;
    lapTime: number;
    netPowerOut: number;
    timeStamp: number;
    totalPowerIn: number;
    totalPowerOut: number;
  };
  Rfid: string;
  timestamp: number;
}

export class LapData {
  constructor(
    timestamp: number,
    lapTime: number,
    totalPowerIn: number,
    totalPowerOut: number,
    netPowerOut: number,
    distance: number,
    energyConsumed: number,
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
    this.energyConsumed = energyConsumed;
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
  energyConsumed = -1;
  averagePackCurrent = -1;
  batterySecondsRemaining = -1;
  lapsRemaining = -1;
  averageSpeed = -1;
}
