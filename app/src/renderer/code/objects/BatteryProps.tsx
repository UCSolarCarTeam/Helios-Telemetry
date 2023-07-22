import { BooleanLiteral, NumberLiteralType } from 'typescript'

export interface BatteryProps {
  BMSRelayStatusFlags: BMSRelayStatusFlagsInterface
  PopulatedCells: number
  '12vInputVoltage': number
  FanVoltage: number
  PackCurrent: number
  PackVoltage: number
  PackStateofCharge: number
  PackAmphours: number
  PackDepthofDischarge: number
  HighTemperature: number
  HighThermistorId: number
  LowTemperature: number
  LowThermistorId: number
  AverageTemperature: number
  InternalTemperature: number
  FanSpeed: number
  RequestedFanSpeed: number
  LowCellVoltage: number
  LowCellVoltageId: number
  HighCellVoltage: number
  HighCellVoltageId: number
  AverageCellVoltage: number
}

export interface BMSRelayStatusFlagsInterface {
  DischargeRelayEnabled: boolean
  ChargeRelayEnabled: boolean
  ChargerSafetyEnabled: boolean
  MalfunctionIndicatorActive: boolean
  MultiPurposeInputSignalStatus: boolean
  AlwaysOnSignalStatus: boolean
  IsReadySignalStatus: boolean
  IsChargingSignalStatus: boolean
}

export interface AuxBMSInterface {
  PrechargeState: string
  AuxVoltage: number
  AuxBmsAlive: boolean
  StrobeBMSLight: boolean
  AllowCharge: boolean
  ContactorError: boolean
  HighVoltageEnable: boolean
  ChargeTripDueToHighCellVoltage: boolean
  ChargeTripDueToHighTemperatureAndCurrent: boolean
  ChargeTripDueToPackCurrent: boolean
  DischargeTripDueToLowCellVoltage: boolean
  DischargeTripDueToHighTemperatureAndCurrent: boolean
  DischargeTripDueToPackCurrent: boolean
  ProtectionTrip: boolean
}
