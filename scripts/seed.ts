#!/usr/bin/env tsx

/**
 * Database Seeding Script
 * 
 * This script seeds the database with fake telemetry data for development and testing.
 * It generates:
 * - 5 Driver records
 * - 1,000 TelemetryPacket records
 * - 100 Lap records (derived from packets, approximately 1 lap per 10 packets)
 * 
 * Usage: npm run seed or yarn seed
 */

import "reflect-metadata";
import { AppDataSource } from "../packages/db/src/data-source";
import { Driver } from "../packages/db/src/entities/Driver.entity";
import { TelemetryPacket } from "../packages/db/src/entities/TelemetryPacket.entity";
import { Lap } from "../packages/db/src/entities/Lap.entity";
import { generateFakeTelemetryData } from "../packages/shared/src/functions";
import { faker } from "@faker-js/faker";

// Constants
const NUM_DRIVERS = 5;
const NUM_PACKETS = 1000;
const NUM_LAPS = 100;
const PACKETS_PER_LAP = Math.floor(NUM_PACKETS / NUM_LAPS);

/**
 * Generate fake driver records
 */
function generateDrivers(count: number): Driver[] {
  const drivers: Driver[] = [];
  for (let i = 0; i < count; i++) {
    const driver = new Driver();
    driver.Rfid = faker.string.numeric(10); // Generate 10-digit RFID
    driver.Name = faker.person.fullName();
    drivers.push(driver);
  }
  return drivers;
}

/**
 * Convert ITelemetryData to TelemetryPacket entity
 */
