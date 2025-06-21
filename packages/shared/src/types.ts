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

const IContactorType = t.exact(
  t.type({
    ArrayBPSError: t.boolean,
    ArrayChargeCurrent: t.number,
    ArrayContactorClosed: t.boolean,
    ArrayContactorClosing: t.boolean,
    ArrayContactorError: t.boolean,
    ArrayHeartbeat: t.boolean,
    ArrayLineCurrent: t.number,
    ArrayPrechargerClosed: t.boolean,
    ArrayPrechargerClosing: t.boolean,
    ArrayPrechargerError: t.boolean,
    ChargeBPSError: t.boolean,
    ChargeChargeCurrent: t.number,
    ChargeContactorClosed: t.boolean,
    ChargeContactorClosing: t.boolean,
    ChargeContactorError: t.boolean,
    ChargeHeartbeat: t.boolean,
    ChargeLineCurrent: t.number,
    ChargePrechargerClosed: t.boolean,
    ChargePrechargerClosing: t.boolean,
    ChargePrechargerError: t.boolean,
    CommonChargeCurrent: t.number,
    CommonContactorClosed: t.boolean,
    CommonContactorClosing: t.boolean,
    CommonContactorError: t.boolean,
    CommonContactorOpeningError: t.boolean,
    CommonHeartbeat: t.boolean,
    CommonLineCurrent: t.number,
    CommonPrechargerClosed: t.boolean,
    CommonPrechargerClosing: t.boolean,
    CommonPrechargerError: t.boolean,
    LvBpsError: t.boolean,
    LvChargeCurrent: t.number,
    LvContactorClosed: t.boolean,
    LvContactorClosing: t.boolean,
    LvContactorError: t.boolean,
    LvHeartbeat: t.boolean,
    LvLineCurrent: t.number,
    LvPrechargerClosed: t.boolean,
    LvPrechargerClosing: t.boolean,
    LvPrechargerError: t.boolean,
    MotorBPSError: t.boolean,
    MotorChargeCurrent: t.number,
    MotorContactorClosed: t.boolean,
    MotorContactorClosing: t.boolean,
    MotorContactorError: t.boolean,
    MotorHeartbeat: t.boolean,
    MotorLineCurrent: t.number,
    MotorPrechargerClosed: t.boolean,
    MotorPrechargerClosing: t.boolean,
    MotorPrechargerError: t.boolean,
  }),
);

const IBatteryType = t.exact(
  t.type({
    AlwaysOnSignalStatus: t.boolean,
    AverageCellVoltage: t.number,
    AverageTemperature: t.number,
    BmuAlive: t.number,
    ChargeRelayEnabled: t.boolean,
    ChargerSafetyEnabled: t.boolean,
    DischargeRelayEnabled: t.boolean,
    FanSpeed: t.number,
    FanVoltage: t.number,
    HighCellVoltage: t.number,
    HighCellVoltageId: t.number,
    HighTemperature: t.number,
    HighThermistorId: t.number,
    Input12V: t.number,
    InternalTemperature: t.number,
    IsChargingSignalStatus: t.boolean,
    IsReadySignalStatus: t.boolean,
    LowCellVoltage: t.number,
    LowCellVoltageId: t.number,
    LowTemperature: t.number,
    LowThermistorId: t.number,
    MalfunctionIndicatorActive: t.boolean,
    MaximumCellVoltage: t.number,
    MaximumPackVoltage: t.number,
    MinimumCellVoltage: t.number,
    MinimumPackVoltage: t.number,
    MultiPurposeInputSignalStatus: t.boolean,
    PackAmphours: t.number,
    PackCurrent: t.number,
    PackDepthOfDischarge: t.number,
    PackStateOfCharge: t.number,
    PackVoltage: t.number,
    PopulatedCells: t.number,
    RequestedFanSpeed: t.number,
  }),
);

