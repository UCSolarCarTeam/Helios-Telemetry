import { usePacket } from "@/contexts/PacketContext";
import type I_PIS from "@/objects/PIS/PIS.interface";
import { type I_PISField } from "@/objects/PIS/PIS.interface";
import { UnitType } from "@/objects/PIS/PIS.interface";

const Battery = (): I_PIS => {
  const { currentPacket } = usePacket();
  const data = {
    AuxBMS: [
      {
        data: [{ value: currentPacket?.AuxBms?.AuxBmsAlive }],
        name: "Heartbeat",
      },
      {
        data: [{ value: currentPacket?.AuxBms?.StrobeBmsLight }],
        name: "Strobe BMS",
      },
      {
        data: [{ value: currentPacket?.AuxBms?.AllowCharge }],
        name: "Allow Charge",
      },
      {
        data: [{ value: currentPacket?.AuxBms?.AllowDischarge }],
        name: "Allow Discharge",
      },
      {
        data: [{ value: currentPacket?.AuxBms?.HighVoltageEnableState }],
        name: "High Voltage Enable",
      },
      {
        data: [{ value: currentPacket?.AuxBms?.OrionCANReceivedRecently }],
        name: "Orion CAN Received",
      },
      {
        data: [{ value: currentPacket?.AuxBms?.DischargeShouldTrip }],
        name: "Discharge Should Trip",
      },
      {
        data: [{ value: currentPacket?.AuxBms?.ChargeShouldTrip }],
        name: "Charge Should Trip",
      },
      {
        data: [{ value: currentPacket?.AuxBms?.ChargeOpenButShouldBeClosed }],
        name: "Charge Open but Should be Closed",
      },
      {
        data: [
          { value: currentPacket?.AuxBms?.DischargeOpenButShouldBeClosed },
        ],
        name: "Discharge Open but Should be Closed",
      },
      {
        data: [
          {
            max: 100,
            min: 0,
            unit: UnitType.MILLIVOLTS,
            value: currentPacket?.AuxBms?.AuxVoltage,
          },
        ],
        name: "Aux Voltage",
      },
      {
        data: [{ value: currentPacket?.AuxBms?.PrechargeState }],
        name: "Precharge State",
      },
      {
        data: [{ value: currentPacket?.AuxBms?.ChargeContactorError }],
        name: "Charge Contactor Error",
      },
      {
        data: [
          { value: currentPacket?.AuxBms?.ChargeTripDueToHighCellVoltage },
        ],
        name: "Charge Trip Due To High Cell Voltage",
      },
      {
        data: [
          {
            value:
              currentPacket?.AuxBms?.ChargeTripDueToHighTemperatureAndCurrent,
          },
        ],
        name: "Charge Trip Due To High Temperature And Current",
      },
      {
        data: [{ value: currentPacket?.AuxBms?.ChargeTripDueToPackCurrent }],
        name: "Charge Trip Due To Pack Current",
      },
      {
        data: [{ value: currentPacket?.AuxBms?.CommonContactorError }],
        name: "Common Contactor Error",
      },
      {
        data: [{ value: currentPacket?.AuxBms?.DischargeContactorError }],
        name: "Discharge Contactor Error",
      },
      {
        data: [
          {
            value:
              currentPacket?.AuxBms
                ?.DischargeTripDueToHighTemperatureAndCurrent,
          },
        ],
        name: "Discharge Trip Due To High Temperature And Current",
      },
      {
        data: [
          { value: currentPacket?.AuxBms?.DischargeTripDueToLowCellVoltage },
        ],
        name: "Discharge Trip Due To Low Cell Voltage",
      },
      {
        data: [{ value: currentPacket?.AuxBms?.DischargeTripDueToPackCurrent }],
        name: "Discharge Trip Due To Pack Current",
      },
      {
        data: [{ value: currentPacket?.AuxBms?.ProtectionTrip }],
        name: "Protection Trip",
      },
      {
        data: [{ value: currentPacket?.AuxBms?.TripDueToOrionMessageTimeout }],
        name: "Trip Due To Orion Message Timeout",
      },
      {
        data: [
          { value: currentPacket?.AuxBms?.ChargeNotClosedDueToHighCurrent },
        ],
        name: "Charge Not Closed Due To High Current",
      },
      {
        data: [
          { value: currentPacket?.AuxBms?.DischargeNotClosedDueToHighCurrent },
        ],
        name: "Discharge Not Closed Due To High Current",
      },
    ] as I_PISField[],

    BMSRelayStatusFlags: [
      {
        data: [{ expectedBool: true, value: currentPacket?.Battery?.Alive }],
        name: "Heartbeat", //this is the bigger heartbeat
      },
      {
        data: [
          {
            value:
              currentPacket?.Battery?.BMSRelayStatusFlags
                ?.DischargeRelayEnabled,
          },
        ],
        name: "Discharge Relay Enabled",
      },
      {
        data: [
          {
            value:
              currentPacket?.Battery?.BMSRelayStatusFlags?.ChargeRelayEnabled,
          },
        ],
        name: "Charge Relay Enabled",
      },
      {
        data: [
          {
            value:
              currentPacket?.Battery?.BMSRelayStatusFlags?.ChargerSafetyEnabled,
          },
        ],
        name: "Charger Safety Enabled",
      },
      {
        data: [
          {
            value:
              currentPacket?.Battery?.BMSRelayStatusFlags
                ?.MultiPurposeInputSignalStatus,
          },
        ],
        name: "Multipurpose Input Signal",
      },
      {
        data: [
          {
            value:
              currentPacket?.Battery?.BMSRelayStatusFlags?.IsReadySignalStatus,
          },
        ],
        name: "Is Ready",
      },
      {
        data: [
          {
            value:
              currentPacket?.Battery?.BMSRelayStatusFlags
                ?.IsChargingSignalStatus,
          },
        ],
        name: "Is Charging",
      },
      {
        data: [
          {
            value:
              currentPacket?.Battery?.BMSRelayStatusFlags
                ?.MalfunctionIndicatorActive,
          },
        ],
        name: "Malfunction Indicator Active",
      },
      {
        data: [
          {
            value:
              currentPacket?.Battery?.BMSRelayStatusFlags?.AlwaysOnSignalStatus,
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
            value: currentPacket?.Battery?.LowCellVoltage,
          },
          { value: currentPacket?.Battery?.LowCellVoltageId },
          {
            max: 100,
            min: 0,
            unit: UnitType.VOLTAGE,
            value: currentPacket?.Battery?.HighCellVoltage,
          },
          { value: currentPacket?.Battery?.HighCellVoltageId },
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
            value: currentPacket?.Battery?.AverageCellVoltage,
          },
        ],
        name: "Battery Average Voltage",
      },
      {
        data: [
          { max: 100, min: 0, value: currentPacket?.Battery?.PopulatedCells },
        ],
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
            value: currentPacket?.Battery?.FanVoltage,
          },
        ],
        name: "Fan Voltage",
      },
      {
        data: [{ max: 100, min: 0, value: currentPacket?.Battery?.FanSpeed }],
        name: "Fan Speed",
      },
      {
        data: [
          {
            max: 100,
            min: 0,
            unit: UnitType.VOLTAGE,
            value: currentPacket?.Battery?.RequestedFanSpeed,
          },
        ],
        name: "Requested Fan Speed",
      },
    ] as I_PISField[],

    Pack: [
      {
        data: [
          {
            max: 100,
            min: 0,
            unit: UnitType.AMPERAGE,
            value: currentPacket?.Battery?.PackCurrent,
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
            value: currentPacket?.Battery?.PackVoltage,
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
            value: currentPacket?.Battery?.PackAmphours,
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
            value: currentPacket?.Battery?.PackStateOfCharge,
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
            value: currentPacket?.Battery?.PackDepthOfDischarge,
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
            value: currentPacket?.Battery["12vInputVoltage"],
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
            value: currentPacket?.Battery?.LowTemperature,
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
            value: currentPacket?.Battery?.HighTemperature,
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
            value: currentPacket?.Battery?.AverageTemperature,
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
            value: currentPacket?.Battery?.InternalTemperature,
          },
        ],
        name: "Internal Temperature",
      },
    ] as I_PISField[],
  };

  return data;
};

export default Battery;
