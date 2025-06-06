import { faker } from "@faker-js/faker";
import { Coords, ITelemetryData, ITelemetryDataType } from "./types";
import { isRight } from "fp-ts/Either";
import { type ValidationError } from "io-ts";

/**
 * This file generates fake telemetry data for testing purposes on the demo mode
 * There are other functions lower for other purposes
 *
 */
export function generateFakeTelemetryData(): ITelemetryData {
  return {
    B3: {
      Acceleration: faker.number.int({ max: 100, min: 0 }),
      BrakeLightSignalOut: faker.datatype.boolean(),
      BrakeSwitch: faker.datatype.boolean(),
      DaytimeRunningLightSignalOut: faker.datatype.boolean(),
      ForwardIn: faker.datatype.boolean(),
      ForwardSwitchIn: faker.datatype.boolean(),
      HandbrakeSwitch: faker.datatype.boolean(),
      HazardLightsIn: faker.datatype.boolean(),
      HeadightsSwitchIn: faker.datatype.boolean(),
      HeadlightSignalOut: faker.datatype.boolean(),
      HornSignalOut: faker.datatype.boolean(),
      HornSwitchIn: faker.datatype.boolean(),
      Lap: faker.datatype.boolean(),
      LeftSignalIn: faker.datatype.boolean(),
      LeftSignalOut: faker.datatype.boolean(),
      MotorReset: faker.datatype.boolean(),
      Neutral: faker.datatype.boolean(),
      RaceMode: faker.datatype.boolean(),
      RegenBraking: faker.number.int({ max: 100, min: 0 }),
      Reverse: faker.datatype.boolean(),
      RightSignalIn: faker.datatype.boolean(),
      RightSignalOut: faker.datatype.boolean(),
      ZoomZoom: faker.datatype.boolean(),
    },
    Battery: {
      AlwaysOnSignalStatus: faker.datatype.boolean(),
      BatteryCell: {
        AverageCellVoltage: faker.number.int({ max: 100, min: 0 }),
        HighCellVoltage: faker.number.int({ max: 100, min: 0 }),
        HighCellVoltageId: faker.number.int({ max: 100, min: 0 }),
        LowCellVoltage: faker.number.int({ max: 100, min: 0 }),
        LowCellVoltageId: faker.number.int({ max: 100, min: 0 }),
        PopulatedCells: faker.number.int({ max: 100, min: 0 }),
      },
      BatteryFan: {
        FanSpeed: faker.number.int({ max: 100, min: 0 }),
        FanVoltage: faker.number.int({ max: 100, min: 0 }),
        RequestedFanSpeed: faker.number.int({ max: 100, min: 0 }),
      },
      BatteryPack: {
        Input12V: faker.number.int({ max: 100, min: 0 }),
        PackAmphours: faker.number.int({ max: 100, min: 0 }),
        PackCurrent: faker.number.int({ max: 100, min: 0 }),
        PackDepthOfDischarge: faker.number.int({ max: 100, min: 0 }),
        PackStateOfCharge: faker.number.int({ max: 100, min: 0 }),
        PackVoltage: faker.number.int({ max: 100, min: 0 }),
      },
      BatteryTemperature: {
        AverageTemperature: faker.number.int({ max: 100, min: -40 }),
        HighTemperature: faker.number.int({ max: 100, min: -40 }),
        InternalTemperature: faker.number.int({ max: 100, min: -40 }),
        LowTemperature: faker.number.int({ max: 100, min: -40 }),
      },
      BmuAlive: faker.number.int({ max: 1, min: 0 }),
      ChargeRelayEnabled: faker.datatype.boolean(),
      ChargerSafetyEnabled: faker.datatype.boolean(),
      DischargeRelayEnabled: faker.datatype.boolean(),
      HighThermistorId: faker.number.int({ max: 100, min: 0 }),
      IsChargingSignalStatus: faker.datatype.boolean(),
      IsReadySignalStatus: faker.datatype.boolean(),
      LowThermistorId: faker.number.int({ max: 100, min: 0 }),
      MalfunctionIndicatorActive: faker.datatype.boolean(),
      MultiPurposeInputSignalStatus: faker.datatype.boolean(),
    },
    BatteryFaults: {
      Errors: {
        AlwaysOnSupplyFault: faker.datatype.boolean({ probability: 0.01 }),
        CanbusCommunicationFault: faker.datatype.boolean({ probability: 0.01 }),
        ChargeLimitEnforcementFault: faker.datatype.boolean({
          probability: 0.01,
        }),
        ChargerSafetyRelayFault: faker.datatype.boolean({ probability: 0.01 }),
        CurrentSensorFault: faker.datatype.boolean({ probability: 0.01 }),
        DischargeLimitEnforcementFault: faker.datatype.boolean({
          probability: 0.01,
        }),
        FanMonitorFault: faker.datatype.boolean({ probability: 0.01 }),
        HighVoltageIsolationFault: faker.datatype.boolean({
          probability: 0.01,
        }),
        InternalCommunicationFault: faker.datatype.boolean({
          probability: 0.01,
        }),
        InternalConversionFault: faker.datatype.boolean({ probability: 0.01 }),
        InternalLogicFault: faker.datatype.boolean({ probability: 0.01 }),
        InternalMemoryFault: faker.datatype.boolean({ probability: 0.01 }),
        InternalThermistorFault: faker.datatype.boolean({ probability: 0.01 }),
        LowCellVoltageFault: faker.datatype.boolean({ probability: 0.01 }),
        OpenWiringFault: faker.datatype.boolean({ probability: 0.01 }),
        PackVoltageSensorFault: faker.datatype.boolean({ probability: 0.01 }),
        PowerSupply12VFault: faker.datatype.boolean({ probability: 0.01 }),
        ThermistorFault: faker.datatype.boolean({ probability: 0.01 }),
        VoltageRedundancyFault: faker.datatype.boolean({ probability: 0.01 }),
        WeakCellFault: faker.datatype.boolean({ probability: 0.01 }),
        WeakPackFault: faker.datatype.boolean({ probability: 0.01 }),
      },
      Warnings: {
        CclReducedDueToAlternateCurrentLimit: faker.datatype.boolean({
          probability: 0.01,
        }),
        CclReducedDueToChargerLatch: faker.datatype.boolean({
          probability: 0.01,
        }),
        CclReducedDueToHighCellResistance: faker.datatype.boolean({
          probability: 0.01,
        }),
        CclReducedDueToHighCellVoltage: faker.datatype.boolean({
          probability: 0.01,
        }),
        CclReducedDueToHighPackVoltage: faker.datatype.boolean({
          probability: 0.01,
        }),
        CclReducedDueToHighSoc: faker.datatype.boolean({ probability: 0.01 }),
        CclReducedDueToTemperature: faker.datatype.boolean({
          probability: 0.01,
        }),
        DclAndCclReducedDueToCommunicationFailsafe: faker.datatype.boolean({
          probability: 0.01,
        }),
        DclAndCclReducedDueToVoltageFailsafe: faker.datatype.boolean({
          probability: 0.01,
        }),
        DclReducedDueToHighCellResistance: faker.datatype.boolean({
          probability: 0.01,
        }),
        DclReducedDueToLowCellVoltage: faker.datatype.boolean({
          probability: 0.01,
        }),
        DclReducedDueToLowPackVoltage: faker.datatype.boolean({
          probability: 0.01,
        }),
        DclReducedDueToLowSoc: faker.datatype.boolean({ probability: 0.01 }),
        DclReducedDueToTemperature: faker.datatype.boolean({
          probability: 0.01,
        }),
      },
    },
    KeyMotor: {
      ControlMode: faker.datatype.boolean(),
      DebugMode: faker.datatype.boolean(),
      MotorMode: faker.datatype.boolean(),
      MotorSetpoint: faker.number.int({ max: 100, min: 0 }),
      SoftwareEnable: faker.datatype.boolean(),
    },
    MBMS: {
      AllowCharge: faker.datatype.boolean(),
      AllowDischarge: faker.datatype.boolean(),
      ArrayContactorError: faker.datatype.boolean(),
      ArrayContactorState: faker.datatype.boolean(),
      ArrayCurrent: faker.number.int({ max: 100, min: 0 }),
      ArrayHighTemperatureCurrentTrip: faker.datatype.boolean(),
      ArrayVoltage: faker.number.int({ max: 100, min: 0 }),
      AuxillaryBatteryVoltage: faker.number.int({ max: 100, min: 0 }),
      ChargeContactorError: faker.datatype.boolean(),
      ChargeContactorState: faker.datatype.boolean(),
      ChargeCurrent: faker.number.int({ max: 100, min: 0 }),
      ChargeHighTemperatureCurrentTrip: faker.datatype.boolean(),
      ChargeShouldTrip: faker.datatype.boolean(),
      ChargeVoltage: faker.number.int({ max: 100, min: 0 }),
      CommonContactorError: faker.datatype.boolean(),
      CommonContactorState: faker.datatype.boolean(),
      CommonCurrent: faker.number.int({ max: 100, min: 0 }),
      ContactorDisconnectedUnexpectedlyTrip: faker.datatype.boolean(),
      DischargeShouldTrip: faker.datatype.boolean(),
      HighCellVoltageTrip: faker.datatype.boolean(),
      HighCommonCurrentTrip: faker.datatype.boolean(),
      HighVoltageEnableState: faker.datatype.boolean(),
      LowCellVoltageTrip: faker.datatype.boolean(),
      LvContactorError: faker.datatype.boolean(),
      LvContactorState: faker.datatype.boolean(),
      LvCurrent: faker.number.int({ max: 100, min: 0 }),
      LvHighTemperatureCurrentTrip: faker.datatype.boolean(),
      LvVoltage: faker.number.int({ max: 100, min: 0 }),
      MotorContactorError: faker.datatype.boolean(),
      MotorContactorState: faker.datatype.boolean(),
      MotorCurrent: faker.number.int({ max: 100, min: 0 }),
      MotorHighTemperatureCurrentTrip: faker.datatype.boolean(),
      MotorVoltage: faker.number.int({ max: 100, min: 0 }),
      OrionCanReceivedRecently: faker.datatype.boolean(),
      OrionMessageTimeoutTrip: faker.datatype.boolean(),
      ProtectionTrip: faker.datatype.boolean(),
      StrobeBmsLight: faker.datatype.boolean(),
    },
    MPPT0: {
      ArrayCurrent: faker.number.int({ max: 100, min: 0 }),
      ArrayVoltage: faker.number.int({ max: 100, min: 0 }),
      BatteryVoltage: faker.number.int({ max: 100, min: 0 }),
      ChannelNumber: faker.number.int({ max: 100, min: 0 }),
      IsAlive: faker.datatype.boolean(),
      Temperature: faker.number.int({ max: 100, min: 0 }),
    },
    MPPT1: {
      ArrayCurrent: faker.number.int({ max: 100, min: 0 }),
      ArrayVoltage: faker.number.int({ max: 100, min: 0 }),
      BatteryVoltage: faker.number.int({ max: 100, min: 0 }),
      ChannelNumber: faker.number.int({ max: 100, min: 0 }),
      IsAlive: faker.datatype.boolean(),
      Temperature: faker.number.int({ max: 100, min: 0 }),
    },
    MPPT2: {
      ArrayCurrent: faker.number.int({ max: 100, min: 0 }),
      ArrayVoltage: faker.number.int({ max: 100, min: 0 }),
      BatteryVoltage: faker.number.int({ max: 100, min: 0 }),
      ChannelNumber: faker.number.int({ max: 100, min: 0 }),
      IsAlive: faker.datatype.boolean(),
      Temperature: faker.number.int({ max: 100, min: 0 }),
    },
    MPPT3: {
      ArrayCurrent: faker.number.int({ max: 100, min: 0 }),
      ArrayVoltage: faker.number.int({ max: 100, min: 0 }),
      BatteryVoltage: faker.number.int({ max: 100, min: 0 }),
      ChannelNumber: faker.number.int({ max: 100, min: 0 }),
      IsAlive: faker.datatype.boolean(),
      Temperature: faker.number.int({ max: 100, min: 0 }),
    },

    MotorDetails0: {
      AbsoluteAngle: faker.number.int({ max: 360, min: 0 }),
      ControlMode: faker.datatype.boolean(),
      ControlValue: faker.number.int({ max: 100, min: 0 }),
      CurrentMotorPower: faker.number.int({ max: 100, min: 0 }),
      CurrentMotorTorque: faker.number.int({ max: 100, min: 0 }),
      CurrentRpmValue: faker.number.int({ max: 5000, min: 0 }),
      DebugMode: faker.datatype.boolean(),
      InverterPeakCurrent: faker.number.int({ max: 500, min: 0 }),
      MotorErrors: {
        CanCommsTimeoutError: faker.datatype.boolean({ probability: 0.01 }),
        CanSendError: faker.datatype.boolean(),
        ControllerDataReadingTimeout: faker.datatype.boolean({
          probability: 0.01,
        }),
        CpuOverload: faker.datatype.boolean(),
        CpuTempTooHigh: faker.datatype.boolean(),
        DcOvervoltageError: faker.datatype.boolean({ probability: 0.01 }),
        DcUndervoltageError: faker.datatype.boolean({ probability: 0.01 }),
        DclinkTempTooHigh: faker.datatype.boolean(),
        DoubleCanIdOnBus: faker.datatype.boolean(),
        ErrorInDclinkCommunication: faker.datatype.boolean({
          probability: 0.01,
        }),
        ErrorReadingEncoder: faker.datatype.boolean({ probability: 0.01 }),
        ErrorReadingTempSensor: faker.datatype.boolean({ probability: 0.01 }),
        HallTempTooHigh: faker.datatype.boolean(),
        HwEnableNotSet: faker.datatype.boolean(),
        InitError: faker.datatype.boolean(),
        InvalidHallSector: faker.datatype.boolean(),
        InvalidHallSensorSequence: faker.datatype.boolean({
          probability: 0.01,
        }),
        Inverter1FaultError: faker.datatype.boolean({ probability: 0.01 }),
        Inverter1OvercurrentError: faker.datatype.boolean({
          probability: 0.01,
        }),
        Inverter1TempTooHigh: faker.datatype.boolean(),
        Inverter2FaultError: faker.datatype.boolean({ probability: 0.01 }),
        Inverter2OvercurrentError: faker.datatype.boolean({
          probability: 0.01,
        }),
        Inverter2TempTooHigh: faker.datatype.boolean(),
        Inverter3FaultError: faker.datatype.boolean({ probability: 0.01 }),
        Inverter3OvercurrentError: faker.datatype.boolean({
          probability: 0.01,
        }),
        Inverter3TempTooHigh: faker.datatype.boolean(),
        Inverter4FaultError: faker.datatype.boolean({ probability: 0.01 }),
        Inverter4OvercurrentError: faker.datatype.boolean({
          probability: 0.01,
        }),
        Inverter4TempTooHigh: faker.datatype.boolean(),
        Inverter5FaultError: faker.datatype.boolean({ probability: 0.01 }),
        Inverter5OvercurrentError: faker.datatype.boolean({
          probability: 0.01,
        }),
        Inverter5TempTooHigh: faker.datatype.boolean(),
        Inverter6FaultError: faker.datatype.boolean({ probability: 0.01 }),
        Inverter6OvercurrentError: faker.datatype.boolean({
          probability: 0.01,
        }),
        Inverter6TempTooHigh: faker.datatype.boolean(),
        LostFramesOnCanBusError: faker.datatype.boolean({ probability: 0.01 }),
        MotorStalled: faker.datatype.boolean(),
        OverspeedError: faker.datatype.boolean({ probability: 0.01 }),
        PositionSensorReadingError: faker.datatype.boolean({
          probability: 0.01,
        }),
        SettingsNotFound: faker.datatype.boolean(),
        ZeroPositionOffsetNotSet: faker.datatype.boolean(),
      },
      MotorMode: faker.datatype.boolean(),
      MotorTemperature: faker.number.int({ max: 150, min: -40 }),
      MotorWarnings: {
        CanCommsTimeoutWarning: faker.datatype.boolean({ probability: 0.01 }),
        CanSendWarning: faker.datatype.boolean(),
        CpuOverload: faker.datatype.boolean(),
        CpuTemperatureVeryHigh: faker.datatype.boolean(),
        DcOvervoltageWarning: faker.datatype.boolean({ probability: 0.01 }),
        DcUndervoltageWarning: faker.datatype.boolean({ probability: 0.01 }),
        DclinkTemperatureVeryHigh: faker.datatype.boolean(),
        DelayInDclinkCommunication: faker.datatype.boolean(),
        DelayInReadingPosSensor: faker.datatype.boolean(),
        DelayInReadingTempSensor: faker.datatype.boolean(),
        HallTemperatureVeryHigh: faker.datatype.boolean(),
        Inverter1FaultWarning: faker.datatype.boolean({ probability: 0.01 }),
        Inverter1OverCurrentWarning: faker.datatype.boolean({
          probability: 0.01,
        }),
        Inverter1TempVeryHigh: faker.datatype.boolean(),
        Inverter2FaultWarning: faker.datatype.boolean({ probability: 0.01 }),
        Inverter2OverCurrentWarning: faker.datatype.boolean({
          probability: 0.01,
        }),
        Inverter2TempVeryHigh: faker.datatype.boolean(),
        Inverter3FaultWarning: faker.datatype.boolean({ probability: 0.01 }),
        Inverter3OverCurrentWarning: faker.datatype.boolean({
          probability: 0.01,
        }),
        Inverter3TempVeryHigh: faker.datatype.boolean(),
        Inverter4FaultWarning: faker.datatype.boolean({ probability: 0.01 }),
        Inverter4OverCurrentWarning: faker.datatype.boolean({
          probability: 0.01,
        }),
        Inverter4TempVeryHigh: faker.datatype.boolean(),
        Inverter5FaultWarning: faker.datatype.boolean({ probability: 0.01 }),
        Inverter5OverCurrentWarning: faker.datatype.boolean({
          probability: 0.01,
        }),
        Inverter5TempVeryHigh: faker.datatype.boolean(),
        Inverter6FaultWarning: faker.datatype.boolean({ probability: 0.01 }),
        Inverter6OverCurrentWarning: faker.datatype.boolean({
          probability: 0.01,
        }),
        Inverter6TempVeryHigh: faker.datatype.boolean(),
        LostFramesOnCanBusWarning: faker.datatype.boolean({
          probability: 0.01,
        }),
        MotorAboutToStall: faker.datatype.boolean(),
        OverspeedWarning: faker.datatype.boolean({ probability: 0.01 }),
        StartAtHighRpm: faker.datatype.boolean(),
        TorqueLimited: faker.datatype.boolean(),
      },
      SoftwareEnable: faker.datatype.boolean(),
    },
    MotorDetails1: {
      AbsoluteAngle: faker.number.int({ max: 360, min: 0 }),
      ControlMode: faker.datatype.boolean(),
      ControlValue: faker.number.int({ max: 100, min: 0 }),
      CurrentMotorPower: faker.number.int({ max: 100, min: 0 }),
      CurrentMotorTorque: faker.number.int({ max: 100, min: 0 }),
      CurrentRpmValue: faker.number.int({ max: 5000, min: 0 }),
      DebugMode: faker.datatype.boolean(),
      InverterPeakCurrent: faker.number.int({ max: 500, min: 0 }),
      MotorErrors: {
        CanCommsTimeoutError: faker.datatype.boolean({ probability: 0.01 }),
        CanSendError: faker.datatype.boolean(),
        ControllerDataReadingTimeout: faker.datatype.boolean({
          probability: 0.01,
        }),
        CpuOverload: faker.datatype.boolean(),
        CpuTempTooHigh: faker.datatype.boolean(),
        DcOvervoltageError: faker.datatype.boolean({ probability: 0.01 }),
        DcUndervoltageError: faker.datatype.boolean({ probability: 0.01 }),
        DclinkTempTooHigh: faker.datatype.boolean(),
        DoubleCanIdOnBus: faker.datatype.boolean(),
        ErrorInDclinkCommunication: faker.datatype.boolean({
          probability: 0.01,
        }),
        ErrorReadingEncoder: faker.datatype.boolean({ probability: 0.01 }),
        ErrorReadingTempSensor: faker.datatype.boolean({ probability: 0.01 }),
        HallTempTooHigh: faker.datatype.boolean(),
        HwEnableNotSet: faker.datatype.boolean(),
        InitError: faker.datatype.boolean(),
        InvalidHallSector: faker.datatype.boolean(),
        InvalidHallSensorSequence: faker.datatype.boolean({
          probability: 0.01,
        }),
        Inverter1FaultError: faker.datatype.boolean({ probability: 0.01 }),
        Inverter1OvercurrentError: faker.datatype.boolean({
          probability: 0.01,
        }),
        Inverter1TempTooHigh: faker.datatype.boolean(),
        Inverter2FaultError: faker.datatype.boolean({ probability: 0.01 }),
        Inverter2OvercurrentError: faker.datatype.boolean({
          probability: 0.01,
        }),
        Inverter2TempTooHigh: faker.datatype.boolean(),
        Inverter3FaultError: faker.datatype.boolean({ probability: 0.01 }),
        Inverter3OvercurrentError: faker.datatype.boolean({
          probability: 0.01,
        }),
        Inverter3TempTooHigh: faker.datatype.boolean(),
        Inverter4FaultError: faker.datatype.boolean({ probability: 0.01 }),
        Inverter4OvercurrentError: faker.datatype.boolean({
          probability: 0.01,
        }),
        Inverter4TempTooHigh: faker.datatype.boolean(),
        Inverter5FaultError: faker.datatype.boolean({ probability: 0.01 }),
        Inverter5OvercurrentError: faker.datatype.boolean({
          probability: 0.01,
        }),
        Inverter5TempTooHigh: faker.datatype.boolean(),
        Inverter6FaultError: faker.datatype.boolean({ probability: 0.01 }),
        Inverter6OvercurrentError: faker.datatype.boolean({
          probability: 0.01,
        }),
        Inverter6TempTooHigh: faker.datatype.boolean(),
        LostFramesOnCanBusError: faker.datatype.boolean({ probability: 0.01 }),
        MotorStalled: faker.datatype.boolean(),
        OverspeedError: faker.datatype.boolean({ probability: 0.01 }),
        PositionSensorReadingError: faker.datatype.boolean({
          probability: 0.01,
        }),
        SettingsNotFound: faker.datatype.boolean(),
        ZeroPositionOffsetNotSet: faker.datatype.boolean(),
      },
      MotorMode: faker.datatype.boolean(),
      MotorTemperature: faker.number.int({ max: 150, min: -40 }),
      MotorWarnings: {
        CanCommsTimeoutWarning: faker.datatype.boolean({ probability: 0.01 }),
        CanSendWarning: faker.datatype.boolean(),
        CpuOverload: faker.datatype.boolean(),
        CpuTemperatureVeryHigh: faker.datatype.boolean(),
        DcOvervoltageWarning: faker.datatype.boolean({ probability: 0.01 }),
        DcUndervoltageWarning: faker.datatype.boolean({ probability: 0.01 }),
        DclinkTemperatureVeryHigh: faker.datatype.boolean(),
        DelayInDclinkCommunication: faker.datatype.boolean(),
        DelayInReadingPosSensor: faker.datatype.boolean(),
        DelayInReadingTempSensor: faker.datatype.boolean(),
        HallTemperatureVeryHigh: faker.datatype.boolean(),
        Inverter1FaultWarning: faker.datatype.boolean({ probability: 0.01 }),
        Inverter1OverCurrentWarning: faker.datatype.boolean({
          probability: 0.01,
        }),
        Inverter1TempVeryHigh: faker.datatype.boolean(),
        Inverter2FaultWarning: faker.datatype.boolean({ probability: 0.01 }),
        Inverter2OverCurrentWarning: faker.datatype.boolean({
          probability: 0.01,
        }),
        Inverter2TempVeryHigh: faker.datatype.boolean(),
        Inverter3FaultWarning: faker.datatype.boolean({ probability: 0.01 }),
        Inverter3OverCurrentWarning: faker.datatype.boolean({
          probability: 0.01,
        }),
        Inverter3TempVeryHigh: faker.datatype.boolean(),
        Inverter4FaultWarning: faker.datatype.boolean({ probability: 0.01 }),
        Inverter4OverCurrentWarning: faker.datatype.boolean({
          probability: 0.01,
        }),
        Inverter4TempVeryHigh: faker.datatype.boolean(),
        Inverter5FaultWarning: faker.datatype.boolean({ probability: 0.01 }),
        Inverter5OverCurrentWarning: faker.datatype.boolean({
          probability: 0.01,
        }),
        Inverter5TempVeryHigh: faker.datatype.boolean(),
        Inverter6FaultWarning: faker.datatype.boolean({ probability: 0.01 }),
        Inverter6OverCurrentWarning: faker.datatype.boolean({
          probability: 0.01,
        }),
        Inverter6TempVeryHigh: faker.datatype.boolean(),
        LostFramesOnCanBusWarning: faker.datatype.boolean({
          probability: 0.01,
        }),
        MotorAboutToStall: faker.datatype.boolean(),
        OverspeedWarning: faker.datatype.boolean({ probability: 0.01 }),
        StartAtHighRpm: faker.datatype.boolean(),
        TorqueLimited: faker.datatype.boolean(),
      },
      SoftwareEnable: faker.datatype.boolean(),
    },
    Pi: {
      Rfid: faker.number.int({ max: 100, min: 0 }).toString(),
    },
    ProximitySensors: {
      ProximitySensor1: faker.number.int({ max: 100, min: 0 }),
      ProximitySensor2: faker.number.int({ max: 100, min: 0 }),
      ProximitySensor3: faker.number.int({ max: 100, min: 0 }),
      ProximitySensor4: faker.number.int({ max: 100, min: 0 }),
    },
    Telemetry: {
      GpsAdditionalFlags: faker.number.int({ max: 255, min: 0 }),
      GpsDay: faker.number.int({ max: 31, min: 1 }),
      GpsFixStatusFlags: faker.number.int({ max: 255, min: 0 }),
      GpsHour: faker.number.int({ max: 23, min: 0 }),
      GpsLatitude: faker.location.latitude(),
      GpsLongitude: faker.location.longitude(),
      GpsMinute: faker.number.int({ max: 59, min: 0 }),
      GpsMonth: faker.number.int({ max: 12, min: 1 }),
      GpsSecond: faker.number.int({ max: 59, min: 0 }),
      GpsValidityFlags: faker.number.int({ max: 255, min: 0 }),
      GpsYear: faker.number.int({ max: 2100, min: 2000 }),
      MpuAccelerationX: faker.number.float({
        max: 16,
        min: -16,
      }),
      MpuAccelerationY: faker.number.float({
        max: 16,
        min: -16,
      }),
      MpuAccelerationZ: faker.number.float({
        max: 16,
        min: -16,
      }),
      MpuRotationX: faker.number.float({
        max: 2000,
        min: -2000,
      }),
      MpuRotationY: faker.number.float({
        max: 2000,
        min: -2000,
      }),
      MpuRotationZ: faker.number.float({
        max: 2000,
        min: -2000,
      }),
      MpuTemperature: faker.number.float({ max: 85, min: -40 }),
    },
    TimeStamp: Math.round(faker.date.recent().getTime() / 1000),
    Title: faker.lorem.words(2),
  };
}

