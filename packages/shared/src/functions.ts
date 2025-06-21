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
      B3Heartbeat: faker.datatype.boolean(),
      BrakeLightSignalStatus: faker.datatype.boolean(),
      BrakeSwitchDigital: faker.datatype.boolean(),
      DaytimeRunningLightSignalStatus: faker.datatype.boolean(),
      ForwardDigital: faker.datatype.boolean(),
      HandbrakeSwitchDigital: faker.datatype.boolean(),
      HazardLightsInput: faker.datatype.boolean(),
      HeadightsSwitchInput: faker.datatype.boolean(),
      HeadlightSignalStatus: faker.datatype.boolean(),
      HornSignalStatus: faker.datatype.boolean(),
      HornSwitchDigital: faker.datatype.boolean(),
      LapDigital: faker.datatype.boolean(),
      LeftSignalInput: faker.datatype.boolean(),
      LeftSignalStatus: faker.datatype.boolean(),
      MotorResetDigital: faker.datatype.boolean(),
      NeutralDigital: faker.datatype.boolean(),
      RaceModeDigital: faker.datatype.boolean(),
      RegenBraking: faker.number.int({ max: 100, min: 0 }),
      ReverseDigital: faker.datatype.boolean(),
      RightSignalInput: faker.datatype.boolean(),
      RightSignalStatus: faker.datatype.boolean(),
    },
    Battery: {
      AlwaysOnSignalStatus: faker.datatype.boolean(),
      AverageCellVoltage: faker.number.int({ max: 100, min: 0 }),
      AverageTemperature: faker.number.int({ max: 100, min: 0 }),
      BmuAlive: faker.number.int({ max: 100, min: 0 }),
      ChargeRelayEnabled: faker.datatype.boolean(),
      ChargerSafetyEnabled: faker.datatype.boolean(),
      DischargeRelayEnabled: faker.datatype.boolean(),
      FanSpeed: faker.number.int({ max: 100, min: 0 }),
      FanVoltage: faker.number.int({ max: 100, min: 0 }),
      HighCellVoltage: faker.number.int({ max: 100, min: 0 }),
      HighCellVoltageId: faker.number.int({ max: 100, min: 0 }),
      HighTemperature: faker.number.int({ max: 100, min: 0 }),
      HighThermistorId: faker.number.int({ max: 100, min: 0 }),
      Input12V: faker.number.int({ max: 100, min: 0 }),
      InternalTemperature: faker.number.int({ max: 100, min: 0 }),
      IsChargingSignalStatus: faker.datatype.boolean(),
      IsReadySignalStatus: faker.datatype.boolean(),
      LowCellVoltage: faker.number.int({ max: 100, min: 0 }),
      LowCellVoltageId: faker.number.int({ max: 100, min: 0 }),
      LowTemperature: faker.number.int({ max: 100, min: 0 }),
      LowThermistorId: faker.number.int({ max: 100, min: 0 }),
      MalfunctionIndicatorActive: faker.datatype.boolean(),
      MaximumCellVoltage: faker.number.int({ max: 100, min: 0 }),
      MaximumPackVoltage: faker.number.int({ max: 100, min: 0 }),
      MinimumCellVoltage: faker.number.int({ max: 100, min: 0 }),
      MinimumPackVoltage: faker.number.int({ max: 100, min: 0 }),
      MultiPurposeInputSignalStatus: faker.datatype.boolean(),
      PackAmphours: faker.number.int({ max: 100, min: 0 }),
      PackCurrent: faker.number.int({ max: 100, min: 0 }),
      PackDepthOfDischarge: faker.number.int({ max: 100, min: 0 }),
      PackStateOfCharge: faker.number.int({ max: 100, min: 0 }),
      PackVoltage: faker.number.int({ max: 100, min: 0 }),
      PopulatedCells: faker.number.int({ max: 100, min: 0 }),
      RequestedFanSpeed: faker.number.int({ max: 100, min: 0 }),
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
    Contactor: {
      ArrayBPSError: faker.datatype.boolean({ probability: 0.01 }),
      ArrayChargeCurrent: faker.number.int({ max: 100, min: 0 }),
      ArrayContactorClosed: faker.datatype.boolean(),
      ArrayContactorClosing: faker.datatype.boolean(),
      ArrayContactorError: faker.datatype.boolean({ probability: 0.01 }),
      ArrayHeartbeat: faker.datatype.boolean(),
      ArrayLineCurrent: faker.number.int({ max: 100, min: 0 }),
      ArrayPrechargerClosed: faker.datatype.boolean(),
      ArrayPrechargerClosing: faker.datatype.boolean(),
      ArrayPrechargerError: faker.datatype.boolean({ probability: 0.01 }),
      ChargeBPSError: faker.datatype.boolean({ probability: 0.01 }),
      ChargeChargeCurrent: faker.number.int({ max: 100, min: 0 }),
      ChargeContactorClosed: faker.datatype.boolean(),
      ChargeContactorClosing: faker.datatype.boolean(),
      ChargeContactorError: faker.datatype.boolean({ probability: 0.01 }),
      ChargeHeartbeat: faker.datatype.boolean(),
      ChargeLineCurrent: faker.number.int({ max: 100, min: 0 }),
      ChargePrechargerClosed: faker.datatype.boolean(),
      ChargePrechargerClosing: faker.datatype.boolean(),
      ChargePrechargerError: faker.datatype.boolean({ probability: 0.01 }),
      CommonChargeCurrent: faker.number.int({ max: 100, min: 0 }),
      CommonContactorClosed: faker.datatype.boolean(),
      CommonContactorClosing: faker.datatype.boolean(),
      CommonContactorError: faker.datatype.boolean({ probability: 0.01 }),
      CommonContactorOpeningError: faker.datatype.boolean({
        probability: 0.01,
      }),
      CommonHeartbeat: faker.datatype.boolean(),
      CommonLineCurrent: faker.number.int({ max: 100, min: 0 }),
      CommonPrechargerClosed: faker.datatype.boolean(),
      CommonPrechargerClosing: faker.datatype.boolean(),
      CommonPrechargerError: faker.datatype.boolean({ probability: 0.01 }),
      LvBpsError: faker.datatype.boolean({ probability: 0.01 }),
      LvChargeCurrent: faker.number.int({ max: 100, min: 0 }),
      LvContactorClosed: faker.datatype.boolean(),
      LvContactorClosing: faker.datatype.boolean(),
      LvContactorError: faker.datatype.boolean({ probability: 0.01 }),
      LvHeartbeat: faker.datatype.boolean(),
      LvLineCurrent: faker.number.int({ max: 100, min: 0 }),
      LvPrechargerClosed: faker.datatype.boolean(),
      LvPrechargerClosing: faker.datatype.boolean(),
      LvPrechargerError: faker.datatype.boolean({ probability: 0.01 }),
      MotorBPSError: faker.datatype.boolean({ probability: 0.01 }),
      MotorChargeCurrent: faker.number.int({ max: 100, min: 0 }),
      MotorContactorClosed: faker.datatype.boolean(),
      MotorContactorClosing: faker.datatype.boolean(),
      MotorContactorError: faker.datatype.boolean({ probability: 0.01 }),
      MotorHeartbeat: faker.datatype.boolean(),
      MotorLineCurrent: faker.number.int({ max: 100, min: 0 }),
      MotorPrechargerClosed: faker.datatype.boolean(),
      MotorPrechargerClosing: faker.datatype.boolean(),
      MotorPrechargerError: faker.datatype.boolean({ probability: 0.01 }),
    },
    KeyMotor: {
      BusCurrentOut: faker.number.int({ max: 100, min: 0 }),
      KeyMotorVelocity: faker.number.int({ max: 100, min: 0 }),
      MotorCurrent: faker.number.int({ max: 100, min: 0 }),
    },
    MBMS: {
      AbattDisable: faker.datatype.boolean(),
      ArrayContactorCommand: faker.datatype.boolean(),
      ArrayHeartbeatDeadTrip: faker.datatype.boolean({ probability: 0.01 }),
      ArrayHighCurrentTrip: faker.datatype.boolean({ probability: 0.01 }),
      ArrayHighCurrentWarning: faker.datatype.boolean({ probability: 0.01 }),
      AuxiliaryBatteryVoltage: faker.number.int({ max: 100, min: 0 }),
      CanOc12VWarning: faker.datatype.boolean({ probability: 0.01 }),
      ChargeContactorCommand: faker.datatype.boolean(),
      ChargeEnable: faker.datatype.boolean(),
      ChargeHeartbeatDeadTrip: faker.datatype.boolean({ probability: 0.01 }),
      ChargeHighCurrentTrip: faker.datatype.boolean({ probability: 0.01 }),
      ChargeHighCurrentWarning: faker.datatype.boolean({ probability: 0.01 }),
      ChargeSafety: faker.datatype.boolean(),
      ChargeShouldTrip: faker.datatype.boolean({ probability: 0.01 }),
      ChgFault: faker.datatype.boolean({ probability: 0.01 }),
      ChgLvEn: faker.datatype.boolean(),
      ChgOn: faker.datatype.boolean(),
      CommonContactorCommand: faker.datatype.boolean(),
      CommonHeartbeatDeadTrip: faker.datatype.boolean({ probability: 0.01 }),
      CommonHighCurrentTrip: faker.datatype.boolean({ probability: 0.01 }),
      CommonHighCurrentWarning: faker.datatype.boolean({ probability: 0.01 }),
      ContactorConnectedUnexpectedlyTrip: faker.datatype.boolean({
        probability: 0.01,
      }),
      ContactorDisconnectedUnexpectedlyTrip: faker.datatype.boolean({
        probability: 0.01,
      }),
      DcdcFault: faker.datatype.boolean({ probability: 0.01 }),
      DcdcOn: faker.datatype.boolean(),
      DischargeEnable: faker.datatype.boolean(),
      DischargeShouldTrip: faker.datatype.boolean({ probability: 0.01 }),
      En1: faker.datatype.boolean(),
      EsdEnabledTrip: faker.datatype.boolean({ probability: 0.01 }),
      ExternalShutdown: faker.datatype.boolean(),
      Heartbeat: faker.datatype.boolean({ probability: 0.01 }),
      HighCellVoltageTrip: faker.datatype.boolean({ probability: 0.01 }),
      HighCellVoltageWarning: faker.datatype.boolean({ probability: 0.01 }),
      HighTemperatureTrip: faker.datatype.boolean({ probability: 0.01 }),
      HighTemperatureWarning: faker.datatype.boolean({ probability: 0.01 }),
      Key: faker.datatype.boolean(),
      LowCellVoltageTrip: faker.datatype.boolean({ probability: 0.01 }),
      LowCellVoltageWarning: faker.datatype.boolean({ probability: 0.01 }),
      LowTemperatureTrip: faker.datatype.boolean({ probability: 0.01 }),
      LowTemperatureWarning: faker.datatype.boolean({ probability: 0.01 }),
      LvContactorCommand: faker.datatype.boolean(),
      LvHeartbeatDeadTrip: faker.datatype.boolean({ probability: 0.01 }),
      LvHighCurrentTrip: faker.datatype.boolean({ probability: 0.01 }),
      LvHighCurrentWarning: faker.datatype.boolean({ probability: 0.01 }),
      MainPowerSwitch: faker.datatype.boolean(),
      MotorContactorCommand: faker.datatype.boolean(),
      MotorHeartbeatDeadTrip: faker.datatype.boolean({ probability: 0.01 }),
      MotorHighCurrentTrip: faker.datatype.boolean({ probability: 0.01 }),
      MotorHighCurrentWarning: faker.datatype.boolean({ probability: 0.01 }),
      MpsDisabledTrip: faker.datatype.boolean({ probability: 0.01 }),
      OrionCanReceivedRecently: faker.datatype.boolean(),
      OrionMessageTimeoutTrip: faker.datatype.boolean({ probability: 0.01 }),
      ProtectionTrip: faker.datatype.boolean({ probability: 0.01 }),
      StartupState: faker.number.int({ max: 100, min: 0 }),
      StrobeBmsLight: faker.datatype.boolean(),
      SystemState: faker.number.int({ max: 100, min: 0 }),
      ThreeAOc: faker.datatype.boolean(),
    },
    MPPT: {
      Mppt0Ch0ArrayCurrent: faker.number.int({ max: 100, min: 0 }),
      Mppt0Ch0ArrayVoltage: faker.number.int({ max: 100, min: 0 }),
      Mppt0Ch0BatteryVoltage: faker.number.int({ max: 100, min: 0 }),
      Mppt0Ch0UnitTemperature: faker.number.int({ max: 100, min: 0 }),
      Mppt0Ch1ArrayCurrent: faker.number.int({ max: 100, min: 0 }),
      Mppt0Ch1ArrayVoltage: faker.number.int({ max: 100, min: 0 }),
      Mppt0Ch1BatteryVoltage: faker.number.int({ max: 100, min: 0 }),
      Mppt0Ch1UnitTemperature: faker.number.int({ max: 100, min: 0 }),
      Mppt1Ch0ArrayCurrent: faker.number.int({ max: 100, min: 0 }),
      Mppt1Ch0ArrayVoltage: faker.number.int({ max: 100, min: 0 }),
      Mppt1Ch0BatteryVoltage: faker.number.int({ max: 100, min: 0 }),
      Mppt1Ch0UnitTemperature: faker.number.int({ max: 100, min: 0 }),
      Mppt1Ch1ArrayCurrent: faker.number.int({ max: 100, min: 0 }),
      Mppt1Ch1ArrayVoltage: faker.number.int({ max: 100, min: 0 }),
      Mppt1Ch1BatteryVoltage: faker.number.int({ max: 100, min: 0 }),
      Mppt1Ch1UnitTemperature: faker.number.int({ max: 100, min: 0 }),
      Mppt2Ch0ArrayCurrent: faker.number.int({ max: 100, min: 0 }),
      Mppt2Ch0ArrayVoltage: faker.number.int({ max: 100, min: 0 }),
      Mppt2Ch0BatteryVoltage: faker.number.int({ max: 100, min: 0 }),
      Mppt2Ch0UnitTemperature: faker.number.int({ max: 100, min: 0 }),
      Mppt2Ch1ArrayCurrent: faker.number.int({ max: 100, min: 0 }),
      Mppt2Ch1ArrayVoltage: faker.number.int({ max: 100, min: 0 }),
      Mppt2Ch1BatteryVoltage: faker.number.int({ max: 100, min: 0 }),
      Mppt2Ch1UnitTemperature: faker.number.int({ max: 100, min: 0 }),
      Mppt3Ch0ArrayCurrent: faker.number.int({ max: 100, min: 0 }),
      Mppt3Ch0ArrayVoltage: faker.number.int({ max: 100, min: 0 }),
      Mppt3Ch0BatteryVoltage: faker.number.int({ max: 100, min: 0 }),
      Mppt3Ch0UnitTemperature: faker.number.int({ max: 100, min: 0 }),
      Mppt3Ch1ArrayCurrent: faker.number.int({ max: 100, min: 0 }),
      Mppt3Ch1ArrayVoltage: faker.number.int({ max: 100, min: 0 }),
      Mppt3Ch1BatteryVoltage: faker.number.int({ max: 100, min: 0 }),
      Mppt3Ch1UnitTemperature: faker.number.int({ max: 100, min: 0 }),
    },
    MotorDetails0: {
      ActiveMotor: faker.number.int({ max: 100, min: 0 }),
      BEMF_D: faker.number.int({ max: 100, min: 0 }),
      BEMF_Q: faker.number.int({ max: 100, min: 0 }),
      BusCurrent: faker.number.int({ max: 100, min: 0 }),
      BusVoltage: faker.number.int({ max: 100, min: 0 }),
      DC_Bus_Ah: faker.number.int({ max: 100, min: 0 }),
      DspBoardTemperature: faker.number.int({ max: 100, min: 0 }),
      ErrorFlags: faker.number.int({ max: 100, min: 0 }),
      HeatsinkTemperature: faker.number.int({ max: 100, min: 0 }),
      Id: faker.number.int({ max: 100, min: 0 }),
      Iq: faker.number.int({ max: 100, min: 0 }),
      LimitFlags: faker.number.int({ max: 100, min: 0 }),
      MotorId: faker.number.int({ max: 100, min: 0 }),
      MotorTemperature: faker.number.int({ max: 100, min: 0 }),
      MotorVelocity: faker.number.int({ max: 100, min: 0 }),
      Odometer: faker.number.int({ max: 100, min: 0 }),
      PhaseCurrentB: faker.number.int({ max: 100, min: 0 }),
      PhaseCurrentC: faker.number.int({ max: 100, min: 0 }),
      RxErrorCount: faker.number.int({ max: 100, min: 0 }),
      SerialNumber: faker.number.int({ max: 100, min: 0 }),
      SlipSpeed: faker.number.int({ max: 100, min: 0 }),
      Supply15V: faker.number.int({ max: 100, min: 0 }),
      Supply1V9: faker.number.int({ max: 100, min: 0 }),
      Supply3V3: faker.number.int({ max: 100, min: 0 }),
      TritiumId: faker.number.int({ max: 100, min: 0 }),
      TxErrorCount: faker.number.int({ max: 100, min: 0 }),
      Vd: faker.number.int({ max: 100, min: 0 }),
      VehicleVelocity: faker.number.int({ max: 100, min: 0 }),
      Vq: faker.number.int({ max: 100, min: 0 }),
    },
    MotorDetails1: {
      ActiveMotor: faker.number.int({ max: 100, min: 0 }),
      BEMF_D: faker.number.int({ max: 100, min: 0 }),
      BEMF_Q: faker.number.int({ max: 100, min: 0 }),
      BusCurrent: faker.number.int({ max: 100, min: 0 }),
      BusVoltage: faker.number.int({ max: 100, min: 0 }),
      DC_Bus_Ah: faker.number.int({ max: 100, min: 0 }),
      DspBoardTemperature: faker.number.int({ max: 100, min: 0 }),
      ErrorFlags: faker.number.int({ max: 100, min: 0 }),
      HeatsinkTemperature: faker.number.int({ max: 100, min: 0 }),
      Id: faker.number.int({ max: 100, min: 0 }),
      Iq: faker.number.int({ max: 100, min: 0 }),
      LimitFlags: faker.number.int({ max: 100, min: 0 }),
      MotorId: faker.number.int({ max: 100, min: 0 }),
      MotorTemperature: faker.number.int({ max: 100, min: 0 }),
      MotorVelocity: faker.number.int({ max: 100, min: 0 }),
      Odometer: faker.number.int({ max: 100, min: 0 }),
      PhaseCurrentB: faker.number.int({ max: 100, min: 0 }),
      PhaseCurrentC: faker.number.int({ max: 100, min: 0 }),
      RxErrorCount: faker.number.int({ max: 100, min: 0 }),
      SerialNumber: faker.number.int({ max: 100, min: 0 }),
      SlipSpeed: faker.number.int({ max: 100, min: 0 }),
      Supply15V: faker.number.int({ max: 100, min: 0 }),
      Supply1V9: faker.number.int({ max: 100, min: 0 }),
      Supply3V3: faker.number.int({ max: 100, min: 0 }),
      TritiumId: faker.number.int({ max: 100, min: 0 }),
      TxErrorCount: faker.number.int({ max: 100, min: 0 }),
      Vd: faker.number.int({ max: 100, min: 0 }),
      VehicleVelocity: faker.number.int({ max: 100, min: 0 }),
      Vq: faker.number.int({ max: 100, min: 0 }),
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

export function flattenObject(
  obj: ITelemetryData,
  prefix = "",
): Record<string, string | number | boolean | null> {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      const newKey = prefix ? `${prefix}.${key}` : key;
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        Object.assign(
          acc,
          flattenObject(value as unknown as ITelemetryData, newKey),
        );
      } else {
        acc[newKey] =
          typeof value === "object" && value !== null
            ? JSON.stringify(value)
            : value;
      }
      return acc;
    },
    {} as Record<string, string | number | boolean | null>,
  );
}

export function convertToCSV(jsonArray: ITelemetryData[]): string {
  // Flatten all objects (CSV uses a flat structure)
  const flatObjects = jsonArray.map((obj) => flattenObject(obj));

  // Get all the field names (headers)
  const headers = Array.from(
    new Set(flatObjects.flatMap((obj) => Object.keys(obj))),
  );

  // Create the CSV rows
  const csvRows = [
    headers.join(","), // header row
    ...flatObjects.map((obj) =>
      headers
        .map((key) => {
          const value = obj[key];
          if (typeof value === "string") {
            return `"${value.replace(/"/g, '""')}"`; // escape quotes
          }
          return value ?? "";
        })
        .join(","),
    ),
  ];

  return csvRows.join("\n");
}
