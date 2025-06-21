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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
          name: "Tx Error Raised In Right Motor",
        },
      ],
    },
  };

  return data as I_PIS;
};

export default Faults;
