import {
  FaultLocations,
  ISeverity,
} from "@/components/molecules/HeroMolecules/HeroTypes";
import { usePacket } from "@/contexts/PacketContext";
import type I_PIS from "@/objects/PIS/PIS.interface";
import { UnitType } from "@/objects/PIS/PIS.interface";

const Faults = (): I_PIS => {
  const { currentPacket } = usePacket();
  const data = {
    BatteryFaults: {
      ErrorFlags: [
        {
          name: "Internal Communication Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags
                  .InternalCommunicationFault,
              severity: ISeverity.ERROR,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
        {
          name: "Internal Conversion Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags.InternalConversionFault,
              severity: ISeverity.WARNING,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
        {
          name: "Weak Cell Fault",
          data: [
            {
              value: currentPacket?.BatteryFaults.ErrorFlags.WeakCellFault,
              severity: ISeverity.WARNING,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
        {
          name: "Low Cell Voltage Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags.LowCellVoltageFault,
              severity: ISeverity.ERROR,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
        {
          name: "Open Wiring Fault",
          data: [
            {
              value: currentPacket?.BatteryFaults.ErrorFlags.OpenWiringFault,
              severity: ISeverity.ERROR,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
        {
          name: "Current Sensor Fault",
          data: [
            {
              value: currentPacket?.BatteryFaults.ErrorFlags.CurrentSensorFault,
              severity: ISeverity.WARNING,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
        {
          name: "Pack Voltage Sensor Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags.PackVoltageSensorFault,
              severity: ISeverity.WARNING,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
        {
          name: "Weak Pack Fault",
          data: [
            {
              value: currentPacket?.BatteryFaults.ErrorFlags.WeakPackFault,
              severity: ISeverity.WARNING,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
        {
          name: "Voltage Redundancy Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags.VoltageRedundancyFault,
              severity: ISeverity.ERROR,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
        {
          name: "Fan Monitor Fault",
          data: [
            {
              value: currentPacket?.BatteryFaults.ErrorFlags.FanMonitorFault,
              severity: ISeverity.WARNING,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
        {
          name: "Thermistor Fault",
          data: [
            {
              value: currentPacket?.BatteryFaults.ErrorFlags.ThermistorFault,
              severity: ISeverity.ERROR,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
        {
          name: "CANBUS Communications Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags
                  .CANBUSCommunicationsFault,
              severity: ISeverity.ERROR,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
        {
          name: "Always On Supply Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags.AlwaysOnSupplyFault,
              severity: ISeverity.ERROR,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
        {
          name: "High Voltage Isolation Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags
                  .HighVoltageIsolationFault,
              severity: ISeverity.ERROR,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
        {
          name: "12V Power Supply Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags["12vPowerSupplyFault"],
              severity: ISeverity.ERROR,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
        {
          name: "Charge Limit Enforcement Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags
                  .ChargeLimitEnforcementFault,
              severity: ISeverity.ERROR,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
        {
          name: "Discharge Limit Enforcement Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags
                  .DischargeLimitEnforcementFault,
              severity: ISeverity.ERROR,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
        {
          name: "Charger Safety Relay Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags.ChargerSafetyRelayFault,
              severity: ISeverity.ERROR,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
        {
          name: "Internal Memory Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags.InternalMemoryFault,
              severity: ISeverity.ERROR,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
        {
          name: "Internal Thermistors Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags
                  .InternalThermistorsFault,
              severity: ISeverity.WARNING,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
        {
          name: "Internal Logic Fault",
          data: [
            {
              value: currentPacket?.BatteryFaults.ErrorFlags.InternalLogicFault,
              severity: ISeverity.ERROR,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
      ],
      LimitFlags: [
        {
          name: "Dcl Reduced Due To Low Soc",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.LimitFlags.DclReducedDueToLowSoc,
              severity: ISeverity.ERROR,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
        {
          name: "Dcl Reduced Due to HighCell Resistance",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.LimitFlags
                  .DclReducedDueToHighCellResistance,
              severity: ISeverity.WARNING,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
        {
          name: "Dcl Reduced Due to Temperature",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.LimitFlags
                  .DclReducedDueToTemperature,
              severity: ISeverity.WARNING,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
        {
          name: "Dcl Reduced Due to Low Cell Voltage",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.LimitFlags
                  .DclReducedDueToLowCellVoltage,
              severity: ISeverity.WARNING,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
        {
          name: "Dcl Reduced Due to Low Pack Voltage",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.LimitFlags
                  .DclReducedDueToLowPackVoltage,
              severity: ISeverity.WARNING,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
        {
          name: "Dcl and Ccl Reduced Due to Voltage Fail Safe",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.LimitFlags
                  .DclandCclReducedDueToVoltageFailsafe,
              severity: ISeverity.ERROR,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
        {
          name: "Dcl and Ccl Reduced Due to Communication Fail Safe",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.LimitFlags
                  .DclandCclReducedDueToCommunicationFailsafe,
              severity: ISeverity.ERROR,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
        {
          name: "Ccl Reduced Due to High Soc",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.LimitFlags.CclReducedDueToHighSoc,
              severity: ISeverity.WARNING,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
        {
          name: "Ccl Reduced to High Cell Resistance",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.LimitFlags
                  .CclReducedDueToHighCellResistance,
              severity: ISeverity.WARNING,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
        {
          name: "Ccl Reduced Due to Temperature",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.LimitFlags
                  .CclReducedDueToTemperature,
              severity: ISeverity.WARNING,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
        {
          name: "Ccl Reduced Due to High Cell Voltage",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.LimitFlags
                  .CclReducedDueToHighCellVoltage,
              severity: ISeverity.WARNING,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
        {
          name: "Ccl Reduced Due to High Pack Voltage",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.LimitFlags
                  .CclReducedDueToHighPackVoltage,
              severity: ISeverity.WARNING,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
        {
          name: "Ccl Reduced Due to Charger Latch",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.LimitFlags
                  .CclReducedDueToChargerLatch,
              severity: ISeverity.WARNING,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
        {
          name: "Ccl Reduced Due to Alternate Current Limit",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.LimitFlags
                  .CclReducedDueToAlternateCurrentLimit,
              severity: ISeverity.WARNING,
              indiciationLocation: FaultLocations.BATTERY,
            },
          ],
        },
      ],
    },
    MotorFaults: {
      MotorLeft: {
        ErrorFlags: [
          {
            name: "Motor Over Speed",
            data: [
              {
                value: currentPacket?.MotorFaults[0].ErrorFlags.MotorOverSpeed,
                severity: ISeverity.WARNING,
                indiciationLocation: FaultLocations.LEFTMOTOR,
              },
            ],
          },
          {
            name: "Software Over Current",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[0].ErrorFlags.SoftwareOverCurrent,
                severity: ISeverity.WARNING,
                indiciationLocation: FaultLocations.LEFTMOTOR,
              },
            ],
          },
          {
            name: "Dc Bus Over Voltage",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[0].ErrorFlags.DcBusOverVoltage,
                severity: ISeverity.WARNING,
                indiciationLocation: FaultLocations.LEFTMOTOR,
              },
            ],
          },
          {
            name: "Bad Motor Position Hall Sequence",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[0].ErrorFlags
                    .BadMotorPositionHallSequence,
                severity: ISeverity.WARNING,
                indiciationLocation: FaultLocations.LEFTMOTOR,
              },
            ],
          },
          {
            name: "Watch Dog Caused Last Reset",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[0].ErrorFlags
                    .WatchdogCausedLastReset,
                severity: ISeverity.WARNING,
                indiciationLocation: FaultLocations.LEFTMOTOR,
              },
            ],
          },
          {
            name: "Config Read Error",
            data: [
              {
                value: currentPacket?.MotorFaults[0].ErrorFlags.ConfigReadError,
                severity: ISeverity.WARNING,
                indiciationLocation: FaultLocations.LEFTMOTOR,
              },
            ],
          },
          {
            name: "Wail 15V Under Voltage Lock Out",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[0].ErrorFlags
                    .Wail15VUnderVoltageLockOut,
                severity: ISeverity.WARNING,
                indiciationLocation: FaultLocations.LEFTMOTOR,
              },
            ],
          },
          {
            name: "Desaturation Fault",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[0].ErrorFlags.DesaturationFault,
                severity: ISeverity.WARNING,
                indiciationLocation: FaultLocations.LEFTMOTOR,
              },
            ],
          },
        ],
        LimitFlags: [
          {
            name: "Output Voltage Pwm",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[0].LimitFlags.OutputVoltagePwm,
                severity: ISeverity.WARNING,
                indiciationLocation: FaultLocations.LEFTMOTOR,
              },
            ],
          },
          {
            name: "Motor Current",
            data: [
              {
                value: currentPacket?.MotorFaults[0].LimitFlags.MotorCurrent,
                severity: ISeverity.WARNING,
                indiciationLocation: FaultLocations.LEFTMOTOR,
              },
            ],
          },
          {
            name: "Velocity",
            data: [
              {
                value: currentPacket?.MotorFaults[0].LimitFlags.Velocity,
                severity: ISeverity.WARNING,
                indiciationLocation: FaultLocations.LEFTMOTOR,
              },
            ],
          },
          {
            name: "Bus Current",
            data: [
              {
                value: currentPacket?.MotorFaults[0].LimitFlags.BusCurrent,
                severity: ISeverity.WARNING,
                indiciationLocation: FaultLocations.LEFTMOTOR,
              },
            ],
          },
          {
            name: "Bus Voltage Upper",
            data: [
              {
                value: currentPacket?.MotorFaults[0].LimitFlags.BusVoltageUpper,
                severity: ISeverity.WARNING,
                indiciationLocation: FaultLocations.LEFTMOTOR,
              },
            ],
          },
          {
            name: "Bus Voltage Lower",
            data: [
              {
                value: currentPacket?.MotorFaults[0].LimitFlags.BusVoltageLower,
                severity: ISeverity.WARNING,
                indiciationLocation: FaultLocations.LEFTMOTOR,
              },
            ],
          },
          {
            name: "Ipm or Motor Temperature",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[0].LimitFlags
                    .IpmOrMotorTemperature,
                severity: ISeverity.WARNING,
                indiciationLocation: FaultLocations.LEFTMOTOR,
              },
            ],
          },
        ],
      },
      MotorRight: {
        ErrorFlags: [
          {
            name: "Motor Over Speed",
            data: [
              {
                value: currentPacket?.MotorFaults[1].ErrorFlags.MotorOverSpeed,
                severity: ISeverity.WARNING,
                indiciationLocation: FaultLocations.RIGHTMOTOR,
              },
            ],
          },
          {
            name: "Software Over Current",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[1].ErrorFlags.SoftwareOverCurrent,

                severity: ISeverity.WARNING,
                indiciationLocation: FaultLocations.RIGHTMOTOR,
              },
            ],
          },
          {
            name: "Dc Bus Over Voltage",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[1].ErrorFlags.DcBusOverVoltage,
                severity: ISeverity.WARNING,
                indiciationLocation: FaultLocations.RIGHTMOTOR,
              },
            ],
          },
          {
            name: "Bad Motor Position Hall Sequence",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[1].ErrorFlags
                    .BadMotorPositionHallSequence,
                severity: ISeverity.ERROR,
                indiciationLocation: FaultLocations.RIGHTMOTOR,
              },
            ],
          },
          {
            name: "Watch Dog Caused Last Reset",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[1].ErrorFlags
                    .WatchdogCausedLastReset,
                severity: ISeverity.ERROR,
                indiciationLocation: FaultLocations.RIGHTMOTOR,
              },
            ],
          },
          {
            name: "Config Read Error",
            data: [
              {
                value: currentPacket?.MotorFaults[1].ErrorFlags.ConfigReadError,
                severity: ISeverity.ERROR,
                indiciationLocation: FaultLocations.RIGHTMOTOR,
              },
            ],
          },
          {
            name: "Wail 15V Under Voltage Lock Out",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[1].ErrorFlags
                    .Wail15VUnderVoltageLockOut,
                severity: ISeverity.WARNING,
                indiciationLocation: FaultLocations.RIGHTMOTOR,
              },
            ],
          },
          {
            name: "Desaturation Fault",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[1].ErrorFlags.DesaturationFault,
                severity: ISeverity.WARNING,
                indiciationLocation: FaultLocations.RIGHTMOTOR,
              },
            ],
          },
        ],
        LimitFlags: [
          {
            name: "Output Voltage Pwm",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[1].LimitFlags.OutputVoltagePwm,
                severity: ISeverity.WARNING,
                indiciationLocation: FaultLocations.RIGHTMOTOR,
              },
            ],
          },
          {
            name: "Motor Current",
            data: [
              {
                value: currentPacket?.MotorFaults[1].LimitFlags.MotorCurrent,
                severity: ISeverity.WARNING,
                indiciationLocation: FaultLocations.RIGHTMOTOR,
              },
            ],
          },
          {
            name: "Velocity",
            data: [
              {
                value: currentPacket?.MotorFaults[1].LimitFlags.Velocity,
                severity: ISeverity.ERROR,
                indiciationLocation: FaultLocations.RIGHTMOTOR,
              },
            ],
          },
          {
            name: "Bus Current",
            data: [
              {
                value: currentPacket?.MotorFaults[1].LimitFlags.BusCurrent,
                severity: ISeverity.WARNING,
                indiciationLocation: FaultLocations.RIGHTMOTOR,
              },
            ],
          },
          {
            name: "Bus Voltage Upper",
            data: [
              {
                value: currentPacket?.MotorFaults[1].LimitFlags.BusVoltageUpper,
                severity: ISeverity.WARNING,
                indiciationLocation: FaultLocations.RIGHTMOTOR,
              },
            ],
          },
          {
            name: "Bus Voltage Lower",
            data: [
              {
                value: currentPacket?.MotorFaults[1].LimitFlags.BusVoltageLower,
                severity: ISeverity.WARNING,
                indiciationLocation: FaultLocations.RIGHTMOTOR,
              },
            ],
          },
          {
            name: "Ipm or Motor Temperature",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[1].LimitFlags
                    .IpmOrMotorTemperature,
                severity: ISeverity.WARNING,
                indiciationLocation: FaultLocations.RIGHTMOTOR,
              },
            ],
          },
        ],
      },
    },
  };

  return data;
};

export default Faults;