// this is a helper function to format the validation errors if there
// is an error in the telemetry data that is being sent
function formatValidationErrors(errors: ValidationError[]): string {
  return errors
    .map((error) => {
      const path = error.context
        .map(({ key }) => key)
        .filter(Boolean)
        .join(".");
      const expectedType =
        error.context[error.context.length - 1]?.type.name ??
        "error getting expected type";
      const actualValue = JSON.stringify(error.value);
      return `An invalid value of ${actualValue} was supplied to ${path} (expected type: ${expectedType}). Hint: if you received a value of undefined, it is likely the field is missing from the packet`;
    })
    .join(", ");
}

// using the we match the structure of the telemetry data that is coming in from the car
// and we validate it against the ITelemetryDataType
export function validateTelemetryData(packet: unknown) {
  const validationResult = ITelemetryDataType.decode(packet);
  if (isRight(validationResult)) {
    return validationResult.right;
  }
  const errorMessages = formatValidationErrors(validationResult.left);
  throw new Error(errorMessages);
}

// calculateBearing calculates the bearing from start to end coordinates
export const calculateBearing = (start: Coords, end: Coords): number => {
  //using the haversine formula from https://www.movable-type.co.uk/scripts/latlong.html
  const startLat = (start.lat * Math.PI) / 180; //convert to radians
  const startLng = (start.long * Math.PI) / 180;
  const endLat = (end.lat * Math.PI) / 180;
  const endLng = (end.long * Math.PI) / 180;

  const deltaLng = endLng - startLng;
  const x = Math.sin(deltaLng) * Math.cos(endLat);
  const y =
    Math.cos(startLat) * Math.sin(endLat) -
    Math.sin(startLat) * Math.cos(endLat) * Math.cos(deltaLng);

  const bearing = (Math.atan2(x, y) * 180) / Math.PI;
  return (bearing + 360) % 360; // Normalize to 0-360 degrees
};

// Converts numeric degrees to radians
function toRad(value: number) {
  return (value * Math.PI) / 180;
}

//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
export function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}