const IBatteryFaultErrorsType = t.exact(
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

const IBatteryFaultWarningsType = t.exact(
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

const IBatteryFaultsType = t.exact(
  t.type({
    Errors: IBatteryFaultErrorsType,
    Warnings: IBatteryFaultWarningsType,
  }),
);

const IB3Type = t.exact(
  t.type({
    Acceleration: t.number,
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
    RegenBraking: t.number,
    ReverseDigital: t.boolean,
    RightSignalInput: t.boolean,
    RightSignalStatus: t.boolean,
  }),
);

const IKeyMotorType = t.exact(
  t.type({
    BusCurrentOut: t.number,
    KeyMotorVelocity: t.number,
    MotorCurrent: t.number,
  }),
);

const IMBMSType = t.exact(
  t.type({
    AbattDisable: t.boolean,
    ArrayContactorCommand: t.boolean,
    ArrayHeartbeatDeadTrip: t.boolean,
    ArrayHighCurrentTrip: t.boolean,
    ArrayHighCurrentWarning: t.boolean,
    AuxiliaryBatteryVoltage: t.number,
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
    StartupState: t.number,
    StrobeBmsLight: t.boolean,
    SystemState: t.number,
    ThreeAOc: t.boolean,
  }),
);

const IMotorDetailsType = t.exact(
  t.type({
    ActiveMotor: t.number,
    BEMF_D: t.number,
    BEMF_Q: t.number,
    BusCurrent: t.number,
    BusVoltage: t.number,
    DC_Bus_Ah: t.number,
    DspBoardTemperature: t.number,
    ErrorFlags: t.number,
    HeatsinkTemperature: t.number,
    Id: t.number,
    Iq: t.number,
    LimitFlags: t.number,
    MotorId: t.number,
    MotorTemperature: t.number,
    MotorVelocity: t.number,
    Odometer: t.number,
    PhaseCurrentB: t.number,
    PhaseCurrentC: t.number,
    RxErrorCount: t.number,
    SerialNumber: t.number,
    SlipSpeed: t.number,
    Supply15V: t.number,
    Supply1V9: t.number,
    Supply3V3: t.number,
    TritiumId: t.number,
    TxErrorCount: t.number,
    Vd: t.number,
    VehicleVelocity: t.number,
    Vq: t.number,
  }),
);

const IMPPTType = t.exact(
  t.type({
    Mppt0Ch0ArrayCurrent: t.number,
    Mppt0Ch0ArrayVoltage: t.number,
    Mppt0Ch0BatteryVoltage: t.number,
    Mppt0Ch0UnitTemperature: t.number,
    Mppt0Ch1ArrayCurrent: t.number,
    Mppt0Ch1ArrayVoltage: t.number,
    Mppt0Ch1BatteryVoltage: t.number,
    Mppt0Ch1UnitTemperature: t.number,
    Mppt1Ch0ArrayCurrent: t.number,
    Mppt1Ch0ArrayVoltage: t.number,
    Mppt1Ch0BatteryVoltage: t.number,
    Mppt1Ch0UnitTemperature: t.number,
    Mppt1Ch1ArrayCurrent: t.number,
    Mppt1Ch1ArrayVoltage: t.number,
    Mppt1Ch1BatteryVoltage: t.number,
    Mppt1Ch1UnitTemperature: t.number,
    Mppt2Ch0ArrayCurrent: t.number,
    Mppt2Ch0ArrayVoltage: t.number,
    Mppt2Ch0BatteryVoltage: t.number,
    Mppt2Ch0UnitTemperature: t.number,
    Mppt2Ch1ArrayCurrent: t.number,
    Mppt2Ch1ArrayVoltage: t.number,
    Mppt2Ch1BatteryVoltage: t.number,
    Mppt2Ch1UnitTemperature: t.number,
    Mppt3Ch0ArrayCurrent: t.number,
    Mppt3Ch0ArrayVoltage: t.number,
    Mppt3Ch0BatteryVoltage: t.number,
    Mppt3Ch0UnitTemperature: t.number,
    Mppt3Ch1ArrayCurrent: t.number,
    Mppt3Ch1ArrayVoltage: t.number,
    Mppt3Ch1BatteryVoltage: t.number,
    Mppt3Ch1UnitTemperature: t.number,
  }),
);

const IPiType = t.exact(
  t.type({
    Rfid: t.string,
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
    Contactor: IContactorType,
    KeyMotor: IKeyMotorType,
    MBMS: IMBMSType,
    MPPT: IMPPTType,
    MotorDetails0: IMotorDetailsType,
    MotorDetails1: IMotorDetailsType,
    Pi: IPiType,
    ProximitySensors: IProximitySensorsType,
    Telemetry: ITelemetryType,
    TimeStamp: t.number,
    Title: t.string,
  }),
);

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
export type IMotorDetails = t.TypeOf<typeof IMotorDetailsType>;
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
export interface IRaceInfo {
  distance: number;
  lapNumber: number;
  prevTime: number;
  raceDates: Date[];
  raceDay: number;
  timeLeft: number;
  totalDistance: number;
}
