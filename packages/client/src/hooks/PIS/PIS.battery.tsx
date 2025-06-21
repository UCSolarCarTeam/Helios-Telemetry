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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
              value:
                currentPacket?.BatteryFaults.Warnings.DclReducedDueToLowSoc,
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
              value:
                currentPacket?.BatteryFaults.Warnings
                  .DclReducedDueToHighCellResistance,
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
              value:
                currentPacket?.BatteryFaults.Warnings
                  .DclReducedDueToTemperature,
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
              value:
                currentPacket?.BatteryFaults.Warnings
                  .DclReducedDueToLowCellVoltage,
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
              value:
                currentPacket?.BatteryFaults.Warnings
                  .DclReducedDueToLowPackVoltage,
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
                currentPacket?.BatteryFaults.Warnings
                  .DclAndCclReducedDueToVoltageFailsafe,
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
                currentPacket?.BatteryFaults.Warnings
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
              value:
                currentPacket?.BatteryFaults.Warnings.CclReducedDueToHighSoc,
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
              value:
                currentPacket?.BatteryFaults.Warnings
                  .CclReducedDueToHighCellResistance,
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
              value:
                currentPacket?.BatteryFaults.Warnings
                  .CclReducedDueToTemperature,
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
              value:
                currentPacket?.BatteryFaults.Warnings
                  .CclReducedDueToHighCellVoltage,
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
              value:
                currentPacket?.BatteryFaults.Warnings
                  .CclReducedDueToHighPackVoltage,
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
              value:
                currentPacket?.BatteryFaults.Warnings
                  .CclReducedDueToChargerLatch,
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
                currentPacket?.BatteryFaults.Warnings
                  .CclReducedDueToAlternateCurrentLimit,
            },
          ],
          isFault: true,
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
