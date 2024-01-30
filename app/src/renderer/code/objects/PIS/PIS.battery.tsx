import { usePacket } from "../../contexts/PacketContext";
import I_PIS, { I_PISField } from "./PIS.interface";

const Battery = (): I_PIS => {
  const { currentPacket } = usePacket();
  const data = {
    BMSRelayStatusFlags: [
      {
        name: "Heartbeat", //this is the bigger heartbeat
        data: [{ value: currentPacket?.Battery?.Alive, expectedBool: true }],
      },
      {
        name: "Discharge Relay Enabled",
        data: [
          {
            value:
              currentPacket?.Battery?.BMSRelayStatusFlags
                ?.DischargeRelayEnabled,
          },
        ],
      },
      {
        name: "Charge Relay Enabled",
        data: [
          {
            value:
              currentPacket?.Battery?.BMSRelayStatusFlags?.ChargeRelayEnabled,
          },
        ],
      },
      {
        name: "Charger Safety Enabled",
        data: [
          {
            value:
              currentPacket?.Battery?.BMSRelayStatusFlags?.ChargerSafetyEnabled,
          },
        ],
      },
      {
        name: "Multipurpose Input Signal",
        data: [
          {
            value:
              currentPacket?.Battery?.BMSRelayStatusFlags
                ?.MultiPurposeInputSignalStatus,
          },
        ],
      },
      {
        name: "Is Ready",
        data: [
          {
            value:
              currentPacket?.Battery?.BMSRelayStatusFlags?.IsReadySignalStatus,
          },
        ],
      },
      {
        name: "Is Charging",
        data: [
          {
            value:
              currentPacket?.Battery?.BMSRelayStatusFlags
                ?.IsChargingSignalStatus,
          },
        ],
      },
      {
        name: "Malfunction Indicator Active",
        data: [
          {
            value:
              currentPacket?.Battery?.BMSRelayStatusFlags
                ?.MalfunctionIndicatorActive,
          },
        ],
      },
      {
        name: "Always On",
        data: [
          {
            value:
              currentPacket?.Battery?.BMSRelayStatusFlags?.AlwaysOnSignalStatus,
          },
        ],
      },
    ] as I_PISField[],

    Fan: [
      {
        name: "Fan Voltage",
        data: [
          {
            value: currentPacket?.Battery?.FanVoltage,
            unit: "V",
            min: 0,
            max: 100,
          },
        ],
      },
      {
        name: "Fan Speed",
        data: [{ value: currentPacket?.Battery?.FanSpeed, min: 0, max: 100 }],
      },
      {
        name: "Requested Fan Speed",
        data: [
          {
            value: currentPacket?.Battery?.RequestedFanSpeed,
            unit: "V",
            min: 0,
            max: 100,
          },
        ],
      },
    ] as I_PISField[],

    Temperature: [
      {
        name: "Battery Temperature",
        fstring: "%s (%s) - %s (%s)",
        data: [
          {
            value: currentPacket?.Battery?.LowTemperature,
            unit: "°C",
            min: 10,
            max: 25,
            hover: "Low Cell Temperature",
          },
          {
            value: currentPacket?.Battery?.LowThermistorId,
            hover: "Low Cell ID",
          },
          {
            value: currentPacket?.Battery?.HighTemperature,
            unit: "°C",
            min: 50,
            max: 75,
            hover: "High Cell Temperature",
          },
          {
            value: currentPacket?.Battery?.HighThermistorId,
            hover: "High Cell ID",
          },
        ],
      },
      {
        name: "Average Temperature",
        data: [
          {
            value: currentPacket?.Battery?.AverageTemperature,
            unit: "°C",
            min: 0,
            max: 100,
          },
        ],
      },
      {
        name: "Internal Temperature",
        data: [
          {
            value: currentPacket?.Battery?.InternalTemperature,
            unit: "°C",
            min: 0,
            max: 100,
          },
        ],
      },
    ] as I_PISField[],

    Cell: [
      {
        name: "Battery Cell Voltage",
        fstring: "%s (%s) - %s (%s)",
        data: [
          {
            value: currentPacket?.Battery?.LowCellVoltage,
            unit: "V",
            min: 0,
            max: 100,
          },
          { value: currentPacket?.Battery?.LowCellVoltageId },
          {
            value: currentPacket?.Battery?.HighCellVoltage,
            unit: "V",
            min: 0,
            max: 100,
          },
          { value: currentPacket?.Battery?.HighCellVoltageId },
        ],
      },
      {
        name: "Battery Average Voltage",
        data: [
          {
            value: currentPacket?.Battery?.AverageCellVoltage,
            unit: "V",
            min: 0,
            max: 100,
          },
        ],
      },
      {
        name: "Battery Populated Cells",
        data: [
          { value: currentPacket?.Battery?.PopulatedCells, min: 0, max: 100 },
        ],
      },
    ] as I_PISField[],

    Pack: [
      {
        name: "Pack Current",
        data: [
          {
            value: currentPacket?.Battery?.PackCurrent,
            unit: "A",
            min: 0,
            max: 100,
          },
        ],
      },
      {
        name: "Pack Voltage",
        data: [
          {
            value: currentPacket?.Battery?.PackVoltage,
            unit: "V",
            min: 0,
            max: 100,
          },
        ],
      },
      {
        name: "Pack Amphours",
        data: [
          {
            value: currentPacket?.Battery?.PackAmphours,
            unit: "Ah",
            min: 0,
            max: 100,
          },
        ],
      },
      {
        name: "Pack State of Charge",
        data: [
          {
            value: currentPacket?.Battery?.PackStateOfCharge,
            unit: "%",
            min: 0,
            max: 100,
          },
        ],
      },
      {
        name: "Pack Depth of Discharge",
        data: [
          {
            value: currentPacket?.Battery?.PackDepthOfDischarge,
            unit: "%",
            min: 0,
            max: 100,
          },
        ],
      },
      {
        name: "12V Input Voltage",
        data: [
          {
            value: currentPacket?.Battery["12vInputVoltage"],
            unit: "V",
            min: 0,
            max: 100,
          },
        ],
      },
    ] as I_PISField[],

    AuxBMS: [
      {
        name: "Heartbeat",
        data: [{ value: currentPacket?.AuxBms?.AuxBmsAlive }],
      },
      {
        name: "Strobe BMS",
        data: [{ value: currentPacket?.AuxBms?.StrobeBmsLight }],
      },
      {
        name: "Allow Charge",
        data: [{ value: currentPacket?.AuxBms?.AllowCharge }],
      },
      {
        name: "Allow Discharge",
        data: [{ value: currentPacket?.AuxBms?.AllowDischarge }],
      },
      {
        name: "High Voltage Enable",
        data: [{ value: currentPacket?.AuxBms?.HighVoltageEnableState }],
      },
      {
        name: "Orion CAN Received",
        data: [{ value: currentPacket?.AuxBms?.OrionCANReceivedRecently }],
      },
      {
        name: "Discharge Should Trip",
        data: [{ value: currentPacket?.AuxBms?.DischargeShouldTrip }],
      },
      {
        name: "Charge Should Trip",
        data: [{ value: currentPacket?.AuxBms?.ChargeShouldTrip }],
      },
      {
        name: "Charge Open but Should be Closed",
        data: [{ value: currentPacket?.AuxBms?.ChargeOpenButShouldBeClosed }],
      },
      {
        name: "Discharge Open but Should be Closed",
        data: [
          { value: currentPacket?.AuxBms?.DischargeOpenButShouldBeClosed },
        ],
      },
      {
        name: "Aux Voltage",
        data: [
          {
            value: currentPacket?.AuxBms?.AuxVoltage,
            unit: "V",
            min: 0,
            max: 100,
          },
        ],
      },
      {
        name: "Precharge State",
        data: [{ value: currentPacket?.AuxBms?.PrechargeState }],
      },
      {
        name: "Charge Contactor Error",
        data: [{ value: currentPacket?.AuxBms?.ChargeContactorError }],
      },
      {
        name: "Charge Trip Due To High Cell Voltage",
        data: [
          { value: currentPacket?.AuxBms?.ChargeTripDueToHighCellVoltage },
        ],
      },
      {
        name: "Charge Trip Due To High Temperature And Current",
        data: [
          {
            value:
              currentPacket?.AuxBms?.ChargeTripDueToHighTemperatureAndCurrent,
          },
        ],
      },
      {
        name: "Charge Trip Due To Pack Current",
        data: [{ value: currentPacket?.AuxBms?.ChargeTripDueToPackCurrent }],
      },
      {
        name: "Common Contactor Error",
        data: [{ value: currentPacket?.AuxBms?.CommonContactorError }],
      },
      {
        name: "Discharge Contactor Error",
        data: [{ value: currentPacket?.AuxBms?.DischargeContactorError }],
      },
      {
        name: "Discharge Trip Due To High Temperature And Current",
        data: [
          {
            value:
              currentPacket?.AuxBms
                ?.DischargeTripDueToHighTemperatureAndCurrent,
          },
        ],
      },
      {
        name: "Discharge Trip Due To Low Cell Voltage",
        data: [
          { value: currentPacket?.AuxBms?.DischargeTripDueToLowCellVoltage },
        ],
      },
      {
        name: "Discharge Trip Due To Pack Current",
        data: [{ value: currentPacket?.AuxBms?.DischargeTripDueToPackCurrent }],
      },
      {
        name: "Protection Trip",
        data: [{ value: currentPacket?.AuxBms?.ProtectionTrip }],
      },
      {
        name: "Trip Due To Orion Message Timeout",
        data: [{ value: currentPacket?.AuxBms?.TripDueToOrionMessageTimeout }],
      },
      {
        name: "Charge Not Closed Due To High Current",
        data: [
          { value: currentPacket?.AuxBms?.ChargeNotClosedDueToHighCurrent },
        ],
      },
      {
        name: "Discharge Not Closed Due To High Current",
        data: [
          { value: currentPacket?.AuxBms?.DischargeNotClosedDueToHighCurrent },
        ],
      },
    ] as I_PISField[],
  };

  return data;
};

export default Battery;