function convertToTelemetryPacket(
  data: ReturnType<typeof generateFakeTelemetryData>,
  rfid: string,
  timestamp: Date
): TelemetryPacket {
  const packet = new TelemetryPacket();
  
  // Set primary keys
  packet.Timestamp = timestamp;
  packet.Rfid = rfid;
  
  // Set metadata
  packet.RaceName = "Test Race";
  packet.Title = data.Title;
  
  // B3 Fields
  packet.Acceleration = data.B3.Acceleration;
  packet.B3Heartbeat = data.B3.B3Heartbeat;
  packet.BrakeLightSignalStatus = data.B3.BrakeLightSignalStatus;
  packet.BrakeSwitchDigital = data.B3.BrakeSwitchDigital;
  packet.DaytimeRunningLightSignalStatus = data.B3.DaytimeRunningLightSignalStatus;
  packet.ForwardDigital = data.B3.ForwardDigital;
  packet.HandbrakeSwitchDigital = data.B3.HandbrakeSwitchDigital;
  packet.HazardLightsInput = data.B3.HazardLightsInput;
  packet.HeadlightsSwitchInput = data.B3.HeadightsSwitchInput;
  packet.HeadlightSignalStatus = data.B3.HeadlightSignalStatus;
  packet.HornSignalStatus = data.B3.HornSignalStatus;
  packet.HornSwitchDigital = data.B3.HornSwitchDigital;
  packet.LapDigital = data.B3.LapDigital;
  packet.LeftSignalInput = data.B3.LeftSignalInput;
  packet.LeftSignalStatus = data.B3.LeftSignalStatus;
  packet.MotorResetDigital = data.B3.MotorResetDigital;
  packet.NeutralDigital = data.B3.NeutralDigital;
  packet.RaceModeDigital = data.B3.RaceModeDigital;
  packet.RegenBraking = data.B3.RegenBraking;
  packet.ReverseDigital = data.B3.ReverseDigital;
  packet.RightSignalInput = data.B3.RightSignalInput;
  packet.RightSignalStatus = data.B3.RightSignalStatus;
  
  // Battery Fields
  packet.AlwaysOnSignalStatus = data.Battery.AlwaysOnSignalStatus;
  packet.AverageCellVoltage = data.Battery.AverageCellVoltage;
  packet.AverageTemperature = data.Battery.AverageTemperature;
  packet.BmuAlive = data.Battery.BmuAlive;
  packet.ChargeRelayEnabled = data.Battery.ChargeRelayEnabled;
  packet.ChargerSafetyEnabled = data.Battery.ChargerSafetyEnabled;
  packet.DischargeRelayEnabled = data.Battery.DischargeRelayEnabled;
  packet.FanSpeed = data.Battery.FanSpeed;
  packet.FanVoltage = data.Battery.FanVoltage;
  packet.HighCellVoltage = data.Battery.HighCellVoltage;
  packet.HighCellVoltageId = data.Battery.HighCellVoltageId;
  packet.HighTemperature = data.Battery.HighTemperature;
  packet.HighThermistorId = data.Battery.HighThermistorId;
  packet.Input12v = data.Battery.Input12V;
  packet.InternalTemperature = data.Battery.InternalTemperature;
  packet.IsChargingSignalStatus = data.Battery.IsChargingSignalStatus;
  packet.IsReadySignalStatus = data.Battery.IsReadySignalStatus;
  packet.LowCellVoltage = data.Battery.LowCellVoltage;
  packet.LowCellVoltageId = data.Battery.LowCellVoltageId;
  packet.LowTemperature = data.Battery.LowTemperature;
  packet.LowThermistorId = data.Battery.LowThermistorId;
  packet.MalfunctionIndicatorActive = data.Battery.MalfunctionIndicatorActive;
  packet.MaximumCellVoltage = data.Battery.MaximumCellVoltage;
  packet.MaximumPackVoltage = data.Battery.MaximumPackVoltage;
  packet.MinimumCellVoltage = data.Battery.MinimumCellVoltage;
  packet.MinimumPackVoltage = data.Battery.MinimumPackVoltage;
  packet.MultiPurposeInputSignalStatus = data.Battery.MultiPurposeInputSignalStatus;
  packet.PackAmphours = data.Battery.PackAmphours;
  packet.PackCurrent = data.Battery.PackCurrent;
  packet.PackDepthOfDischarge = data.Battery.PackDepthOfDischarge;
  packet.PackStateOfCharge = data.Battery.PackStateOfCharge;
  packet.PackVoltage = data.Battery.PackVoltage;
  packet.PopulatedCells = data.Battery.PopulatedCells;
  packet.RequestedFanSpeed = data.Battery.RequestedFanSpeed;
  
  // Battery Faults - Errors
  packet.ErrorAlwaysOnSupplyFault = data.BatteryFaults.Errors.AlwaysOnSupplyFault;
  packet.ErrorCanbusCommunicationFault = data.BatteryFaults.Errors.CanbusCommunicationFault;
  packet.ErrorChargeLimitEnforcementFault = data.BatteryFaults.Errors.ChargeLimitEnforcementFault;
  packet.ErrorChargerSafetyRelayFault = data.BatteryFaults.Errors.ChargerSafetyRelayFault;
  packet.ErrorCurrentSensorFault = data.BatteryFaults.Errors.CurrentSensorFault;
  packet.ErrorDischargeLimitEnforcementFault = data.BatteryFaults.Errors.DischargeLimitEnforcementFault;
  packet.ErrorFanMonitorFault = data.BatteryFaults.Errors.FanMonitorFault;
  packet.ErrorHighVoltageIsolationFault = data.BatteryFaults.Errors.HighVoltageIsolationFault;
  packet.ErrorInternalCommunicationFault = data.BatteryFaults.Errors.InternalCommunicationFault;
  packet.ErrorInternalConversionFault = data.BatteryFaults.Errors.InternalConversionFault;
  packet.ErrorInternalLogicFault = data.BatteryFaults.Errors.InternalLogicFault;
  packet.ErrorInternalMemoryFault = data.BatteryFaults.Errors.InternalMemoryFault;
  packet.ErrorInternalThermistorFault = data.BatteryFaults.Errors.InternalThermistorFault;
  packet.ErrorLowCellVoltageFault = data.BatteryFaults.Errors.LowCellVoltageFault;
  packet.ErrorOpenWiringFault = data.BatteryFaults.Errors.OpenWiringFault;
  packet.ErrorPackVoltageSensorFault = data.BatteryFaults.Errors.PackVoltageSensorFault;
  packet.ErrorPowerSupply12vFault = data.BatteryFaults.Errors.PowerSupply12VFault;
  packet.ErrorThermistorFault = data.BatteryFaults.Errors.ThermistorFault;
  packet.ErrorVoltageRedundancyFault = data.BatteryFaults.Errors.VoltageRedundancyFault;
  packet.ErrorWeakCellFault = data.BatteryFaults.Errors.WeakCellFault;
  packet.ErrorWeakPackFault = data.BatteryFaults.Errors.WeakPackFault;
  
  // Battery Faults - Warnings
  packet.WarningCclReducedDueToAlternateCurrentLimit = data.BatteryFaults.Warnings.CclReducedDueToAlternateCurrentLimit;
  packet.WarningCclReducedDueToChargerLatch = data.BatteryFaults.Warnings.CclReducedDueToChargerLatch;
  packet.WarningCclReducedDueToHighCellResistance = data.BatteryFaults.Warnings.CclReducedDueToHighCellResistance;
  packet.WarningCclReducedDueToHighCellVoltage = data.BatteryFaults.Warnings.CclReducedDueToHighCellVoltage;
  packet.WarningCclReducedDueToHighPackVoltage = data.BatteryFaults.Warnings.CclReducedDueToHighPackVoltage;
  packet.WarningCclReducedDueToHighSoc = data.BatteryFaults.Warnings.CclReducedDueToHighSoc;
  packet.WarningCclReducedDueToTemperature = data.BatteryFaults.Warnings.CclReducedDueToTemperature;
  packet.WarningDclAndCclReducedDueToCommunicationFailsafe = data.BatteryFaults.Warnings.DclAndCclReducedDueToCommunicationFailsafe;
  packet.WarningDclAndCclReducedDueToVoltageFailsafe = data.BatteryFaults.Warnings.DclAndCclReducedDueToVoltageFailsafe;
  packet.WarningDclReducedDueToHighCellResistance = data.BatteryFaults.Warnings.DclReducedDueToHighCellResistance;
  packet.WarningDclReducedDueToLowCellVoltage = data.BatteryFaults.Warnings.DclReducedDueToLowCellVoltage;
  packet.WarningDclReducedDueToLowPackVoltage = data.BatteryFaults.Warnings.DclReducedDueToLowPackVoltage;
  packet.WarningDclReducedDueToLowSoc = data.BatteryFaults.Warnings.DclReducedDueToLowSoc;
  packet.WarningDclReducedDueToTemperature = data.BatteryFaults.Warnings.DclReducedDueToTemperature;
  
  // Contactor Fields
  packet.ArrayBpsError = data.Contactor.ArrayBPSError;
  packet.ArrayChargeCurrent = data.Contactor.ArrayChargeCurrent;
  packet.ArrayContactorClosed = data.Contactor.ArrayContactorClosed;
  packet.ArrayContactorClosing = data.Contactor.ArrayContactorClosing;
  packet.ArrayContactorError = data.Contactor.ArrayContactorError;
  packet.ArrayHeartbeat = data.Contactor.ArrayHeartbeat;
  packet.ArrayLineCurrent = data.Contactor.ArrayLineCurrent;
  packet.ArrayPrechargerClosed = data.Contactor.ArrayPrechargerClosed;
  packet.ArrayPrechargerClosing = data.Contactor.ArrayPrechargerClosing;
  packet.ArrayPrechargerError = data.Contactor.ArrayPrechargerError;
  
  packet.ChargeBpsError = data.Contactor.ChargeBPSError;
  packet.ChargeChargeCurrent = data.Contactor.ChargeChargeCurrent;
  packet.ChargeContactorClosed = data.Contactor.ChargeContactorClosed;
  packet.ChargeContactorClosing = data.Contactor.ChargeContactorClosing;
  packet.ChargeContactorError = data.Contactor.ChargeContactorError;
  packet.ChargeHeartbeat = data.Contactor.ChargeHeartbeat;
  packet.ChargeLineCurrent = data.Contactor.ChargeLineCurrent;
  packet.ChargePrechargerClosed = data.Contactor.ChargePrechargerClosed;
  packet.ChargePrechargerClosing = data.Contactor.ChargePrechargerClosing;
  packet.ChargePrechargerError = data.Contactor.ChargePrechargerError;
  
  packet.CommonChargeCurrent = data.Contactor.CommonChargeCurrent;
  packet.CommonContactorClosed = data.Contactor.CommonContactorClosed;
  packet.CommonContactorClosing = data.Contactor.CommonContactorClosing;
  packet.CommonContactorError = data.Contactor.CommonContactorError;
  packet.CommonContactorOpeningError = data.Contactor.CommonContactorOpeningError;
  packet.CommonHeartbeat = data.Contactor.CommonHeartbeat;
  packet.CommonLineCurrent = data.Contactor.CommonLineCurrent;
  packet.CommonPrechargerClosed = data.Contactor.CommonPrechargerClosed;
  packet.CommonPrechargerClosing = data.Contactor.CommonPrechargerClosing;
  packet.CommonPrechargerError = data.Contactor.CommonPrechargerError;
  
  packet.LvBpsError = data.Contactor.LvBpsError;
  packet.LvChargeCurrent = data.Contactor.LvChargeCurrent;
  packet.LvContactorClosed = data.Contactor.LvContactorClosed;
  packet.LvContactorClosing = data.Contactor.LvContactorClosing;
  packet.LvContactorError = data.Contactor.LvContactorError;
  packet.LvHeartbeat = data.Contactor.LvHeartbeat;
  packet.LvLineCurrent = data.Contactor.LvLineCurrent;
  packet.LvPrechargerClosed = data.Contactor.LvPrechargerClosed;
  packet.LvPrechargerClosing = data.Contactor.LvPrechargerClosing;
  packet.LvPrechargerError = data.Contactor.LvPrechargerError;
  
  packet.MotorBpsError = data.Contactor.MotorBPSError;
  packet.MotorChargeCurrent = data.Contactor.MotorChargeCurrent;
  packet.MotorContactorClosed = data.Contactor.MotorContactorClosed;
  packet.MotorContactorClosing = data.Contactor.MotorContactorClosing;
  packet.MotorContactorError = data.Contactor.MotorContactorError;
  packet.MotorHeartbeat = data.Contactor.MotorHeartbeat;
  packet.MotorLineCurrent = data.Contactor.MotorLineCurrent;
  packet.MotorPrechargerClosed = data.Contactor.MotorPrechargerClosed;
  packet.MotorPrechargerClosing = data.Contactor.MotorPrechargerClosing;
  packet.MotorPrechargerError = data.Contactor.MotorPrechargerError;
  
  // KeyMotor Fields
  packet.BusCurrentOut = data.KeyMotor.BusCurrentOut;
  packet.KeyMotorVelocity = data.KeyMotor.KeyMotorVelocity;
  packet.MotorCurrent = data.KeyMotor.MotorCurrent;
  
  // MBMS Fields
  packet.AbattDisable = data.MBMS.AbattDisable;
  packet.ArrayContactorCommand = data.MBMS.ArrayContactorCommand;
  packet.ArrayHeartbeatDeadTrip = data.MBMS.ArrayHeartbeatDeadTrip;
  packet.ArrayHighCurrentTrip = data.MBMS.ArrayHighCurrentTrip;
  packet.ArrayHighCurrentWarning = data.MBMS.ArrayHighCurrentWarning;
  packet.AuxiliaryBatteryVoltage = data.MBMS.AuxiliaryBatteryVoltage;
  packet.CanOc12vWarning = data.MBMS.CanOc12VWarning;
  packet.ChargeContactorCommand = data.MBMS.ChargeContactorCommand;
  packet.ChargeEnable = data.MBMS.ChargeEnable;
  packet.ChargeHeartbeatDeadTrip = data.MBMS.ChargeHeartbeatDeadTrip;
  packet.ChargeHighCurrentTrip = data.MBMS.ChargeHighCurrentTrip;
  packet.ChargeHighCurrentWarning = data.MBMS.ChargeHighCurrentWarning;
  packet.ChargeSafety = data.MBMS.ChargeSafety;
  packet.ChargeShouldTrip = data.MBMS.ChargeShouldTrip;
  packet.ChgFault = data.MBMS.ChgFault;
  packet.ChgLvEn = data.MBMS.ChgLvEn;
  packet.ChgOn = data.MBMS.ChgOn;
  packet.CommonContactorCommand = data.MBMS.CommonContactorCommand;
  packet.CommonHeartbeatDeadTrip = data.MBMS.CommonHeartbeatDeadTrip;
  packet.CommonHighCurrentTrip = data.MBMS.CommonHighCurrentTrip;
  packet.CommonHighCurrentWarning = data.MBMS.CommonHighCurrentWarning;
  packet.ContactorConnectedUnexpectedlyTrip = data.MBMS.ContactorConnectedUnexpectedlyTrip;
  packet.ContactorDisconnectedUnexpectedlyTrip = data.MBMS.ContactorDisconnectedUnexpectedlyTrip;
  packet.DcdcFault = data.MBMS.DcdcFault;
  packet.DcdcOn = data.MBMS.DcdcOn;
  packet.DischargeEnable = data.MBMS.DischargeEnable;
  packet.DischargeShouldTrip = data.MBMS.DischargeShouldTrip;
  packet.En1 = data.MBMS.En1;
  packet.EsdEnabledTrip = data.MBMS.EsdEnabledTrip;
  packet.ExternalShutdown = data.MBMS.ExternalShutdown;
  packet.Heartbeat = data.MBMS.Heartbeat;
  packet.HighCellVoltageTrip = data.MBMS.HighCellVoltageTrip;
  packet.HighCellVoltageWarning = data.MBMS.HighCellVoltageWarning;
  packet.HighTemperatureTrip = data.MBMS.HighTemperatureTrip;
  packet.HighTemperatureWarning = data.MBMS.HighTemperatureWarning;
  packet.Key = data.MBMS.Key;
  packet.LowCellVoltageTrip = data.MBMS.LowCellVoltageTrip;
  packet.LowCellVoltageWarning = data.MBMS.LowCellVoltageWarning;
  packet.LowTemperatureTrip = data.MBMS.LowTemperatureTrip;
  packet.LowTemperatureWarning = data.MBMS.LowTemperatureWarning;
  packet.LvContactorCommand = data.MBMS.LvContactorCommand;
  packet.LvHeartbeatDeadTrip = data.MBMS.LvHeartbeatDeadTrip;
  packet.LvHighCurrentTrip = data.MBMS.LvHighCurrentTrip;
  packet.LvHighCurrentWarning = data.MBMS.LvHighCurrentWarning;
  packet.MainPowerSwitch = data.MBMS.MainPowerSwitch;
  packet.MotorContactorCommand = data.MBMS.MotorContactorCommand;
  packet.MotorHeartbeatDeadTrip = data.MBMS.MotorHeartbeatDeadTrip;
  packet.MotorHighCurrentTrip = data.MBMS.MotorHighCurrentTrip;
  packet.MotorHighCurrentWarning = data.MBMS.MotorHighCurrentWarning;
  packet.MpsDisabledTrip = data.MBMS.MpsDisabledTrip;
  packet.OrionCanReceivedRecently = data.MBMS.OrionCanReceivedRecently;
  packet.OrionMessageTimeoutTrip = data.MBMS.OrionMessageTimeoutTrip;
  packet.ProtectionTrip = data.MBMS.ProtectionTrip;
  packet.StartupState = data.MBMS.StartupState;
  packet.StrobeBmsLight = data.MBMS.StrobeBmsLight;
  packet.SystemState = data.MBMS.SystemState;
  packet.ThreeAOc = data.MBMS.ThreeAOc;
  
  // MotorDetails0 Fields
  packet.Motor0ActiveMotor = data.MotorDetails0.ActiveMotor;
  packet.Motor0BemfD = data.MotorDetails0.BEMF_D;
  packet.Motor0BemfQ = data.MotorDetails0.BEMF_Q;
  packet.Motor0BusCurrent = data.MotorDetails0.BusCurrent;
  packet.Motor0BusVoltage = data.MotorDetails0.BusVoltage;
  packet.Motor0DcBusAh = data.MotorDetails0.DC_Bus_Ah;
  packet.Motor0DspBoardTemperature = data.MotorDetails0.DspBoardTemperature;
  packet.Motor0ErrorFlags = data.MotorDetails0.ErrorFlags;
  packet.Motor0HeatsinkTemperature = data.MotorDetails0.HeatsinkTemperature;
  packet.Motor0Id = data.MotorDetails0.Id;
  packet.Motor0Iq = data.MotorDetails0.Iq;
  packet.Motor0LimitFlags = data.MotorDetails0.LimitFlags;
  packet.Motor0MotorTemperature = data.MotorDetails0.MotorTemperature;
  packet.Motor0MotorVelocity = data.MotorDetails0.MotorVelocity;
  packet.Motor0Odometer = data.MotorDetails0.Odometer;
  packet.Motor0PhaseCurrentB = data.MotorDetails0.PhaseCurrentB;
  packet.Motor0PhaseCurrentC = data.MotorDetails0.PhaseCurrentC;
  packet.Motor0RxErrorCount = data.MotorDetails0.RxErrorCount;
  packet.Motor0SerialNumber = data.MotorDetails0.SerialNumber;
  packet.Motor0SlipSpeed = data.MotorDetails0.SlipSpeed;
  packet.Motor0Supply15v = data.MotorDetails0.Supply15V;
  packet.Motor0Supply1v9 = data.MotorDetails0.Supply1V9;
  packet.Motor0Supply3v3 = data.MotorDetails0.Supply3V3;
  packet.Motor0TritiumId = data.MotorDetails0.TritiumId;
  packet.Motor0TxErrorCount = data.MotorDetails0.TxErrorCount;
  packet.Motor0Vd = data.MotorDetails0.Vd;
  packet.Motor0VehicleVelocity = data.MotorDetails0.VehicleVelocity;
  packet.Motor0Vq = data.MotorDetails0.Vq;
  
  // MotorDetails1 Fields
  packet.Motor1ActiveMotor = data.MotorDetails1.ActiveMotor;
  packet.Motor1BemfD = data.MotorDetails1.BEMF_D;
  packet.Motor1BemfQ = data.MotorDetails1.BEMF_Q;
  packet.Motor1BusCurrent = data.MotorDetails1.BusCurrent;
  packet.Motor1BusVoltage = data.MotorDetails1.BusVoltage;
  packet.Motor1DcBusAh = data.MotorDetails1.DC_Bus_Ah;
  packet.Motor1DspBoardTemperature = data.MotorDetails1.DspBoardTemperature;
  packet.Motor1ErrorFlags = data.MotorDetails1.ErrorFlags;
  packet.Motor1HeatsinkTemperature = data.MotorDetails1.HeatsinkTemperature;
  packet.Motor1Id = data.MotorDetails1.Id;
  packet.Motor1Iq = data.MotorDetails1.Iq;
  packet.Motor1LimitFlags = data.MotorDetails1.LimitFlags;
  packet.Motor1MotorTemperature = data.MotorDetails1.MotorTemperature;
  packet.Motor1MotorVelocity = data.MotorDetails1.MotorVelocity;
  packet.Motor1Odometer = data.MotorDetails1.Odometer;
  packet.Motor1PhaseCurrentB = data.MotorDetails1.PhaseCurrentB;
  packet.Motor1PhaseCurrentC = data.MotorDetails1.PhaseCurrentC;
  packet.Motor1RxErrorCount = data.MotorDetails1.RxErrorCount;
  packet.Motor1SerialNumber = data.MotorDetails1.SerialNumber;
  packet.Motor1SlipSpeed = data.MotorDetails1.SlipSpeed;
  packet.Motor1Supply15v = data.MotorDetails1.Supply15V;
  packet.Motor1Supply1v9 = data.MotorDetails1.Supply1V9;
  packet.Motor1Supply3v3 = data.MotorDetails1.Supply3V3;
  packet.Motor1TritiumId = data.MotorDetails1.TritiumId;
  packet.Motor1TxErrorCount = data.MotorDetails1.TxErrorCount;
  packet.Motor1Vd = data.MotorDetails1.Vd;
  packet.Motor1VehicleVelocity = data.MotorDetails1.VehicleVelocity;
  packet.Motor1Vq = data.MotorDetails1.Vq;
  
  // MPPT Fields
  packet.Mppt0Ch0ArrayCurrent = data.MPPT.Mppt0Ch0ArrayCurrent;
  packet.Mppt0Ch0ArrayVoltage = data.MPPT.Mppt0Ch0ArrayVoltage;
  packet.Mppt0Ch0BatteryVoltage = data.MPPT.Mppt0Ch0BatteryVoltage;
  packet.Mppt0Ch0UnitTemperature = data.MPPT.Mppt0Ch0UnitTemperature;
  packet.Mppt0Ch1ArrayCurrent = data.MPPT.Mppt0Ch1ArrayCurrent;
  packet.Mppt0Ch1ArrayVoltage = data.MPPT.Mppt0Ch1ArrayVoltage;
  packet.Mppt0Ch1BatteryVoltage = data.MPPT.Mppt0Ch1BatteryVoltage;
  packet.Mppt0Ch1UnitTemperature = data.MPPT.Mppt0Ch1UnitTemperature;
  
  packet.Mppt1Ch0ArrayCurrent = data.MPPT.Mppt1Ch0ArrayCurrent;
  packet.Mppt1Ch0ArrayVoltage = data.MPPT.Mppt1Ch0ArrayVoltage;
  packet.Mppt1Ch0BatteryVoltage = data.MPPT.Mppt1Ch0BatteryVoltage;
  packet.Mppt1Ch0UnitTemperature = data.MPPT.Mppt1Ch0UnitTemperature;
  packet.Mppt1Ch1ArrayCurrent = data.MPPT.Mppt1Ch1ArrayCurrent;
  packet.Mppt1Ch1ArrayVoltage = data.MPPT.Mppt1Ch1ArrayVoltage;
  packet.Mppt1Ch1BatteryVoltage = data.MPPT.Mppt1Ch1BatteryVoltage;
  packet.Mppt1Ch1UnitTemperature = data.MPPT.Mppt1Ch1UnitTemperature;
  
  packet.Mppt2Ch0ArrayCurrent = data.MPPT.Mppt2Ch0ArrayCurrent;
  packet.Mppt2Ch0ArrayVoltage = data.MPPT.Mppt2Ch0ArrayVoltage;
  packet.Mppt2Ch0BatteryVoltage = data.MPPT.Mppt2Ch0BatteryVoltage;
  packet.Mppt2Ch0UnitTemperature = data.MPPT.Mppt2Ch0UnitTemperature;
  packet.Mppt2Ch1ArrayCurrent = data.MPPT.Mppt2Ch1ArrayCurrent;
  packet.Mppt2Ch1ArrayVoltage = data.MPPT.Mppt2Ch1ArrayVoltage;
  packet.Mppt2Ch1BatteryVoltage = data.MPPT.Mppt2Ch1BatteryVoltage;
  packet.Mppt2Ch1UnitTemperature = data.MPPT.Mppt2Ch1UnitTemperature;
  
  packet.Mppt3Ch0ArrayCurrent = data.MPPT.Mppt3Ch0ArrayCurrent;
  packet.Mppt3Ch0ArrayVoltage = data.MPPT.Mppt3Ch0ArrayVoltage;
  packet.Mppt3Ch0BatteryVoltage = data.MPPT.Mppt3Ch0BatteryVoltage;
  packet.Mppt3Ch0UnitTemperature = data.MPPT.Mppt3Ch0UnitTemperature;
  packet.Mppt3Ch1ArrayCurrent = data.MPPT.Mppt3Ch1ArrayCurrent;
  packet.Mppt3Ch1ArrayVoltage = data.MPPT.Mppt3Ch1ArrayVoltage;
  packet.Mppt3Ch1BatteryVoltage = data.MPPT.Mppt3Ch1BatteryVoltage;
  packet.Mppt3Ch1UnitTemperature = data.MPPT.Mppt3Ch1UnitTemperature;
  
  // ProximitySensors Fields
  packet.ProximitySensor1 = data.ProximitySensors.ProximitySensor1;
  packet.ProximitySensor2 = data.ProximitySensors.ProximitySensor2;
  packet.ProximitySensor3 = data.ProximitySensors.ProximitySensor3;
  packet.ProximitySensor4 = data.ProximitySensors.ProximitySensor4;
  
  // Telemetry Fields (GPS and MPU)
  packet.GpsAdditionalFlags = data.Telemetry.GpsAdditionalFlags;
  packet.GpsDay = data.Telemetry.GpsDay;
  packet.GpsFixStatusFlags = data.Telemetry.GpsFixStatusFlags;
  packet.GpsHour = data.Telemetry.GpsHour;
  packet.GpsLatitude = data.Telemetry.GpsLatitude;
  packet.GpsLongitude = data.Telemetry.GpsLongitude;
  packet.GpsMinute = data.Telemetry.GpsMinute;
  packet.GpsMonth = data.Telemetry.GpsMonth;
  packet.GpsSecond = data.Telemetry.GpsSecond;
  packet.GpsValidityFlags = data.Telemetry.GpsValidityFlags;
  packet.GpsYear = data.Telemetry.GpsYear;
  
  packet.MpuAccelerationX = data.Telemetry.MpuAccelerationX;
  packet.MpuAccelerationY = data.Telemetry.MpuAccelerationY;
  packet.MpuAccelerationZ = data.Telemetry.MpuAccelerationZ;
  packet.MpuRotationX = data.Telemetry.MpuRotationX;
  packet.MpuRotationY = data.Telemetry.MpuRotationY;
  packet.MpuRotationZ = data.Telemetry.MpuRotationZ;
  packet.MpuTemperature = data.Telemetry.MpuTemperature;
  
  return packet;
}

