import {
  FaultLocations,
  ISeverity,
} from "@/components/molecules/HeroMolecules/HeroTypes";
import { usePacket } from "@/contexts/PacketContext";
import type I_PIS from "@/objects/PIS/PIS.interface";
import { type I_PISField } from "@/objects/PIS/PIS.interface";
import { UnitType } from "@/objects/PIS/PIS.interface";

const Battery = (): I_PIS => {
  const { currentPacket } = usePacket();
  const { Battery } = currentPacket;
  //  Battery will now have be split into the faults and the warning and here we will simply show what everything means
  const data = {
    BatteryDetails: [
      {
        data: [
          {
            value: Battery?.AlwaysOnSignalStatus,
          },
        ],
        name: "Always on Signal Status",
      },
      {
        data: [
          {
            value: Battery?.BmuAlive,
          },
        ],
        name: "Bmu Alive",
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
        name: "Charge Safety Enabled",
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
            value: Battery?.IsChargingSignalStatus,
          },
        ],
        name: "Is Charging Signal Status",
      },
      {
        data: [
          {
            value: Battery?.IsReadySignalStatus,
          },
        ],
        name: "Is Ready Signal Status",
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
            value: Battery?.MultiPurposeInputSignalStatus,
          },
        ],
        name: "Multipurpose Input Signal Status",
      },
    ] as I_PISField[],
    BatteryFaults: {
      ErrorFlags: [
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value:
                currentPacket?.BatteryFaults.Errors.InternalCommunicationFault,
            },
          ],
          name: "Internal Communication Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value:
                currentPacket?.BatteryFaults.Errors.InternalConversionFault,
            },
          ],
          name: "Internal Conversion Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: currentPacket?.BatteryFaults.Errors.WeakCellFault,
            },
          ],
          name: "Weak Cell Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: currentPacket?.BatteryFaults.Errors.LowCellVoltageFault,
            },
          ],
          name: "Low Cell Voltage Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: currentPacket?.BatteryFaults.Errors.OpenWiringFault,
            },
          ],
          name: "Open Wiring Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: currentPacket?.BatteryFaults.Errors.CurrentSensorFault,
            },
          ],
          name: "Current Sensor Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: currentPacket?.BatteryFaults.Errors.PackVoltageSensorFault,
            },
          ],
          name: "Pack Voltage Sensor Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: currentPacket?.BatteryFaults.Errors.WeakPackFault,
            },
          ],
          name: "Weak Pack Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: currentPacket?.BatteryFaults.Errors.VoltageRedundancyFault,
            },
          ],
          name: "Voltage Redundancy Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: currentPacket?.BatteryFaults.Errors.FanMonitorFault,
            },
          ],
          name: "Fan Monitor Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: currentPacket?.BatteryFaults.Errors.ThermistorFault,
            },
          ],
          name: "Thermistor Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value:
                currentPacket?.BatteryFaults.Errors.CanbusCommunicationFault,
            },
          ],
          name: "CANBUS Communications Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: currentPacket?.BatteryFaults.Errors.AlwaysOnSupplyFault,
            },
          ],
          name: "Always On Supply Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value:
                currentPacket?.BatteryFaults.Errors.HighVoltageIsolationFault,
            },
          ],
          name: "High Voltage Isolation Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: currentPacket?.BatteryFaults.Errors.PowerSupply12VFault,
            },
          ],
          name: "12V Power Supply Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value:
                currentPacket?.BatteryFaults.Errors.ChargeLimitEnforcementFault,
            },
          ],
          name: "Charge Limit Enforcement Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value:
                currentPacket?.BatteryFaults.Errors.ChargerSafetyRelayFault,
            },
          ],
          name: "Charge Safety Relay Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value:
                currentPacket?.BatteryFaults.Errors
                  .DischargeLimitEnforcementFault,
            },
          ],
          name: "Discharge Limit Enforcement Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value:
                currentPacket?.BatteryFaults.Errors.ChargerSafetyRelayFault,
            },
          ],
          name: "Charger Safety Relay Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: currentPacket?.BatteryFaults.Errors.InternalMemoryFault,
            },
          ],
          name: "Internal Memory Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value:
                currentPacket?.BatteryFaults.Errors.InternalThermistorFault,
            },
          ],
          name: "Internal Thermistors Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: currentPacket?.BatteryFaults.Errors.InternalLogicFault,
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
              value:
                currentPacket?.BatteryFaults.Warnings.DclReducedDueToLowSoc,
            },
          ],
          name: "Dcl Reduced Due To Low Soc",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value:
                currentPacket?.BatteryFaults.Warnings
                  .DclReducedDueToHighCellResistance,
            },
          ],
          name: "Dcl Reduced Due to HighCell Resistance",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value:
                currentPacket?.BatteryFaults.Warnings
                  .DclReducedDueToTemperature,
            },
          ],
          name: "Dcl Reduced Due to Temperature",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value:
                currentPacket?.BatteryFaults.Warnings
                  .DclReducedDueToLowCellVoltage,
            },
          ],
          name: "Dcl Reduced Due to Low Cell Voltage",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value:
                currentPacket?.BatteryFaults.Warnings
                  .DclReducedDueToLowPackVoltage,
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
                currentPacket?.BatteryFaults.Warnings
                  .DclAndCclReducedDueToVoltageFailsafe,
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
                currentPacket?.BatteryFaults.Warnings
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
              value:
                currentPacket?.BatteryFaults.Warnings.CclReducedDueToHighSoc,
            },
          ],
          name: "Ccl Reduced Due to High Soc",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value:
                currentPacket?.BatteryFaults.Warnings
                  .CclReducedDueToHighCellResistance,
            },
          ],
          name: "Ccl Reduced to High Cell Resistance",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value:
                currentPacket?.BatteryFaults.Warnings
                  .CclReducedDueToTemperature,
            },
          ],
          name: "Ccl Reduced Due to Temperature",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value:
                currentPacket?.BatteryFaults.Warnings
                  .CclReducedDueToHighCellVoltage,
            },
          ],
          name: "Ccl Reduced Due to High Cell Voltage",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value:
                currentPacket?.BatteryFaults.Warnings
                  .CclReducedDueToHighPackVoltage,
            },
          ],
          name: "Ccl Reduced Due to High Pack Voltage",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value:
                currentPacket?.BatteryFaults.Warnings
                  .CclReducedDueToChargerLatch,
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
                currentPacket?.BatteryFaults.Warnings
                  .CclReducedDueToAlternateCurrentLimit,
            },
          ],
          name: "Ccl Reduced Due to Alternate Current Limit",
        },
      ],
    },
    Cell: [
      {
        data: [
          {
            max: 100,
            min: 0,
            unit: UnitType.VOLTAGE,
            value: Battery?.LowCellVoltage,
          },
          { value: Battery?.LowCellVoltageId },
          {
            max: 100,
            min: 0,
            unit: UnitType.VOLTAGE,
            value: Battery?.HighCellVoltage,
          },
          { value: Battery?.HighCellVoltageId },
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
            value: Battery?.AverageCellVoltage,
          },
        ],
        name: "Battery Average Voltage",
      },
      {
        data: [{ max: 100, min: 0, value: Battery?.PopulatedCells }],
        name: "Battery Populated Cells",
      },
      {
        data: [{ value: Battery?.MaximumCellVoltage }],
        name: "Maximum Cell Voltage",
      },
      {
        data: [{ value: Battery?.MinimumCellVoltage }],
        name: "Minimum Cell Voltage",
      },
    ] as I_PISField[],

    Fan: [
      {
        data: [
          {
            max: 100,
            min: 0,
            unit: UnitType.VOLTAGE,
            value: Battery?.FanVoltage,
          },
        ],
        name: "Fan Voltage",
      },
      {
        data: [{ max: 100, min: 0, value: Battery?.FanSpeed }],
        name: "Fan Speed",
      },
      {
        data: [
          {
            max: 100,
            min: 0,
            unit: UnitType.VOLTAGE,
            value: Battery?.RequestedFanSpeed,
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
            value: Battery?.PackCurrent,
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
            value: Battery?.PackVoltage,
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
            value: Battery?.PackAmphours,
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
            value: Battery?.PackStateOfCharge,
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
            value: Battery?.PackDepthOfDischarge,
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
            value: Battery?.Input12V,
          },
        ],
        name: "12V Input Voltage",
      },
      {
        data: [{ value: Battery?.MaximumPackVoltage }],
        name: "Maximum Pack Voltage",
      },
      {
        data: [{ value: Battery?.MinimumPackVoltage }],
        name: "Minimum Pack Voltage",
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
            value: Battery?.LowTemperature,
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
            value: Battery?.HighTemperature,
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
            value: Battery?.AverageTemperature,
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
            value: Battery?.InternalTemperature,
          },
        ],
        name: "Internal Temperature",
      },
    ] as I_PISField[],
  };

  return data;
};

export default Battery;
