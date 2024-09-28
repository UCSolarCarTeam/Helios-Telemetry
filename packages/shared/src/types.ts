export interface Coords {
  lat: number;
  long: number;
}

export interface CoordInfoUpdate {
  lat: string;
  long: string;
  password: string;
}

export interface ITelemetryData {
  AuxBms: IAuxBms;
  Battery: IBattery;
  BatteryFaults: IBatteryFault;
  Ccs: ICcs;
  DriverControls: IDriverControls;
  KeyMotor: IKeyMotor[];
  Lights: ILights;
  MPPT: IMPPT[];
  MotorDetails: IMotorDetail[];
  MotorFaults: IMotorFault[];
  PacketTitle: string;
  TimeStamp: number;
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
    averageSpeed: number
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

export interface IAuxBms {
  AllowCharge: boolean;
  AllowDischarge: boolean;
  AuxBmsAlive: boolean;
  AuxVoltage: number;
  ChargeContactorError: boolean;
  ChargeNotClosedDueToHighCurrent: boolean;
  ChargeOpenButShouldBeClosed: boolean;
  ChargeShouldTrip: boolean;
  ChargeTripDueToHighCellVoltage: boolean;
  ChargeTripDueToHighTemperatureAndCurrent: boolean;
  ChargeTripDueToPackCurrent: boolean;
  CommonContactorError: boolean;
  DischargeContactorError: boolean;
  DischargeNotClosedDueToHighCurrent: boolean;
  DischargeOpenButShouldBeClosed: boolean;
  DischargeShouldTrip: boolean;
  DischargeTripDueToHighTemperatureAndCurrent: boolean;
  DischargeTripDueToLowCellVoltage: boolean;
  DischargeTripDueToPackCurrent: boolean;
  HighVoltageEnableState: boolean;
  OrionCANReceivedRecently: boolean;
  PrechargeState: string;
  ProtectionTrip: boolean;
  StrobeBmsLight: boolean;
  TripDueToOrionMessageTimeout: boolean;
}

export interface IKeyMotor {
  Alive: boolean;
  BusCurrent: number;
  BusVoltage: number;
  SetCurrent: number;
  SetVelocity: number;
  VehicleVelocity: number;
}

export interface IMotorDetail {
  BackEmf: number;
  DcBusAmpHours: number;
  DspBoardTemp: number;
  HeatSinkTemp: number;
  MotorCurrentImaginary: number;
  MotorCurrentReal: number;
  MotorTemp: number;
  MotorVoltageImaginary: number;
  MotorVoltageReal: number;
  Odometer: number;
  PhaseBCurrent: number;
  PhaseCCurrent: number;
  SlipSpeed: number;
  VoltageRail15VSupply: number;
  VoltageRail1VSupply: number;
  VoltageRail3VSupply: number;
}

export interface IDriverControls {
  Acceleration: number;
  Alive: boolean;
  Aux: boolean;
  Brakes: boolean;
  Forward: boolean;
  Hazard: boolean;
  HeadlightsHigh: boolean;
  HeadlightsLow: boolean;
  HeadlightsOff: boolean;
  Horn: boolean;
  Interior: boolean;
  Lap: boolean;
  NextSong: boolean;
  PrevSong: boolean;
  PushToTalk: boolean;
  RegenBraking: number;
  Reset: boolean;
  Reverse: boolean;
  SignalLeft: boolean;
  SignalRight: boolean;
  VolumeDown: boolean;
  VolumeUp: boolean;
}

export interface ILights {
  Alive: boolean;
  BmsStrobeLight: boolean;
  Brakes: boolean;
  HighBeams: boolean;
  LeftSignal: boolean;
  LowBeams: boolean;
  RightSignal: boolean;
}

export interface IBatteryFault {
  ErrorFlags: IBatteryErrorFlags;
  LimitFlags: IBatteryLimitFlags;
}

export interface IBatteryErrorFlags {
  "12vPowerSupplyFault": boolean;
  AlwaysOnSupplyFault: boolean;
  CANBUSCommunicationsFault: boolean;
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
  InternalThermistorsFault: boolean;
  LowCellVoltageFault: boolean;
  OpenWiringFault: boolean;
  PackVoltageSensorFault: boolean;
  ThermistorFault: boolean;
  VoltageRedundancyFault: boolean;
  WeakCellFault: boolean;
  WeakPackFault: boolean;
}

export interface IBatteryLimitFlags {
  CclReducedDueToAlternateCurrentLimit: boolean;
  CclReducedDueToChargerLatch: boolean;
  CclReducedDueToHighCellResistance: boolean;
  CclReducedDueToHighCellVoltage: boolean;
  CclReducedDueToHighPackVoltage: boolean;
  CclReducedDueToHighSoc: boolean;
  CclReducedDueToTemperature: boolean;
  DclReducedDueToHighCellResistance: boolean;
  DclReducedDueToLowCellVoltage: boolean;
  DclReducedDueToLowPackVoltage: boolean;
  DclReducedDueToLowSoc: boolean;
  DclReducedDueToTemperature: boolean;
  DclandCclReducedDueToCommunicationFailsafe: boolean;
  DclandCclReducedDueToVoltageFailsafe: boolean;
}

export interface ICcs {
  CcsAlive: boolean;
}

export interface IMPPT {
  Alive: boolean;
  ArrayCurrent: number;
  ArrayVoltage: number;
  BatteryVoltage: number;
  Temperature: number;
}

export interface IMotorFault {
  ErrorFlags: IMotorErrorFlags;
  LimitFlags: IMotorLimitFlags;
  RxErrorCount: number;
  TxErrorCount: number;
}

export interface IMotorErrorFlags {
  BadMotorPositionHallSequence: boolean;
  ConfigReadError: boolean;
  DcBusOverVoltage: boolean;
  DesaturationFault: boolean;
  MotorOverSpeed: boolean;
  SoftwareOverCurrent: boolean;
  Wail15VUnderVoltageLockOut: boolean;
  WatchdogCausedLastReset: boolean;
}

export interface IMotorLimitFlags {
  BusCurrent: false;
  BusVoltageLower: boolean;
  // TO DO - check this, why is this false?
  BusVoltageUpper: boolean;
  IpmOrMotorTemperature: true;
  MotorCurrent: boolean;
  OutputVoltagePwm: boolean;
  Velocity: boolean;
}

export interface IBattery {
  "12vInputVoltage": number;
  Alive: boolean;
  AverageCellVoltage: number;
  AverageTemperature: number;
  BMSRelayStatusFlags: IBMSRelayStatusFlags;
  FanSpeed: number;
  FanVoltage: number;
  HighCellVoltage: number;
  HighCellVoltageId: number;
  HighTemperature: number;
  HighThermistorId: number;
  InternalTemperature: number;
  LowCellVoltage: number;
  LowCellVoltageId: number;
  LowTemperature: number;
  LowThermistorId: number;
  PackAmphours: number;
  PackCurrent: number;
  PackDepthOfDischarge: number;
  PackStateOfCharge: number;
  PackVoltage: number;
  PopulatedCells: number;
  RequestedFanSpeed: number;
}

export interface IBMSRelayStatusFlags {
  AlwaysOnSignalStatus: boolean;
  ChargeRelayEnabled: boolean;
  ChargerSafetyEnabled: boolean;
  DischargeRelayEnabled: boolean;
  IsChargingSignalStatus: boolean;
  IsReadySignalStatus: boolean;
  MalfunctionIndicatorActive: boolean;
  MultiPurposeInputSignalStatus: boolean;
}
