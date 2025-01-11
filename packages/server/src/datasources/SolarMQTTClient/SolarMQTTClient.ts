import { isRight } from "fp-ts/Either";
import * as t from "io-ts";
import { PathReporter } from "io-ts/PathReporter";
import { IClientOptions, type MqttClient, connect } from "mqtt";

import { type BackendController } from "@/controllers/BackendController/BackendController";

import {
  type SolarMQTTClientType,
  topics,
} from "@/datasources/SolarMQTTClient/SolarMQTTClient.types";

import { getSecrets } from "@/utils/getSecrets";
import { createLightweightApplicationLogger } from "@/utils/logger";

const { packetTopic, pingTopic, pongTopic } = topics;
const logger = createLightweightApplicationLogger("SolarMQTTClient.ts");

// define the io-ts type for incoming ITelemetryData. I couldnt get this to work with the predefined ITelemetryData type from types.ts
const ITelemetryDataType = t.type({
  B3: t.type({
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
  Battery: t.type({
    AlwaysOnSignalStatus: t.boolean,
    BatteryCell: t.type({
      AverageCellVoltage: t.number,
      HighCellVoltage: t.number,
      HighCellVoltageId: t.number,
      LowCellVoltage: t.number,
      LowCellVoltageId: t.number,
      PopulatedCells: t.number,
    }),
    BatteryFan: t.type({
      FanSpeed: t.number,
      FanVoltage: t.number,
      RequestedFanSpeed: t.number,
    }),
    BatteryPack: t.type({
      Input12V: t.number,
      PackAmphours: t.number,
      PackCurrent: t.number,
      PackDepthOfDischarge: t.number,
      PackStateOfCharge: t.number,
      PackVoltage: t.number,
    }),
    BatteryTemperature: t.type({
      LowTemperature: t.number,
      AverageTemperature: t.number,
      InternalTemperature: t.number,
      HighTemperature: t.number,
    }),
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
  BatteryFaults: t.type({
    Warnings: t.type({
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
    Errors: t.type({
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
  }),
  KeyMotor: t.type({
    ControlMode: t.boolean,
    DebugMode: t.boolean,
    MotorMode: t.boolean,
    MotorSetpoint: t.number,
    SoftwareEnable: t.boolean,
  }),
  MBMS: t.type({
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
  MPPT0: t.type({
    ArrayCurrent: t.number,
    ArrayVoltage: t.number,
    BatteryVoltage: t.number,
    ChannelNumber: t.number,
    IsAlive: t.number,
    Temperature: t.number,
  }),
  MPPT1: t.type({
    ArrayCurrent: t.number,
    ArrayVoltage: t.number,
    BatteryVoltage: t.number,
    ChannelNumber: t.number,
    IsAlive: t.number,
    Temperature: t.number,
  }),
  MPPT2: t.type({
    ArrayCurrent: t.number,
    ArrayVoltage: t.number,
    BatteryVoltage: t.number,
    ChannelNumber: t.number,
    IsAlive: t.number,
    Temperature: t.number,
  }),
  MPPT3: t.type({
    ArrayCurrent: t.number,
    ArrayVoltage: t.number,
    BatteryVoltage: t.number,
    ChannelNumber: t.number,
    IsAlive: t.number,
    Temperature: t.number,
  }),
  MotorDetails0: t.type({
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
    MotorErrors: t.type({
      CanCommsTimeoutError: t.boolean,
      ControllerDataReadingTimeout: t.boolean,
      DcOvervoltageError: t.boolean,
      ErrorInDclinkCommunication: t.boolean,
      ErrorReadingEncoder: t.boolean,
      ErrorReadingTempSensor: t.boolean,
      DcUndervoltageError: t.boolean,
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
    MotorWarnings: t.type({
      CanCommsTimeoutWarning: t.boolean,
      DcOvervoltageWarning: t.boolean,
      DcUndervoltageWarning: t.boolean,
      Inverter1OverCurrentWarning: t.boolean,
      Inverter1FaultWarning: t.boolean,
      Inverter2FaultWarning: t.boolean,
      Inverter2OverCurrentWarning: t.boolean,
      Inverter3FaultWarning: t.boolean,
      Inverter3OverCurrentWarning: t.boolean,
      Inverter4FaultWarning: t.boolean,
      Inverter4OverCurrentWarning: t.boolean,
      Inverter5FaultWarning: t.boolean,
      Inverter6FaultWarning: t.boolean,
      Inverter5OverCurrentWarning: t.boolean,
      Inverter6OverCurrentWarning: t.boolean,
      LostFramesOnCanBusWarning: t.boolean,
      OverspeedWarning: t.boolean,
    }),
    MotorMode: t.boolean,
    MotorStalled: t.boolean,
    MotorTemperature: t.number,
    SettingsNotFound: t.boolean,
    SoftwareEnable: t.boolean,
    StartAtHighRpm: t.boolean,
    TorqueLimited: t.boolean,
    ZeroPositionOffsetNotSet: t.boolean,
  }),
  MotorDetails1: t.type({
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
    MotorErrors: t.type({
      CanCommsTimeoutError: t.boolean,
      ControllerDataReadingTimeout: t.boolean,
      DcOvervoltageError: t.boolean,
      ErrorInDclinkCommunication: t.boolean,
      ErrorReadingEncoder: t.boolean,
      ErrorReadingTempSensor: t.boolean,
      DcUndervoltageError: t.boolean,
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
    MotorWarnings: t.type({
      CanCommsTimeoutWarning: t.boolean,
      DcOvervoltageWarning: t.boolean,
      DcUndervoltageWarning: t.boolean,
      Inverter1OverCurrentWarning: t.boolean,
      Inverter1FaultWarning: t.boolean,
      Inverter2FaultWarning: t.boolean,
      Inverter2OverCurrentWarning: t.boolean,
      Inverter3FaultWarning: t.boolean,
      Inverter3OverCurrentWarning: t.boolean,
      Inverter4FaultWarning: t.boolean,
      Inverter4OverCurrentWarning: t.boolean,
      Inverter5FaultWarning: t.boolean,
      Inverter6FaultWarning: t.boolean,
      Inverter5OverCurrentWarning: t.boolean,
      Inverter6OverCurrentWarning: t.boolean,
      LostFramesOnCanBusWarning: t.boolean,
      OverspeedWarning: t.boolean,
    }),
    MotorMode: t.boolean,
    MotorStalled: t.boolean,
    MotorTemperature: t.number,
    SettingsNotFound: t.boolean,
    SoftwareEnable: t.boolean,
    StartAtHighRpm: t.boolean,
    TorqueLimited: t.boolean,
    ZeroPositionOffsetNotSet: t.boolean,
  }),
  Pi: t.type({
    rfid: t.number,
  }),
  ProximitySensors: t.type({
    ProximitySensor1: t.number,
    ProximitySensor2: t.number,
    ProximitySensor3: t.number,
    ProximitySensor4: t.number,
  }),
  Telemetry: t.type({
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
  TimeStamp: t.number,
  Title: t.string,
});

export class SolarMQTTClient implements SolarMQTTClientType {
  client: MqttClient;
  backendController: BackendController;
  pingLastSent: number;
  constructor(options: IClientOptions, backendController: BackendController) {
    this.backendController = backendController;
    this.connectToAedes(options);
    this.pingLastSent = Date.now();
  }
  public pingTimer(miliseconds: number) {
    const myMessage = "t";
    setInterval(() => {
      this.pingLastSent = Date.now();
      this.client.publish(pingTopic, myMessage);
    }, miliseconds);
  }

  public async connectToAedes(options: IClientOptions) {
    try {
      this.client = connect(options);
      this.initializeListeners();
    } catch (error) {
      throw error;
    }
  }
  public initializeListeners() {
    this.client.on("connect", () => {
      logger.info("MQTT Client connected");
      this.client.subscribe([packetTopic, pongTopic], (error) => {
        if (!error) {
          //
        } else {
          logger.error("Subscription error: ", error);
        }
      });
      this.pingTimer(5000);
    });
    this.client.on("message", (topic, message) => {
      if (topic === pongTopic) {
        const carLatency = (Date.now() - this.pingLastSent) / 2;
        this.backendController.socketIO.broadcastCarLatency(carLatency);
      } else if (topic === packetTopic) {
        logger.info("Packet Received");
        const packet = JSON.parse(message.toString());
        //validate packet structure
        const validationResult = ITelemetryDataType.decode(packet);
        if (isRight(validationResult)) {
          this.backendController.handlePacketReceive(validationResult.right);
        } else {
          const errorMessages = PathReporter.report(validationResult).join(", ");
          logger.error(`Invalid packet format: ${errorMessages}`);
        }
      } else {
        logger.info("unknown topic: ", topic, "message: ", message.toString());
      }
    });
    this.client.on("error", (error) => {
      logger.error("MQTT Client error: ", error);
    });
  }
}
