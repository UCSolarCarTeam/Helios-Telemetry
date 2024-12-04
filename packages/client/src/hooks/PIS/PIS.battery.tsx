import { usePacket } from "@/contexts/PacketContext";
import type I_PIS from "@/objects/PIS/PIS.interface";
import { type I_PISField } from "@/objects/PIS/PIS.interface";
import { UnitType } from "@/objects/PIS/PIS.interface";

const Battery = (): I_PIS => {
  const { currentPacket } = usePacket();
  const { Battery, MBMS } = currentPacket;
  const { BatteryCell, BatteryFan, BatteryPack, BatteryTemperature } =
    currentPacket?.Battery;
  //  Battery will now have be split into the faults and the warning and here we will simply show what everything means
  const data = {
    BMSRelayStatusFlags: [
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

    Cell: [
      {
        data: [
          {
            max: 100,
            min: 0,
            unit: UnitType.VOLTAGE,
            value: BatteryCell?.LowCellVoltage,
          },
          { value: BatteryCell?.LowCellVoltageId },
          {
            max: 100,
            min: 0,
            unit: UnitType.VOLTAGE,
            value: BatteryCell?.HighCellVoltage,
          },
          { value: BatteryCell?.HighCellVoltageId },
        ],
        fstring: "%s (%s) - %s (%s)",
        name: "Battery Cell Voltage",
      },
      {
        data: [
          {
            max: 100,
            min: 0,
            unit: UnitType.VOLTAGE,
            value: BatteryCell?.AverageCellVoltage,
          },
        ],
        name: "Battery Average Voltage",
      },
      {
        data: [{ max: 100, min: 0, value: BatteryCell?.PopulatedCells }],
        name: "Battery Populated Cells",
      },
    ] as I_PISField[],

    Fan: [
      {
        data: [
          {
            max: 100,
            min: 0,
            unit: UnitType.VOLTAGE,
            value: BatteryFan.FanVoltage,
          },
        ],
        name: "Fan Voltage",
      },
      {
        data: [{ max: 100, min: 0, value: BatteryFan?.FanSpeed }],
        name: "Fan Speed",
      },
      {
        data: [
          {
            max: 100,
            min: 0,
            unit: UnitType.VOLTAGE,
            value: BatteryFan?.RequestedFanSpeed,
          },
        ],
        name: "Requested Fan Speed",
      },
    ] as I_PISField[],

    MBMS: [
      {
        data: [{ value: MBMS?.AllowCharge }],
        name: "Allow Charge",
      },
      {
        data: [{ value: MBMS?.AllowDischarge }],
        name: "Allow Discharge",
      },
      {
        data: [{ value: MBMS?.ArrayContactorError }],
        value: "Array Contactor Error",
      },
      {
        data: [{ value: MBMS?.ArrayContactorState }],
        name: "Array Contractor State",
      },
      {
        data: [{ unit: UnitType.AMPERAGE, value: MBMS?.ArrayCurrent }],
        name: "Array Current",
      },
      {
        data: [{ value: MBMS?.ArrayHighTemperatureCurrentTrip }],
        name: "Array High Temperature Current Trip",
      },
      //TODO: Units V or mV
      {
        data: [{ value: MBMS?.ArrayVoltage }],
        name: "Array Voltage",
      },
      // TODO: Units V or mV
      {
        data: [
          { unit: UnitType.MILLIVOLTS, value: MBMS?.AuxillaryBatteryVoltage },
        ],
        name: "Auxillary Battery Voltage",
      },
      {
        data: [{ value: MBMS?.ChargeContactorError }],
        name: "Charge Contactor Error",
      },
      {
        data: [{ value: MBMS?.ChargeContactorState }],
        name: "Charge Contactor State",
      },
      // TODO: Units A, or mA
      {
        data: [{ unit: UnitType.AMPERAGE, value: MBMS?.ChargeCurrent }],
        name: "Charge Current",
      },
      {
        data: [{ value: MBMS?.ChargeHighTemperatureCurrentTrip }],
        name: "Charge High Temperature Current Trip",
      },
      {
        data: [{ value: MBMS?.ChargeShouldTrip }],
        name: "Charge Should Trip",
      },

      // TODO: Units V or mV
      {
        data: [{ unit: UnitType.VOLTAGE, value: MBMS?.ChargeVoltage }],
        name: "Charge Voltage",
      },
      {
        data: [{ value: MBMS?.CommonContactorError }],
        name: "Common Contactor Error",
      },
      {
        data: [{ value: MBMS?.CommonContactorState }],
        name: "Common Contactor State",
      },
      // TODO: Units A or mA
      {
        data: [{ unit: UnitType.AMPERAGE, value: MBMS?.CommonCurrent }],
        name: "Common Current",
      },
      {
        data: [{ value: MBMS?.ContactorDisconnectedUnexpectedlyTrip }],
        name: "ContactorDisconnectedUnexpectedlyTrip",
      },
      {
        data: [{ value: MBMS?.DischargeShouldTrip }],
        name: "Discharge Should Trip",
      },
      {
        data: [{ value: MBMS?.HighCellVoltageTrip }],
        name: "High Cell Voltage Trip",
      },
      {
        data: [{ value: MBMS?.HighCommonCurrentTrip }],
        name: "High Common Current Trip",
      },
      {
        data: [{ value: MBMS?.HighVoltageEnableState }],
        name: "High Voltage Enable State",
      },
      {
        data: [{ value: MBMS?.LowCellVoltageTrip }],
        name: "Low Cell Voltage Trip",
      },
      {
        data: [{ value: MBMS?.LvContactorError }],
        name: "Lv Contactor Error",
      },
      {
        data: [{ value: MBMS?.LvContactorState }],
        name: "Lv Contactor State",
      },
      // TODO: Units, A or mA
      { data: [{ value: MBMS?.LvCurrent }], name: "Lv Current" },
      {
        data: [{ value: MBMS?.LvHighTemperatureCurrentTrip }],
        name: "Lv High Temperature Current Trip",
      },
      // TODO: Units, V or mV
      {
        data: [{ value: MBMS?.LvVoltage }],
        name: "Lv Voltage",
      },
      {
        data: [{ value: MBMS?.MotorContactorError }],
        name: "Motor Contactor Error",
      },
      {
        data: [{ value: MBMS?.MotorContactorState }],
        name: "Motor Contactor State",
      },
      // TODO: Units A or mA
      {
        data: [{ unit: UnitType.AMPERAGE, value: MBMS?.MotorCurrent }],
        name: "Motor Current",
      },
      {
        data: [{ value: MBMS?.MotorHighTemperatureCurrentTrip }],
        name: "Motor High Temperature Current Trip",
      },
      // TODO: Units V or mV
      {
        data: [{ value: MBMS?.MotorVoltage }],
        name: "Motor Voltage",
      },
      {
        data: [{ value: MBMS?.OrionCanReceivedRecently }],
        name: "Orion CAN Received Recently",
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
        name: " Strobe BMS Light",
      },
    ] as I_PISField[],

    Pack: [
      {
        data: [
          {
            max: 100,
            min: 0,
            unit: UnitType.AMPERAGE,
            value: BatteryPack?.PackCurrent,
          },
        ],
        name: "Pack Current",
      },
      {
        data: [
          {
            max: 100,
            min: 0,
            unit: UnitType.VOLTAGE,
            value: BatteryPack?.PackVoltage,
          },
        ],
        name: "Pack Voltage",
      },
      {
        data: [
          {
            max: 100,
            min: 0,
            unit: UnitType.AMPHOUR,
            value: BatteryPack?.PackAmphours,
          },
        ],
        name: "Pack Amphours",
      },
      {
        data: [
          {
            max: 100,
            min: 0,
            unit: "%",
            value: BatteryPack?.PackStateOfCharge,
          },
        ],
        name: "Pack State of Charge",
      },
      {
        data: [
          {
            max: 100,
            min: 0,
            unit: "%",
            value: BatteryPack?.PackDepthOfDischarge,
          },
        ],
        name: "Pack Depth of Discharge",
      },
      {
        data: [
          {
            max: 100,
            min: 0,
            unit: UnitType.VOLTAGE,
            value: BatteryPack?.Input12V,
          },
        ],
        name: "12V Input Voltage",
      },
    ] as I_PISField[],

    Temperature: [
      {
        data: [
          {
            hover: "Low Cell Temperature",
            max: 25,
            min: 10,
            unit: UnitType.TEMP,
            value: BatteryTemperature?.LowTemperature,
          },
          {
            hover: "Low Cell ID",
            value: currentPacket?.Battery?.LowThermistorId,
          },
          {
            hover: "High Cell Temperature",
            max: 75,
            min: 50,
            unit: UnitType.TEMP,
            value: BatteryTemperature?.HighTemperature,
          },
          {
            hover: "High Cell ID",
            value: currentPacket?.Battery?.HighThermistorId,
          },
        ],
        fstring: "%s (%s) - %s (%s)",
        name: "Battery Temperature",
      },
      {
        data: [
          {
            max: 100,
            min: 0,
            unit: UnitType.TEMP,
            value: BatteryTemperature?.AverageTemperature,
          },
        ],
        name: "Average Temperature",
      },
      {
        data: [
          {
            max: 100,
            min: 0,
            unit: UnitType.TEMP,
            value: BatteryTemperature?.InternalTemperature,
          },
        ],
        name: "Internal Temperature",
      },
    ] as I_PISField[],
  };

  return data;
};

export default Battery;
