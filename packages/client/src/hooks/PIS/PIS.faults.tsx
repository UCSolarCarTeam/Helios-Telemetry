import {
  FaultLocations,
  ISeverity,
} from "@/components/molecules/HeroMolecules/HeroTypes";
import { usePacket } from "@/contexts/PacketContext";
import type I_PIS from "@/objects/PIS/PIS.interface";

const Faults = (): I_PIS => {
  const { currentPacket } = usePacket();
  const { BatteryFaults, Contactor, MBMS, MotorDetails0, MotorDetails1 } =
    currentPacket;
  const data = {
    BatteryFaults: {
      ErrorFlags: [
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: BatteryFaults.Errors.InternalCommunicationFault,
            },
          ],
          name: "Internal Communication Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: BatteryFaults.Errors.InternalConversionFault,
            },
          ],
          name: "Internal Conversion Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: BatteryFaults.Errors.WeakCellFault,
            },
          ],
          name: "Weak Cell Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: BatteryFaults.Errors.LowCellVoltageFault,
            },
          ],
          name: "Low Cell Voltage Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: BatteryFaults.Errors.OpenWiringFault,
            },
          ],
          name: "Open Wiring Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: BatteryFaults.Errors.CurrentSensorFault,
            },
          ],
          name: "Current Sensor Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: BatteryFaults.Errors.PackVoltageSensorFault,
            },
          ],
          name: "Pack Voltage Sensor Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: BatteryFaults.Errors.WeakPackFault,
            },
          ],
          name: "Weak Pack Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: BatteryFaults.Errors.VoltageRedundancyFault,
            },
          ],
          name: "Voltage Redundancy Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: BatteryFaults.Errors.FanMonitorFault,
            },
          ],
          name: "Fan Monitor Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: BatteryFaults.Errors.ThermistorFault,
            },
          ],
          name: "Thermistor Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: BatteryFaults.Errors.CanbusCommunicationFault,
            },
          ],
          name: "CANBUS Communications Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: BatteryFaults.Errors.AlwaysOnSupplyFault,
            },
          ],
          name: "Always On Supply Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: BatteryFaults.Errors.HighVoltageIsolationFault,
            },
          ],
          name: "High Voltage Isolation Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: BatteryFaults.Errors.PowerSupply12VFault,
            },
          ],
          name: "12V Power Supply Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: BatteryFaults.Errors.ChargeLimitEnforcementFault,
            },
          ],
          name: "Charge Limit Enforcement Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: BatteryFaults.Errors.ChargerSafetyRelayFault,
            },
          ],
          name: "Charge Safety Relay Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: BatteryFaults.Errors.DischargeLimitEnforcementFault,
            },
          ],
          name: "Discharge Limit Enforcement Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: BatteryFaults.Errors.ChargerSafetyRelayFault,
            },
          ],
          name: "Charger Safety Relay Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: BatteryFaults.Errors.InternalMemoryFault,
            },
          ],
          name: "Internal Memory Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: BatteryFaults.Errors.InternalThermistorFault,
            },
          ],
          name: "Internal Thermistors Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: BatteryFaults.Errors.InternalLogicFault,
            },
          ],
          name: "Internal Logic Fault",
        },
      ],
      WarningFlags: [
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value: BatteryFaults.Warnings.DclReducedDueToLowSoc,
            },
          ],
          name: "Dcl Reduced Due To Low Soc",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value: BatteryFaults.Warnings.DclReducedDueToHighCellResistance,
            },
          ],
          name: "Dcl Reduced Due to HighCell Resistance",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value: BatteryFaults.Warnings.DclReducedDueToTemperature,
            },
          ],
          name: "Dcl Reduced Due to Temperature",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value: BatteryFaults.Warnings.DclReducedDueToLowCellVoltage,
            },
          ],
          name: "Dcl Reduced Due to Low Cell Voltage",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value: BatteryFaults.Warnings.DclReducedDueToLowPackVoltage,
            },
          ],
          name: "Dcl Reduced Due to Low Pack Voltage",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value:
                BatteryFaults.Warnings.DclAndCclReducedDueToVoltageFailsafe,
            },
          ],
          name: "Dcl and Ccl Reduced Due to Voltage Fail Safe",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value:
                BatteryFaults.Warnings
                  .DclAndCclReducedDueToCommunicationFailsafe,
            },
          ],
          name: "Dcl and Ccl Reduced Due to Communication Fail Safe",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value: BatteryFaults.Warnings.CclReducedDueToHighSoc,
            },
          ],
          name: "Ccl Reduced Due to High Soc",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value: BatteryFaults.Warnings.CclReducedDueToHighCellResistance,
            },
          ],
          name: "Ccl Reduced to High Cell Resistance",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value: BatteryFaults.Warnings.CclReducedDueToTemperature,
            },
          ],
          name: "Ccl Reduced Due to Temperature",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value: BatteryFaults.Warnings.CclReducedDueToHighCellVoltage,
            },
          ],
          name: "Ccl Reduced Due to High Cell Voltage",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value: BatteryFaults.Warnings.CclReducedDueToHighPackVoltage,
            },
          ],
          name: "Ccl Reduced Due to High Pack Voltage",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value: BatteryFaults.Warnings.CclReducedDueToChargerLatch,
            },
          ],
          name: "Ccl Reduced Due to Charger Latch",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value:
                BatteryFaults.Warnings.CclReducedDueToAlternateCurrentLimit,
            },
          ],
          name: "Ccl Reduced Due to Alternate Current Limit",
        },
      ],
    },
    ContactorFaults: {
      ErrorFlags: [
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: Contactor?.ArrayBPSError,
            },
          ],
          name: "Array BPS Error",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: Contactor?.ArrayContactorError,
            },
          ],
          name: "Array Contactor Error",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: Contactor?.ArrayPrechargerError,
            },
          ],
          name: "Array Precharger Error",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: Contactor?.ChargeBPSError,
            },
          ],
          name: "Charge BPS Error",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: Contactor?.ChargeContactorError,
            },
          ],
          name: "Charge Contactor Error",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: Contactor?.ChargePrechargerError,
            },
          ],
          name: "Charge Precharger Error",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: Contactor?.CommonContactorError,
            },
          ],
          name: "Common Contactor Error",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: Contactor?.CommonContactorOpeningError,
            },
          ],
          name: "Common Contactor Opening Error",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: Contactor?.CommonPrechargerError,
            },
          ],
          name: "Common Precharger Error",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: Contactor?.LvBpsError,
            },
          ],
          name: "LV BPS Error",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: Contactor?.LvContactorError,
            },
          ],
          name: "LV Contactor Error",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: Contactor?.LvPrechargerError,
            },
          ],
          name: "LV Precharger Error",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: Contactor?.MotorBPSError,
            },
          ],
          name: "Motor BPS Error",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: Contactor?.MotorContactorError,
            },
          ],
          name: "Motor Contactor Error",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: Contactor?.MotorPrechargerError,
            },
          ],
          name: "Motor Precharger Error",
        },
      ],
    },
    MbmsFaults: {
      ErrorFlags: [
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: MBMS?.ArrayHeartbeatDeadTrip,
            },
          ],
          name: "Array Heartbeat Dead Trip",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: MBMS?.ArrayHighCurrentTrip,
            },
          ],
          name: "Array High Current Trip",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: MBMS?.ChargeHeartbeatDeadTrip,
            },
          ],
          name: "Charge Heartbeat Dead Trip",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: MBMS?.ChargeHighCurrentTrip,
            },
          ],
          name: "Charge High Current Trip",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: MBMS?.CommonHeartbeatDeadTrip,
            },
          ],
          name: "Common Heartbeat Dead Trip",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: MBMS?.CommonHighCurrentTrip,
            },
          ],
          name: "Common High Current Trip",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: MBMS?.ContactorConnectedUnexpectedlyTrip,
            },
          ],
          name: "Contactor Connected Unexpectedly Trip",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: MBMS?.ContactorDisconnectedUnexpectedlyTrip,
            },
          ],
          name: "Contactor Disconnected Unexpectedly Trip",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: MBMS?.EsdEnabledTrip,
            },
          ],
          name: "Esd Enabled Trip",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: MBMS?.Heartbeat,
            },
          ],
          name: "No MBMS Heartbeat For 2.5s",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: MBMS?.HighCellVoltageTrip,
            },
          ],
          name: "High Cell Voltage Trip",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: MBMS?.HighTemperatureTrip,
            },
          ],
          name: "High Temperature Trip",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: MBMS?.HighTemperatureWarning,
            },
          ],
          name: "High Temperature Warning",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: MBMS?.LowCellVoltageTrip,
            },
          ],
          name: "Low Cell Voltage Trip",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: MBMS?.LowCellVoltageWarning,
            },
          ],
          name: "Low Cell Voltage Warning",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: MBMS?.LvHeartbeatDeadTrip,
            },
          ],
          name: "LV Heartbeat Dead Trip",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: MBMS?.LvHighCurrentTrip,
            },
          ],
          name: "LV High Current Trip",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: MBMS?.MotorHeartbeatDeadTrip,
            },
          ],
          name: "Motor Heartbeat Dead Trip",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: MBMS?.MotorHighCurrentTrip,
            },
          ],
          name: "Motor High Current Trip",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: MBMS?.MpsDisabledTrip,
            },
          ],
          name: "MPS Disabled Trip",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: MBMS?.OrionMessageTimeoutTrip,
            },
          ],
          name: "Orion Message Timeout Trip",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: MBMS?.ProtectionTrip,
            },
          ],
          name: "Protection Trip",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: MBMS?.StrobeBmsLight,
            },
          ],
          name: "Strobe SOS",
        },
      ],
      WarningFlags: [
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value: MBMS?.ArrayHighCurrentWarning,
            },
          ],
          name: "Array High Current Warning",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value: MBMS?.CanOc12VWarning,
            },
          ],
          name: "CAN OC 12V Warning",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value: MBMS?.ChargeHighCurrentWarning,
            },
          ],
          name: "Charge High Current Warning",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value: MBMS?.CommonHighCurrentWarning,
            },
          ],
          name: "Common High Current Warning",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value: MBMS?.HighCellVoltageWarning,
            },
          ],
          name: "High Cell Voltage Warning",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value: MBMS?.LvHighCurrentWarning,
            },
          ],
          name: "LV High Current Warning",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value: MBMS?.MotorHighCurrentWarning,
            },
          ],
          name: "Motor High Current Warning",
        },
      ],
    },
    MotorFaults: {
      ErrorFlags: [
        {
          data: [
            {
              indicationLocation: FaultLocations.LEFTMOTOR,
              severity: ISeverity.ERROR,
              value: MotorDetails0?.ErrorFlags,
            },
          ],
          name: "Error Flag Raised In Left Motor",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.LEFTMOTOR,
              severity: ISeverity.ERROR,
              value: MotorDetails0?.RxErrorCount,
            },
          ],
          name: "Rx Error Raised In Left Motor",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.LEFTMOTOR,
              severity: ISeverity.ERROR,
              value: MotorDetails0?.TxErrorCount,
            },
          ],
          name: "Tx Error Raised In Left Motor",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.RIGHTMOTOR,
              severity: ISeverity.ERROR,
              value: MotorDetails1?.ErrorFlags,
            },
          ],
          name: "Error Flag Raised In Right Motor",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.RIGHTMOTOR,
              severity: ISeverity.ERROR,
              value: MotorDetails1?.RxErrorCount,
            },
          ],
          name: "Rx Error Raised In Right Motor",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.RIGHTMOTOR,
              severity: ISeverity.ERROR,
              value: MotorDetails1?.TxErrorCount,
            },
          ],
          name: "Tx Error Raised In Right Motor",
        },
      ],
    },
  };

  return data as I_PIS;
};

export default Faults;
