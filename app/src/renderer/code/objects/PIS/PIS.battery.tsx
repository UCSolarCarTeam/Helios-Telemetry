import { usePacket } from "../../contexts/PacketContext";
import I_PIS, { I_PISField } from "./PIS.interface";

const Battery = (): I_PIS => {
  const { currentPacket } = usePacket();
  const data = {
    BMSRelayStatusFlags: [
      {
        Name: "Heartbeat", //this is the bigger heartbeat
        data: [{ value: currentPacket?.Battery?.Alive }],
      },
      {
        Name: "Discharge Relay Enabled",
        data: [
          {
            value:
              currentPacket?.Battery?.BMSRelayStatusFlags
                ?.DischargeRelayEnabled,
          },
        ],
      },
      {
        Name: "Charge Relay Enabled",
        data: [
          {
            value:
              currentPacket?.Battery?.BMSRelayStatusFlags?.ChargeRelayEnabled,
          },
        ],
      },
      {
        Name: "Charger Safety Enabled",
        data: [
          {
            value:
              currentPacket?.Battery?.BMSRelayStatusFlags?.ChargerSafetyEnabled,
          },
        ],
      },
      {
        Name: "Multipurpose Input Signal",
        data: [
          {
            value:
              currentPacket?.Battery?.BMSRelayStatusFlags
                ?.MultiPurposeInputSignalStatus,
          },
        ],
      },
      {
        Name: "Is Ready",
        data: [
          {
            value:
              currentPacket?.Battery?.BMSRelayStatusFlags?.IsReadySignalStatus,
          },
        ],
      },
      {
        Name: "Is Charging",
        data: [
          {
            value:
              currentPacket?.Battery?.BMSRelayStatusFlags
                ?.IsChargingSignalStatus,
          },
        ],
      },
      {
        Name: "Malfunction Indicator Active",
        data: [
          {
            value:
              currentPacket?.Battery?.BMSRelayStatusFlags
                ?.MalfunctionIndicatorActive,
          },
        ],
      },
      {
        Name: "Always On",
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
        Name: "Fan Voltage",
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
        Name: "Fan Speed",
        data: [{ value: currentPacket?.Battery?.FanSpeed, min: 0, max: 100 }],
      },
      {
        Name: "Requested Fan Speed",
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
        Name: "Battery Temperature",
        FString: "%s (%s) - %s (%s)",
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
        Name: "Average Temperature",
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
        Name: "Internal Temperature",
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
        Name: "Battery Cell Voltage",
        FString: "%s (%s) - %s (%s)",
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
        Name: "Battery Average Voltage",
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
        Name: "Battery Populated Cells",
        data: [
          { value: currentPacket?.Battery?.PopulatedCells, min: 0, max: 100 },
        ],
      },
    ] as I_PISField[],

    Pack: [
      {
        Name: "Pack Current",
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
        Name: "Pack Voltage",
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
        Name: "Pack Amphours",
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
        Name: "Pack State of Charge",
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
        Name: "Pack Depth of Discharge",
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
        Name: "12V Input Voltage",
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
        Name: "Heartbeat",
        data: [{ value: currentPacket?.AuxBms?.AuxBmsAlive }],
      },
      {
        Name: "Strobe BMS",
        data: [{ value: currentPacket?.AuxBms?.StrobeBmsLight }],
      },
      {
        Name: "Allow Charge",
        data: [{ value: currentPacket?.AuxBms?.AllowCharge }],
      },
      {
        Name: "Allow Discharge",
        data: [{ value: currentPacket?.AuxBms?.AllowDischarge }],
      },
      {
        Name: "High Voltage Enable",
        data: [{ value: currentPacket?.AuxBms?.HighVoltageEnableState }],
      },
      {
        Name: "Orion CAN Received",
        data: [{ value: currentPacket?.AuxBms?.OrionCANReceivedRecently }],
      },
      {
        Name: "Discharge Should Trip",
        data: [{ value: currentPacket?.AuxBms?.DischargeShouldTrip }],
      },
      {
        Name: "Charge Should Trip",
        data: [{ value: currentPacket?.AuxBms?.ChargeShouldTrip }],
      },
      {
        Name: "Charge Open but Should be Closed",
        data: [{ value: currentPacket?.AuxBms?.ChargeOpenButShouldBeClosed }],
      },
      {
        Name: "Discharge Open but Should be Closed",
        data: [
          { value: currentPacket?.AuxBms?.DischargeOpenButShouldBeClosed },
        ],
      },
      {
        Name: "Aux Voltage",
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
        Name: "Precharge State",
        data: [{ value: currentPacket?.AuxBms?.PrechargeState }],
      },
      {
        Name: "Charge Contactor Error",
        data: [{ value: currentPacket?.AuxBms?.ChargeContactorError }],
      },
      {
        Name: "Charge Trip Due To High Cell Voltage",
        data: [
          { value: currentPacket?.AuxBms?.ChargeTripDueToHighCellVoltage },
        ],
      },
      {
        Name: "Charge Trip Due To High Temperature And Current",
        data: [
          {
            value:
              currentPacket?.AuxBms?.ChargeTripDueToHighTemperatureAndCurrent,
          },
        ],
      },
      {
        Name: "Charge Trip Due To Pack Current",
        data: [{ value: currentPacket?.AuxBms?.ChargeTripDueToPackCurrent }],
      },
      {
        Name: "Common Contactor Error",
        data: [{ value: currentPacket?.AuxBms?.CommonContactorError }],
      },
      {
        Name: "Discharge Contactor Error",
        data: [{ value: currentPacket?.AuxBms?.DischargeContactorError }],
      },
      {
        Name: "Discharge Trip Due To High Temperature And Current",
        data: [
          {
            value:
              currentPacket?.AuxBms
                ?.DischargeTripDueToHighTemperatureAndCurrent,
          },
        ],
      },
      {
        Name: "Discharge Trip Due To Low Cell Voltage",
        data: [
          { value: currentPacket?.AuxBms?.DischargeTripDueToLowCellVoltage },
        ],
      },
      {
        Name: "Discharge Trip Due To Pack Current",
        data: [{ value: currentPacket?.AuxBms?.DischargeTripDueToPackCurrent }],
      },
      {
        Name: "Protection Trip",
        data: [{ value: currentPacket?.AuxBms?.ProtectionTrip }],
      },
      {
        Name: "Trip Due To Orion Message Timeout",
        data: [{ value: currentPacket?.AuxBms?.TripDueToOrionMessageTimeout }],
      },
      {
        Name: "Charge Not Closed Due To High Current",
        data: [
          { value: currentPacket?.AuxBms?.ChargeNotClosedDueToHighCurrent },
        ],
      },
      {
        Name: "Discharge Not Closed Due To High Current",
        data: [
          { value: currentPacket?.AuxBms?.DischargeNotClosedDueToHighCurrent },
        ],
      },
    ] as I_PISField[],
  };

  return data;
};

export default Battery;
