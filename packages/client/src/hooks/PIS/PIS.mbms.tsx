import { usePacket } from "@/contexts/PacketContext";
import type I_PIS from "@/objects/PIS/PIS.interface";
import { type I_PISField } from "@/objects/PIS/PIS.interface";
import { UnitType } from "@/objects/PIS/PIS.interface";

const Mbms = (): I_PIS => {
  const { currentPacket } = usePacket();
  const { Battery, Contactor, MBMS } = currentPacket;
  const data = {
    Contactor: [
      {
        data: [
          { unit: UnitType.AMPERAGE, value: Contactor?.ArrayChargeCurrent },
        ],
        name: "Array Charge Current",
      },
      {
        data: [{ value: Contactor?.ArrayContactorClosed }],
        name: "Array Contactor Closed",
      },
      {
        data: [{ value: Contactor?.ArrayContactorClosing }],
        name: "Array Contactor Closing",
      },
      {
        data: [{ value: Contactor?.ArrayHeartbeat }],
        name: "Array Heartbeat",
      },
      {
        data: [{ unit: UnitType.AMPERAGE, value: Contactor?.ArrayLineCurrent }],
        name: "Array Line Current",
      },
      {
        data: [{ value: Contactor?.ArrayPrechargerClosed }],
        name: "Array Precharger Closed",
      },
      {
        data: [{ value: Contactor?.ArrayPrechargerClosing }],
        name: "Array Precharger Closing",
      },
      {
        data: [
          { unit: UnitType.AMPERAGE, value: Contactor?.ChargeChargeCurrent },
        ],
        name: "Charge Charge Current",
      },
      {
        data: [{ value: Contactor?.ChargeContactorClosed }],
        name: "Charge Contactor Closed",
      },
      {
        data: [{ value: Contactor?.ChargeContactorClosing }],
        name: "Charge Contactor Closing",
      },
      {
        data: [{ value: Contactor?.ChargeHeartbeat }],
        name: "Charge Heartbeat",
      },
      {
        data: [
          { unit: UnitType.AMPERAGE, value: Contactor?.ChargeLineCurrent },
        ],
        name: "Charge Line Current",
      },
      {
        data: [{ value: Contactor?.ChargePrechargerClosed }],
        name: "Charge Precharger Closed",
      },
      {
        data: [{ value: Contactor?.ChargePrechargerClosing }],
        name: "Charge Precharger Closing",
      },
      {
        data: [
          { unit: UnitType.AMPERAGE, value: Contactor?.CommonChargeCurrent },
        ],
        name: "Common Charge Current",
      },
      {
        data: [{ value: Contactor?.CommonContactorClosed }],
        name: "Common Contactor Closed",
      },
      {
        data: [{ value: Contactor?.CommonContactorClosing }],
        name: "Common Contactor Closing",
      },
      {
        data: [{ value: Contactor?.CommonHeartbeat }],
        name: "Common Heartbeat",
      },
      {
        data: [
          { unit: UnitType.AMPERAGE, value: Contactor?.CommonLineCurrent },
        ],
        name: "Common Line Current",
      },
      {
        data: [{ value: Contactor?.CommonPrechargerClosed }],
        name: "Common Precharger Closed",
      },
      {
        data: [{ value: Contactor?.CommonPrechargerClosing }],
        name: "Common Precharger Closing",
      },
      {
        data: [{ unit: UnitType.AMPERAGE, value: Contactor?.LvChargeCurrent }],
        name: "LV Charge Current",
      },
      {
        data: [{ value: Contactor?.LvHeartbeat }],
        name: "LV Heartbeat",
      },
      {
        data: [{ value: Contactor?.LvContactorClosed }],
        name: "LV Contactor Closed",
      },
      {
        data: [{ value: Contactor?.LvContactorClosing }],
        name: "LV Contactor Closing",
      },
      {
        data: [{ unit: UnitType.AMPERAGE, value: Contactor?.LvLineCurrent }],
        name: "LV Line Current",
      },
      {
        data: [{ value: Contactor?.LvPrechargerClosed }],
        name: "LV Precharger Closed",
      },
      {
        data: [{ value: Contactor?.LvPrechargerClosing }],
        name: "LV Precharger Closing",
      },
      {
        data: [
          { unit: UnitType.AMPERAGE, value: Contactor?.MotorChargeCurrent },
        ],
        name: "Motor Charge Current",
      },
      {
        data: [{ value: Contactor?.MotorContactorClosed }],
        name: "Motor Contactor Closed",
      },
      {
        data: [{ value: Contactor?.MotorContactorClosing }],
        name: "Motor Contactor Closing",
      },
      {
        data: [{ value: Contactor?.MotorHeartbeat }],
        name: "Motor Heartbeat",
      },
      {
        data: [{ unit: UnitType.AMPERAGE, value: Contactor?.MotorLineCurrent }],
        name: "Motor Line Current",
      },
      {
        data: [{ value: Contactor?.MotorPrechargerClosed }],
        name: "Motor Precharger Closed",
      },
      {
        data: [{ value: Contactor?.MotorPrechargerClosing }],
        name: "Motor Precharger Closing",
      },
    ] as I_PISField[],

    ContactorErrors: [
      {
        data: [{ value: Contactor?.ArrayBPSError }],
        name: "Array BPS Error",
      },
      {
        data: [{ value: Contactor?.ArrayContactorError }],
        name: "Array Contactor Error",
      },
      {
        data: [{ value: Contactor?.ArrayPrechargerError }],
        name: "Array Precharger Error",
      },
      {
        data: [{ value: Contactor?.ChargeBPSError }],
        name: "Charge BPS Error",
      },
      {
        data: [{ value: Contactor?.ChargeContactorError }],
        name: "Charge Contactor Error",
      },
      {
        data: [{ value: Contactor?.ChargePrechargerError }],
        name: "Charge Precharger Error",
      },
      {
        data: [{ value: Contactor?.CommonContactorError }],
        name: "Common Contactor Error",
      },
      {
        data: [{ value: Contactor?.CommonContactorOpeningError }],
        name: "Common Contactor Opening Error",
      },
      {
        data: [{ value: Contactor?.CommonPrechargerError }],
        name: "Common Precharger Error",
      },
      {
        data: [{ value: Contactor?.LvBpsError }],
        name: "LV BPS Error",
      },
      {
        data: [{ value: Contactor?.LvContactorError }],
        name: "LV Contactor Error",
      },
      {
        data: [{ value: Contactor?.LvPrechargerError }],
        name: "LV Precharger Error",
      },
      {
        data: [{ value: Contactor?.MotorBPSError }],
        name: "Motor BPS Error",
      },
      {
        data: [{ value: Contactor?.MotorContactorError }],
        name: "Motor Contactor Error",
      },
      {
        data: [{ value: Contactor?.MotorPrechargerError }],
        name: "Motor Precharger Error",
      },
    ] as I_PISField[],

    MBMS: [
      {
        data: [{ value: MBMS?.AbattDisable }],
        name: "Abatt Disable",
      },
      {
        data: [{ value: MBMS?.ArrayContactorCommand }],
        name: "Array Contactor Command",
      },
      {
        data: [
          { unit: UnitType.VOLTAGE, value: MBMS?.AuxiliaryBatteryVoltage },
        ],
        name: "Auxiliary Battery Voltage",
      },
      {
        data: [{ value: MBMS?.ChargeContactorCommand }],
        name: "Charge Contactor Command",
      },
      {
        data: [{ value: MBMS?.ChargeEnable }],
        name: "Charge Enable",
      },
      {
        data: [{ value: MBMS?.ChargeSafety }],
        name: "Charge Safety",
      },
      {
        data: [{ value: MBMS?.ChargeShouldTrip }],
        name: "Charge Should Trip",
      },
      {
        data: [{ value: MBMS?.ChgFault }],
        name: "Charge Fault",
      },
      {
        data: [{ value: MBMS?.ChgOn }],
        name: "Charge On",
      },
      {
        data: [{ value: MBMS?.CommonContactorCommand }],
        name: "Common Contactor Command",
      },
      {
        data: [{ value: MBMS?.DcdcFault }],
        name: "DCDC Fault",
      },
      {
        data: [{ value: MBMS?.DcdcOn }],
        name: "DCDC On",
      },
      {
        data: [{ value: MBMS?.DischargeEnable }],
        name: "Discharge Enable",
      },
      {
        data: [{ value: MBMS?.DischargeShouldTrip }],
        name: "Discharge Should Trip",
      },
      {
        data: [{ value: MBMS?.En1 }],
        name: "EN 1",
      },
      {
        data: [{ value: MBMS?.EsdEnabledTrip }],
        name: "Esd Enabled Trip",
      },
      {
        data: [{ value: MBMS?.ExternalShutdown }],
        name: "External Shutdown",
      },
      {
        data: [{ value: MBMS?.Key }],
        name: "Key",
      },
      {
        data: [{ value: MBMS?.LvContactorCommand }],
        name: "LV Contactor Command",
      },
      {
        data: [{ value: MBMS?.MainPowerSwitch }],
        name: "Main Power Switch",
      },
      {
        data: [{ value: MBMS?.MotorContactorCommand }],
        name: "Motor Contactor Command",
      },
      {
        data: [{ value: MBMS?.OrionCanReceivedRecently }],
        name: "Orion CAN Received Recently",
      },
      {
        data: [{ value: MBMS?.StartupState }],
        name: "Startup State",
      },
      {
        data: [{ value: MBMS?.SystemState }],
        name: "System State",
      },
      {
        data: [{ value: MBMS?.ThreeAOc }],
        name: "Three AOC",
      },
    ] as I_PISField[],

    MBMSErrors: [
      {
        data: [{ value: MBMS?.ArrayHeartbeatDeadTrip }],
        name: "Array Heartbeat Dead Trip",
      },
      {
        data: [{ value: MBMS?.ArrayHighCurrentTrip }],
        name: "Array High Current Trip",
      },
      {
        data: [{ value: MBMS?.ArrayHighCurrentWarning }],
        name: "Array High Current Warning",
      },
      {
        data: [{ value: MBMS?.CanOc12VWarning }],
        name: "CAN OC 12V Warning",
      },
      {
        data: [{ value: MBMS?.ChargeHeartbeatDeadTrip }],
        name: "Charge Heartbeat Dead Trip",
      },
      {
        data: [{ value: MBMS?.ChargeHighCurrentTrip }],
        name: "Charge High Current Trip",
      },
      {
        data: [{ value: MBMS?.ChargeHighCurrentWarning }],
        name: "Charge High Current Warning",
      },
      {
        data: [{ value: MBMS?.CommonHeartbeatDeadTrip }],
        name: "Common Heartbeat Dead Trip",
      },
      {
        data: [{ value: MBMS?.CommonHighCurrentTrip }],
        name: "Common High Current Trip",
      },
      {
        data: [{ value: MBMS?.CommonHighCurrentWarning }],
        name: "Common High Current Warning",
      },
      {
        data: [{ value: MBMS?.ContactorConnectedUnexpectedlyTrip }],
        name: "Contactor Connected Unexpectedly Trip",
      },
      {
        data: [{ value: MBMS?.ContactorDisconnectedUnexpectedlyTrip }],
        name: "Contactor Disconnected Unexpectedly Trip",
      },
      {
        data: [{ value: MBMS?.EsdEnabledTrip }],
        name: "Esd Enabled Trip",
      },
      {
        data: [{ value: MBMS?.Heartbeat }],
        name: "No MBMS Heartbeat For 2.5s",
      },
      {
        data: [{ value: MBMS?.HighCellVoltageTrip }],
        name: "High Cell Voltage Trip",
      },
      {
        data: [{ value: MBMS?.HighCellVoltageWarning }],
        name: "High Cell Voltage Warning",
      },
      {
        data: [{ value: MBMS?.HighTemperatureTrip }],
        name: "High Temperature Trip",
      },
      {
        data: [{ value: MBMS?.HighTemperatureWarning }],
        name: "High Temperature Warning",
      },
      {
        data: [{ value: MBMS?.LowCellVoltageTrip }],
        name: "Low Cell Voltage Trip",
      },
      {
        data: [{ value: MBMS?.LowCellVoltageWarning }],
        name: "Low Cell Voltage Warning",
      },
      {
        data: [{ value: MBMS?.LvHeartbeatDeadTrip }],
        name: "LV Heartbeat Dead Trip",
      },
      {
        data: [{ value: MBMS?.LvHighCurrentTrip }],
        name: "LV High Current Trip",
      },
      {
        data: [{ value: MBMS?.LvHighCurrentWarning }],
        name: "LV High Current Warning",
      },
      {
        data: [{ value: MBMS?.MotorHeartbeatDeadTrip }],
        name: "Motor Heartbeat Dead Trip",
      },
      {
        data: [{ value: MBMS?.MotorHighCurrentTrip }],
        name: "Motor High Current Trip",
      },
      {
        data: [{ value: MBMS?.MotorHighCurrentWarning }],
        name: "Motor High Current Warning",
      },
      {
        data: [{ value: MBMS?.MpsDisabledTrip }],
        name: "MPS Disabled Trip",
      },
      {
        data: [{ value: MBMS?.OrionMessageTimeoutTrip }],
        name: "Orion Message Timeout Trip",
      },
      {
        data: [{ value: MBMS?.ProtectionTrip }],
        name: "Protection Trip",
      },
      {
        data: [{ value: MBMS?.StrobeBmsLight }],
        name: "Strobe SOS",
      },
    ] as I_PISField[],

    MBMSRelayStatusFlags: [
      {
        data: [{ expectedBool: true, value: Battery?.BmuAlive }],
        name: "Heartbeat", //this is the bigger heartbeat
      },
      {
        data: [
          {
            value: Battery?.DischargeRelayEnabled,
          },
        ],
        name: "Discharge Relay Enabled",
      },
      {
        data: [
          {
            value: Battery?.ChargeRelayEnabled,
          },
        ],
        name: "Charge Relay Enabled",
      },
      {
        data: [
          {
            value: Battery?.ChargerSafetyEnabled,
          },
        ],
        name: "Charger Safety Enabled",
      },
      {
        data: [
          {
            value: Battery?.MultiPurposeInputSignalStatus,
          },
        ],
        name: "Multipurpose Input Signal",
      },
      {
        data: [
          {
            value: Battery?.IsReadySignalStatus,
          },
        ],
        name: "Is Ready",
      },
      {
        data: [
          {
            value: Battery?.IsChargingSignalStatus,
          },
        ],
        name: "Is Charging",
      },
      {
        data: [
          {
            value: Battery?.MalfunctionIndicatorActive,
          },
        ],
        name: "Malfunction Indicator Active",
      },
      {
        data: [
          {
            value: Battery?.AlwaysOnSignalStatus,
          },
        ],
        name: "Always On",
      },
    ] as I_PISField[],
  };

  return data;
};

export default Mbms;