/**
 * Generate telemetry packets with sequential timestamps
 */
function generateTelemetryPackets(
  drivers: Driver[],
  count: number
): TelemetryPacket[] {
  const packets: TelemetryPacket[] = [];
  const baseTime = new Date();
  baseTime.setHours(baseTime.getHours() - 2); // Start 2 hours ago
  
  for (let i = 0; i < count; i++) {
    // Select random driver
    const driver = drivers[i % drivers.length];
    
    // Generate sequential timestamp (1 second apart)
    const timestamp = new Date(baseTime.getTime() + i * 1000);
    
    // Generate fake telemetry data
    const fakeData = generateFakeTelemetryData();
    
    // Convert to entity
    const packet = convertToTelemetryPacket(fakeData, driver.Rfid, timestamp);
    
    packets.push(packet);
  }
  
  return packets;
}

/**
 * Calculate lap statistics from a group of packets
 * This mimics the logic in LapController.ts
 */
function calculateLapStats(packets: TelemetryPacket[]) {
  if (packets.length === 0) {
    return {
      LapTime: 0,
      TotalPowerIn: 0,
      TotalPowerOut: 0,
      NetPowerOut: 0,
      Distance: 0,
      EnergyConsumed: 0,
      AmpHours: 0,
      AveragePackCurrent: 0,
      BatterySecondsRemaining: 0,
      AverageSpeed: 0,
    };
  }
  
  // Calculate lap time (milliseconds)
  const startTime = packets[0].Timestamp.getTime();
  const endTime = packets[packets.length - 1].Timestamp.getTime();
  const lapTime = endTime - startTime;
  
  // Calculate average pack current
  const totalPackCurrent = packets.reduce((sum, p) => {
    return sum + (p.PackCurrent || 0);
  }, 0);
  const averagePackCurrent = totalPackCurrent / packets.length;
  
  // Calculate average speed (simplified)
  const totalSpeed = packets.reduce((sum, p) => {
    const motor0Speed = p.Motor0VehicleVelocity || 0;
    const motor1Speed = p.Motor1VehicleVelocity || 0;
    return sum + (motor0Speed + motor1Speed) / 2;
  }, 0);
  const averageSpeed = totalSpeed / packets.length;
  
  // Calculate distance (simplified - using average speed * time)
  const distance = (averageSpeed * lapTime) / 3600000; // Convert ms to hours
  
  // Get latest amp hours
  const ampHours = packets[packets.length - 1].PackAmphours || 0;
  
  // Simplified power calculations
  const totalPowerOut = Math.abs(
    packets.reduce((sum, p) => {
      const packCurrent = p.PackCurrent || 0;
      const packVoltage = p.PackVoltage || 0;
      return sum + packCurrent * packVoltage;
    }, 0) / packets.length
  );
  
  const totalPowerIn = Math.abs(
    packets.reduce((sum, p) => {
      // Simplified MPPT power calculation
      let mpptPower = 0;
      mpptPower += (p.Mppt0Ch0ArrayVoltage || 0) * (p.Mppt0Ch0ArrayCurrent || 0);
      mpptPower += (p.Mppt1Ch0ArrayVoltage || 0) * (p.Mppt1Ch0ArrayCurrent || 0);
      mpptPower += (p.Mppt2Ch0ArrayVoltage || 0) * (p.Mppt2Ch0ArrayCurrent || 0);
      mpptPower += (p.Mppt3Ch0ArrayVoltage || 0) * (p.Mppt3Ch0ArrayCurrent || 0);
      return sum + mpptPower;
    }, 0) / packets.length
  );
  
  const netPowerOut = totalPowerIn - totalPowerOut;
  const energyConsumed = lapTime * netPowerOut;
  
  // Calculate battery seconds remaining
  let batterySecondsRemaining = -1;
  if (averagePackCurrent !== 0) {
    const amphoursLeft = averagePackCurrent >= 0 ? ampHours : 165.6 - ampHours;
    const hoursRemaining = amphoursLeft / Math.abs(averagePackCurrent);
    batterySecondsRemaining = Math.round(hoursRemaining * 3600);
  }
  
  return {
    LapTime: lapTime,
    TotalPowerIn: totalPowerIn,
    TotalPowerOut: totalPowerOut,
    NetPowerOut: netPowerOut,
    Distance: distance,
    EnergyConsumed: energyConsumed,
    AmpHours: ampHours,
    AveragePackCurrent: averagePackCurrent,
    BatterySecondsRemaining: batterySecondsRemaining,
    AverageSpeed: averageSpeed,
  };
}

