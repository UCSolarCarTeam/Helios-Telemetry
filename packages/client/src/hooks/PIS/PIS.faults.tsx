import {
  FaultLocations,
  ISeverity,
} from "@/components/molecules/HeroMolecules/HeroTypes";
import { usePacket } from "@/contexts/PacketContext";
import type I_PIS from "@/objects/PIS/PIS.interface";

const Faults = (): I_PIS => {
  const { currentPacket } = usePacket();
  const data = {
    BatteryFaults: {
      ErrorFlags: [
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value:
                currentPacket?.BatteryFaults.ErrorFlags
                  .InternalCommunicationFault,
            },
          ],
          name: "Internal Communication Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value:
                currentPacket?.BatteryFaults.ErrorFlags.InternalConversionFault,
            },
          ],
          name: "Internal Conversion Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value: currentPacket?.BatteryFaults.ErrorFlags.WeakCellFault,
            },
          ],
          name: "Weak Cell Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value:
                currentPacket?.BatteryFaults.ErrorFlags.LowCellVoltageFault,
            },
          ],
          name: "Low Cell Voltage Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: currentPacket?.BatteryFaults.ErrorFlags.OpenWiringFault,
            },
          ],
          name: "Open Wiring Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value: currentPacket?.BatteryFaults.ErrorFlags.CurrentSensorFault,
            },
          ],
          name: "Current Sensor Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value:
                currentPacket?.BatteryFaults.ErrorFlags.PackVoltageSensorFault,
            },
          ],
          name: "Pack Voltage Sensor Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value: currentPacket?.BatteryFaults.ErrorFlags.WeakPackFault,
            },
          ],
          name: "Weak Pack Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value:
                currentPacket?.BatteryFaults.ErrorFlags.VoltageRedundancyFault,
            },
          ],
          name: "Voltage Redundancy Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value: currentPacket?.BatteryFaults.ErrorFlags.FanMonitorFault,
            },
          ],
          name: "Fan Monitor Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: currentPacket?.BatteryFaults.ErrorFlags.ThermistorFault,
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
                currentPacket?.BatteryFaults.ErrorFlags
                  .CANBUSCommunicationsFault,
            },
          ],
          name: "CANBUS Communications Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value:
                currentPacket?.BatteryFaults.ErrorFlags.AlwaysOnSupplyFault,
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
                currentPacket?.BatteryFaults.ErrorFlags
                  .HighVoltageIsolationFault,
            },
          ],
          name: "High Voltage Isolation Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value:
                currentPacket?.BatteryFaults.ErrorFlags["12vPowerSupplyFault"],
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
                currentPacket?.BatteryFaults.ErrorFlags
                  .ChargeLimitEnforcementFault,
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
                currentPacket?.BatteryFaults.ErrorFlags
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
                currentPacket?.BatteryFaults.ErrorFlags.ChargerSafetyRelayFault,
            },
          ],
          name: "Charger Safety Relay Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value:
                currentPacket?.BatteryFaults.ErrorFlags.InternalMemoryFault,
            },
          ],
          name: "Internal Memory Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value:
                currentPacket?.BatteryFaults.ErrorFlags
                  .InternalThermistorsFault,
            },
          ],
          name: "Internal Thermistors Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: currentPacket?.BatteryFaults.ErrorFlags.InternalLogicFault,
            },
          ],
          name: "Internal Logic Fault",
        },
      ],
      LimitFlags: [
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value:
                currentPacket?.BatteryFaults.LimitFlags.DclReducedDueToLowSoc,
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
                currentPacket?.BatteryFaults.LimitFlags
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
                currentPacket?.BatteryFaults.LimitFlags
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
                currentPacket?.BatteryFaults.LimitFlags
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
                currentPacket?.BatteryFaults.LimitFlags
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
                currentPacket?.BatteryFaults.LimitFlags
                  .DclandCclReducedDueToVoltageFailsafe,
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
                currentPacket?.BatteryFaults.LimitFlags
                  .DclandCclReducedDueToCommunicationFailsafe,
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
                currentPacket?.BatteryFaults.LimitFlags.CclReducedDueToHighSoc,
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
                currentPacket?.BatteryFaults.LimitFlags
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
                currentPacket?.BatteryFaults.LimitFlags
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
                currentPacket?.BatteryFaults.LimitFlags
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
                currentPacket?.BatteryFaults.LimitFlags
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
                currentPacket?.BatteryFaults.LimitFlags
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
                currentPacket?.BatteryFaults.LimitFlags
                  .CclReducedDueToAlternateCurrentLimit,
            },
          ],
          name: "Ccl Reduced Due to Alternate Current Limit",
        },
      ],
    },
    MotorFaults: {
      MotorLeft: {
        ErrorFlags: [
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value: currentPacket?.MotorFaults[0]?.ErrorFlags.MotorOverSpeed,
              },
            ],
            name: "Motor Over Speed",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorFaults[0]?.ErrorFlags.SoftwareOverCurrent,
              },
            ],
            name: "Software Over Current",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorFaults[0]?.ErrorFlags.DcBusOverVoltage,
              },
            ],
            name: "Dc Bus Over Voltage",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorFaults[0]?.ErrorFlags
                    .BadMotorPositionHallSequence,
              },
            ],
            name: "Bad Motor Position Hall Sequence",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorFaults[0]?.ErrorFlags
                    .WatchdogCausedLastReset,
              },
            ],
            name: "Watch Dog Caused Last Reset",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorFaults[0]?.ErrorFlags.ConfigReadError,
              },
            ],
            name: "Config Read Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorFaults[0]?.ErrorFlags
                    .Wail15VUnderVoltageLockOut,
              },
            ],
            name: "Wail 15V Under Voltage Lock Out",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorFaults[0]?.ErrorFlags.DesaturationFault,
              },
            ],
            name: "Desaturation Fault",
          },
        ],
        LimitFlags: [
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorFaults[0]?.LimitFlags.OutputVoltagePwm,
              },
            ],
            name: "Output Voltage Pwm",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value: currentPacket?.MotorFaults[0]?.LimitFlags.MotorCurrent,
              },
            ],
            name: "Motor Current",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value: currentPacket?.MotorFaults[0]?.LimitFlags.Velocity,
              },
            ],
            name: "Velocity",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value: currentPacket?.MotorFaults[0]?.LimitFlags.BusCurrent,
              },
            ],
            name: "Bus Current",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorFaults[0]?.LimitFlags.BusVoltageUpper,
              },
            ],
            name: "Bus Voltage Upper",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorFaults[0]?.LimitFlags.BusVoltageLower,
              },
            ],
            name: "Bus Voltage Lower",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorFaults[0]?.LimitFlags
                    .IpmOrMotorTemperature,
              },
            ],
            name: "Ipm or Motor Temperature",
          },
        ],
      },
      MotorRight: {
        ErrorFlags: [
          {
            data: [
              {
                indicationLocation: FaultLocations.RIGHTMOTOR,
                severity: ISeverity.WARNING,
                value: currentPacket?.MotorFaults[1]?.ErrorFlags.MotorOverSpeed,
              },
            ],
            name: "Motor Over Speed",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.RIGHTMOTOR,

                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorFaults[1]?.ErrorFlags.SoftwareOverCurrent,
              },
            ],
            name: "Software Over Current",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.RIGHTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorFaults[1]?.ErrorFlags.DcBusOverVoltage,
              },
            ],
            name: "Dc Bus Over Voltage",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.RIGHTMOTOR,
                severity: ISeverity.ERROR,
                value:
                  currentPacket?.MotorFaults[1]?.ErrorFlags
                    .BadMotorPositionHallSequence,
              },
            ],
            name: "Bad Motor Position Hall Sequence",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.RIGHTMOTOR,
                severity: ISeverity.ERROR,
                value:
                  currentPacket?.MotorFaults[1]?.ErrorFlags
                    .WatchdogCausedLastReset,
              },
            ],
            name: "Watch Dog Caused Last Reset",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.RIGHTMOTOR,
                severity: ISeverity.ERROR,
                value:
                  currentPacket?.MotorFaults[1]?.ErrorFlags.ConfigReadError,
              },
            ],
            name: "Config Read Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.RIGHTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorFaults[1]?.ErrorFlags
                    .Wail15VUnderVoltageLockOut,
              },
            ],
            name: "Wail 15V Under Voltage Lock Out",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.RIGHTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorFaults[1]?.ErrorFlags.DesaturationFault,
              },
            ],
            name: "Desaturation Fault",
          },
        ],
        LimitFlags: [
          {
            data: [
              {
                indicationLocation: FaultLocations.RIGHTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorFaults[1]?.LimitFlags.OutputVoltagePwm,
              },
            ],
            name: "Output Voltage Pwm",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.RIGHTMOTOR,
                severity: ISeverity.WARNING,
                value: currentPacket?.MotorFaults[1]?.LimitFlags.MotorCurrent,
              },
            ],
            name: "Motor Current",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.RIGHTMOTOR,
                severity: ISeverity.ERROR,
                value: currentPacket?.MotorFaults[1]?.LimitFlags.Velocity,
              },
            ],
            name: "Velocity",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.RIGHTMOTOR,
                severity: ISeverity.WARNING,
                value: currentPacket?.MotorFaults[1]?.LimitFlags.BusCurrent,
              },
            ],
            name: "Bus Current",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.RIGHTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorFaults[1]?.LimitFlags.BusVoltageUpper,
              },
            ],
            name: "Bus Voltage Upper",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.RIGHTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorFaults[1]?.LimitFlags.BusVoltageLower,
              },
            ],
            name: "Bus Voltage Lower",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.RIGHTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorFaults[1]?.LimitFlags
                    .IpmOrMotorTemperature,
              },
            ],
            name: "Ipm or Motor Temperature",
          },
        ],
      },
    },
  };

  return data as I_PIS;
};

export default Faults;
