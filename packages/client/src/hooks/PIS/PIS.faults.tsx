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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
          isFault: true,
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
            isFault: true,
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
            isFault: true,
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
            isFault: true,
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
            isFault: true,
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
            isFault: true,
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
            isFault: true,
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
            isFault: true,
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
            isFault: true,
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
            isFault: true,
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
            isFault: true,
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
            isFault: true,
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
            isFault: true,
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
            isFault: true,
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
            isFault: true,
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
            isFault: true,
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
            isFault: true,
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
            isFault: true,
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
            isFault: true,
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
            isFault: true,
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
            isFault: true,
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
            isFault: true,
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
            isFault: true,
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
            isFault: true,
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
            isFault: true,
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
            isFault: true,
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
            isFault: true,
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
            isFault: true,
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
            isFault: true,
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
            isFault: true,
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
            isFault: true,
            name: "Ipm or Motor Temperature",
          },
        ],
      },
    },
  };

  return data as I_PIS;
};

export default Faults;
