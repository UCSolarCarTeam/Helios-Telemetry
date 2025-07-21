import {
  B3,
  BatteryFaultErrors,
  BatteryFaults,
  BatteryFaultWarnings,
  BatteryStatus,
  ContactorStatus,
  KeyMotor,
  MBMS,
  MotorDetails,
  MPPT,
  Pi,
  ProximitySensors,
  Telemetry,
  TelemetryData,
} from "./protoTypes";

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

// the codec: smaller data types which make up the large io-ts type for incoming packets (ITelemetryDataType)

export type ITelemetryData = TelemetryData;
export type IContactor = ContactorStatus;
export type IBattery = BatteryStatus;
export type IBatteryFaults = BatteryFaults;
export type IBatteryFaultErrors = BatteryFaultErrors;
export type IBatteryFaultWarnings = BatteryFaultWarnings;
export type IB3 = B3;
export type IKeyMotor = KeyMotor;
export type IMBMS = MBMS;
export type IMotorDetails = MotorDetails;
export type IMPPT = MPPT;
export type IPi = Pi;
export type IProximitySensors = ProximitySensors;
export type ITelemetry = Telemetry;
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

export interface IPlaybackDynamoResponse {
  data: ITelemetryData;
  id: string;
  timestamp: number;
}

export interface IFormattedLapData {
  data: {
    ampHours: number;
    averagePackCurrent: number;
    averageSpeed: number;
    batterySecondsRemaining: number;
    distance: number;
    energyConsumed: number;
    lapTime: number;
    netPowerOut: number;
    timeStamp: string;
    totalPowerIn: number;
    totalPowerOut: number;
  };
  timestamp: number;
  Rfid: string;
}