/**
 * Generate lap records derived from telemetry packets
 * Creates approximately 1 lap per N packets
 */
function generateLaps(packets: TelemetryPacket[], count: number): Lap[] {
  const laps: Lap[] = [];
  const packetsPerLap = Math.floor(packets.length / count);
  
  for (let i = 0; i < count; i++) {
    const startIdx = i * packetsPerLap;
    const endIdx = Math.min(startIdx + packetsPerLap, packets.length);
    const lapPackets = packets.slice(startIdx, endIdx);
    
    if (lapPackets.length === 0) continue;
    
    const lap = new Lap();
    
    // Use the last packet's timestamp and RFID for the lap
    const lastPacket = lapPackets[lapPackets.length - 1];
    lap.Timestamp = lastPacket.Timestamp;
    lap.Rfid = lastPacket.Rfid;
    
    // Calculate lap statistics
    const stats = calculateLapStats(lapPackets);
    lap.LapTime = stats.LapTime;
    lap.TotalPowerIn = stats.TotalPowerIn;
    lap.TotalPowerOut = stats.TotalPowerOut;
    lap.NetPowerOut = stats.NetPowerOut;
    lap.Distance = stats.Distance;
    lap.EnergyConsumed = stats.EnergyConsumed;
    lap.AmpHours = stats.AmpHours;
    lap.AveragePackCurrent = stats.AveragePackCurrent;
    lap.BatterySecondsRemaining = stats.BatterySecondsRemaining;
    lap.AverageSpeed = stats.AverageSpeed;
    
    laps.push(lap);
  }
  
  return laps;
}

/**
 * Clear all data from the database (in proper dependency order)
 */
async function clearData() {
  console.log("Clearing existing data...");
  
  const driverRepo = AppDataSource.getRepository(Driver);
  const packetRepo = AppDataSource.getRepository(TelemetryPacket);
  const lapRepo = AppDataSource.getRepository(Lap);
  
  // Clear in dependency order (children first, then parents)
  await lapRepo.delete({});
  console.log("  ✓ Cleared Lap table");
  
  await packetRepo.delete({});
  console.log("  ✓ Cleared TelemetryPacket table");
  
  await driverRepo.delete({});
  console.log("  ✓ Cleared Driver table");
}

/**
 * Seed the database with fake data
 */
async function seedData() {
  console.log(`\nGenerating seed data...`);
  console.log(`  - ${NUM_DRIVERS} drivers`);
  console.log(`  - ${NUM_PACKETS} telemetry packets`);
  console.log(`  - ${NUM_LAPS} laps`);
  
  // Generate drivers
  console.log("\nGenerating drivers...");
  const drivers = generateDrivers(NUM_DRIVERS);
  
  // Generate packets
  console.log("Generating telemetry packets...");
  const packets = generateTelemetryPackets(drivers, NUM_PACKETS);
  
  // Generate laps from packets
  console.log("Generating laps from packets...");
  const laps = generateLaps(packets, NUM_LAPS);
  
  console.log("\nInserting data into database...");
  
  // Insert in dependency order (parents first)
  const driverRepo = AppDataSource.getRepository(Driver);
  await driverRepo.save(drivers);
  console.log(`  ✓ Inserted ${drivers.length} drivers`);
  
  const packetRepo = AppDataSource.getRepository(TelemetryPacket);
  // Insert packets in batches to avoid overwhelming the database
  const batchSize = 100;
  for (let i = 0; i < packets.length; i += batchSize) {
    const batch = packets.slice(i, i + batchSize);
    await packetRepo.save(batch);
    console.log(`  ✓ Inserted packets ${i + 1}-${Math.min(i + batchSize, packets.length)} of ${packets.length}`);
  }
  
  const lapRepo = AppDataSource.getRepository(Lap);
  await lapRepo.save(laps);
  console.log(`  ✓ Inserted ${laps.length} laps`);
}

/**
 * Main function
 */
async function main() {
  try {
    console.log("=".repeat(60));
    console.log("Database Seeding Script");
    console.log("=".repeat(60));
    
    // Initialize database connection
    console.log("\nConnecting to database...");
    await AppDataSource.initialize();
    console.log("  ✓ Connected to database");
    
    // Clear existing data
    await clearData();
    
    // Seed new data
    await seedData();
    
    console.log("\n" + "=".repeat(60));
    console.log("✓ Seeding completed successfully!");
    console.log("=".repeat(60));
    
    process.exit(0);
  } catch (error) {
    console.error("\n" + "=".repeat(60));
    console.error("✗ Seeding failed!");
    console.error("=".repeat(60));
    console.error(error);
    process.exit(1);
  }
}

// Run the script
main();
