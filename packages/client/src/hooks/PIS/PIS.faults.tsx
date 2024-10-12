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
          name: "Internal Communication Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags
                  .InternalCommunicationFault,
              severity: ISeverity.ERROR,
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
        },
        {
          name: "Internal Conversion Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags.InternalConversionFault,
              severity: ISeverity.WARNING,
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
        },
        {
          name: "Weak Cell Fault",
          data: [
            {
              value: currentPacket?.BatteryFaults.ErrorFlags.WeakCellFault,
              severity: ISeverity.WARNING,
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
        },
        {
          name: "Low Cell Voltage Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags.LowCellVoltageFault,
              severity: ISeverity.ERROR,
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
        },
        {
          name: "Open Wiring Fault",
          data: [
            {
              value: currentPacket?.BatteryFaults.ErrorFlags.OpenWiringFault,
              severity: ISeverity.ERROR,
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
        },
        {
          name: "Current Sensor Fault",
          data: [
            {
              value: currentPacket?.BatteryFaults.ErrorFlags.CurrentSensorFault,
              severity: ISeverity.WARNING,
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
        },
        {
          name: "Pack Voltage Sensor Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags.PackVoltageSensorFault,
              severity: ISeverity.WARNING,
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
        },
        {
          name: "Weak Pack Fault",
          data: [
            {
              value: currentPacket?.BatteryFaults.ErrorFlags.WeakPackFault,
              severity: ISeverity.WARNING,
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
        },
        {
          name: "Voltage Redundancy Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags.VoltageRedundancyFault,
              severity: ISeverity.ERROR,
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
        },
        {
          name: "Fan Monitor Fault",
          data: [
            {
              value: currentPacket?.BatteryFaults.ErrorFlags.FanMonitorFault,
              severity: ISeverity.WARNING,
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
        },
        {
          name: "Thermistor Fault",
          data: [
            {
              value: currentPacket?.BatteryFaults.ErrorFlags.ThermistorFault,
              severity: ISeverity.ERROR,
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
        },
        {
          name: "CANBUS Communications Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags
                  .CANBUSCommunicationsFault,
              severity: ISeverity.ERROR,
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
        },
        {
          name: "Always On Supply Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags.AlwaysOnSupplyFault,
              severity: ISeverity.ERROR,
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
        },
        {
          name: "High Voltage Isolation Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags
                  .HighVoltageIsolationFault,
              severity: ISeverity.ERROR,
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
        },
        {
          name: "12V Power Supply Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags["12vPowerSupplyFault"],
              severity: ISeverity.ERROR,
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
        },
        {
          name: "Charge Limit Enforcement Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags
                  .ChargeLimitEnforcementFault,
              severity: ISeverity.ERROR,
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
        },
        {
          name: "Discharge Limit Enforcement Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags
                  .DischargeLimitEnforcementFault,
              severity: ISeverity.ERROR,
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
        },
        {
          name: "Charger Safety Relay Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags.ChargerSafetyRelayFault,
              severity: ISeverity.ERROR,
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
        },
        {
          name: "Internal Memory Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags.InternalMemoryFault,
              severity: ISeverity.ERROR,
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
        },
        {
          name: "Internal Thermistors Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags
                  .InternalThermistorsFault,
              severity: ISeverity.WARNING,
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
        },
        {
          name: "Internal Logic Fault",
          data: [
            {
              value: currentPacket?.BatteryFaults.ErrorFlags.InternalLogicFault,
              severity: ISeverity.ERROR,
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
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
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
        },
        {
          name: "Dcl Reduced Due to HighCell Resistance",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.LimitFlags
                  .DclReducedDueToHighCellResistance,
              severity: ISeverity.WARNING,
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
        },
        {
          name: "Dcl Reduced Due to Temperature",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.LimitFlags
                  .DclReducedDueToTemperature,
              severity: ISeverity.WARNING,
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
        },
        {
          name: "Dcl Reduced Due to Low Cell Voltage",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.LimitFlags
                  .DclReducedDueToLowCellVoltage,
              severity: ISeverity.WARNING,
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
        },
        {
          name: "Dcl Reduced Due to Low Pack Voltage",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.LimitFlags
                  .DclReducedDueToLowPackVoltage,
              severity: ISeverity.WARNING,
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
        },
        {
          name: "Dcl and Ccl Reduced Due to Voltage Fail Safe",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.LimitFlags
                  .DclandCclReducedDueToVoltageFailsafe,
              severity: ISeverity.ERROR,
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
        },
        {
          name: "Dcl and Ccl Reduced Due to Communication Fail Safe",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.LimitFlags
                  .DclandCclReducedDueToCommunicationFailsafe,
              severity: ISeverity.ERROR,
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
        },
        {
          name: "Ccl Reduced Due to High Soc",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.LimitFlags.CclReducedDueToHighSoc,
              severity: ISeverity.WARNING,
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
        },
        {
          name: "Ccl Reduced to High Cell Resistance",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.LimitFlags
                  .CclReducedDueToHighCellResistance,
              severity: ISeverity.WARNING,
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
        },
        {
          name: "Ccl Reduced Due to Temperature",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.LimitFlags
                  .CclReducedDueToTemperature,
              severity: ISeverity.WARNING,
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
        },
        {
          name: "Ccl Reduced Due to High Cell Voltage",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.LimitFlags
                  .CclReducedDueToHighCellVoltage,
              severity: ISeverity.WARNING,
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
        },
        {
          name: "Ccl Reduced Due to High Pack Voltage",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.LimitFlags
                  .CclReducedDueToHighPackVoltage,
              severity: ISeverity.WARNING,
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
        },
        {
          name: "Ccl Reduced Due to Charger Latch",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.LimitFlags
                  .CclReducedDueToChargerLatch,
              severity: ISeverity.WARNING,
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
        },
        {
          name: "Ccl Reduced Due to Alternate Current Limit",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.LimitFlags
                  .CclReducedDueToAlternateCurrentLimit,
              severity: ISeverity.WARNING,
              indicationLocation: FaultLocations.BATTERY,
            },
          ],
          isFault: true,
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
                value: currentPacket?.MotorFaults[0]?.ErrorFlags.MotorOverSpeed,
                severity: ISeverity.WARNING,
                indicationLocation: FaultLocations.LEFTMOTOR,
              },
            ],
            isFault: true,
          },
          {
            name: "Software Over Current",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[0]?.ErrorFlags.SoftwareOverCurrent,
                severity: ISeverity.WARNING,
                indicationLocation: FaultLocations.LEFTMOTOR,
              },
            ],
            isFault: true,
          },
          {
            name: "Dc Bus Over Voltage",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[0]?.ErrorFlags.DcBusOverVoltage,
                severity: ISeverity.WARNING,
                indicationLocation: FaultLocations.LEFTMOTOR,
              },
            ],
            isFault: true,
          },
          {
            name: "Bad Motor Position Hall Sequence",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[0]?.ErrorFlags
                    .BadMotorPositionHallSequence,
                severity: ISeverity.WARNING,
                indicationLocation: FaultLocations.LEFTMOTOR,
              },
            ],
            isFault: true,
          },
          {
            name: "Watch Dog Caused Last Reset",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[0]?.ErrorFlags
                    .WatchdogCausedLastReset,
                severity: ISeverity.WARNING,
                indicationLocation: FaultLocations.LEFTMOTOR,
              },
            ],
            isFault: true,
          },
          {
            name: "Config Read Error",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[0]?.ErrorFlags.ConfigReadError,
                severity: ISeverity.WARNING,
                indicationLocation: FaultLocations.LEFTMOTOR,
              },
            ],
            isFault: true,
          },
          {
            name: "Wail 15V Under Voltage Lock Out",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[0]?.ErrorFlags
                    .Wail15VUnderVoltageLockOut,
                severity: ISeverity.WARNING,
                indicationLocation: FaultLocations.LEFTMOTOR,
              },
            ],
            isFault: true,
          },
          {
            name: "Desaturation Fault",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[0]?.ErrorFlags.DesaturationFault,
                severity: ISeverity.WARNING,
                indicationLocation: FaultLocations.LEFTMOTOR,
              },
            ],
            isFault: true,
          },
        ],
        LimitFlags: [
          {
            name: "Output Voltage Pwm",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[0]?.LimitFlags.OutputVoltagePwm,
                severity: ISeverity.WARNING,
                indicationLocation: FaultLocations.LEFTMOTOR,
              },
            ],
            isFault: true,
          },
          {
            name: "Motor Current",
            data: [
              {
                value: currentPacket?.MotorFaults[0]?.LimitFlags.MotorCurrent,
                severity: ISeverity.WARNING,
                indicationLocation: FaultLocations.LEFTMOTOR,
              },
            ],
            isFault: true,
          },
          {
            name: "Velocity",
            data: [
              {
                value: currentPacket?.MotorFaults[0]?.LimitFlags.Velocity,
                severity: ISeverity.WARNING,
                indicationLocation: FaultLocations.LEFTMOTOR,
              },
            ],
            isFault: true,
          },
          {
            name: "Bus Current",
            data: [
              {
                value: currentPacket?.MotorFaults[0]?.LimitFlags.BusCurrent,
                severity: ISeverity.WARNING,
                indicationLocation: FaultLocations.LEFTMOTOR,
              },
            ],
            isFault: true,
          },
          {
            name: "Bus Voltage Upper",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[0]?.LimitFlags.BusVoltageUpper,
                severity: ISeverity.WARNING,
                indicationLocation: FaultLocations.LEFTMOTOR,
              },
            ],
            isFault: true,
          },
          {
            name: "Bus Voltage Lower",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[0]?.LimitFlags.BusVoltageLower,
                severity: ISeverity.WARNING,
                indicationLocation: FaultLocations.LEFTMOTOR,
              },
            ],
            isFault: true,
          },
          {
            name: "Ipm or Motor Temperature",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[0]?.LimitFlags
                    .IpmOrMotorTemperature,
                severity: ISeverity.WARNING,
                indicationLocation: FaultLocations.LEFTMOTOR,
              },
            ],
            isFault: true,
          },
        ],
      },
      MotorRight: {
        ErrorFlags: [
          {
            name: "Motor Over Speed",
            data: [
              {
                value: currentPacket?.MotorFaults[1]?.ErrorFlags.MotorOverSpeed,
                severity: ISeverity.WARNING,
                indicationLocation: FaultLocations.RIGHTMOTOR,
              },
            ],
            isFault: true,
          },
          {
            name: "Software Over Current",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[1]?.ErrorFlags.SoftwareOverCurrent,

                severity: ISeverity.WARNING,
                indicationLocation: FaultLocations.RIGHTMOTOR,
              },
            ],
            isFault: true,
          },
          {
            name: "Dc Bus Over Voltage",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[1]?.ErrorFlags.DcBusOverVoltage,
                severity: ISeverity.WARNING,
                indicationLocation: FaultLocations.RIGHTMOTOR,
              },
            ],
            isFault: true,
          },
          {
            name: "Bad Motor Position Hall Sequence",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[1]?.ErrorFlags
                    .BadMotorPositionHallSequence,
                severity: ISeverity.ERROR,
                indicationLocation: FaultLocations.RIGHTMOTOR,
              },
            ],
            isFault: true,
          },
          {
            name: "Watch Dog Caused Last Reset",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[1]?.ErrorFlags
                    .WatchdogCausedLastReset,
                severity: ISeverity.ERROR,
                indicationLocation: FaultLocations.RIGHTMOTOR,
              },
            ],
            isFault: true,
          },
          {
            name: "Config Read Error",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[1]?.ErrorFlags.ConfigReadError,
                severity: ISeverity.ERROR,
                indicationLocation: FaultLocations.RIGHTMOTOR,
              },
            ],
            isFault: true,
          },
          {
            name: "Wail 15V Under Voltage Lock Out",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[1]?.ErrorFlags
                    .Wail15VUnderVoltageLockOut,
                severity: ISeverity.WARNING,
                indicationLocation: FaultLocations.RIGHTMOTOR,
              },
            ],
            isFault: true,
          },
          {
            name: "Desaturation Fault",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[1]?.ErrorFlags.DesaturationFault,
                severity: ISeverity.WARNING,
                indicationLocation: FaultLocations.RIGHTMOTOR,
              },
            ],
            isFault: true,
          },
        ],
        LimitFlags: [
          {
            name: "Output Voltage Pwm",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[1]?.LimitFlags.OutputVoltagePwm,
                severity: ISeverity.WARNING,
                indicationLocation: FaultLocations.RIGHTMOTOR,
              },
            ],
            isFault: true,
          },
          {
            name: "Motor Current",
            data: [
              {
                value: currentPacket?.MotorFaults[1]?.LimitFlags.MotorCurrent,
                severity: ISeverity.WARNING,
                indicationLocation: FaultLocations.RIGHTMOTOR,
              },
            ],
            isFault: true,
          },
          {
            name: "Velocity",
            data: [
              {
                value: currentPacket?.MotorFaults[1]?.LimitFlags.Velocity,
                severity: ISeverity.ERROR,
                indicationLocation: FaultLocations.RIGHTMOTOR,
              },
            ],
            isFault: true,
          },
          {
            name: "Bus Current",
            data: [
              {
                value: currentPacket?.MotorFaults[1]?.LimitFlags.BusCurrent,
                severity: ISeverity.WARNING,
                indicationLocation: FaultLocations.RIGHTMOTOR,
              },
            ],
            isFault: true,
          },
          {
            name: "Bus Voltage Upper",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[1]?.LimitFlags.BusVoltageUpper,
                severity: ISeverity.WARNING,
                indicationLocation: FaultLocations.RIGHTMOTOR,
              },
            ],
            isFault: true,
          },
          {
            name: "Bus Voltage Lower",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[1]?.LimitFlags.BusVoltageLower,
                severity: ISeverity.WARNING,
                indicationLocation: FaultLocations.RIGHTMOTOR,
              },
            ],
            isFault: true,
          },
          {
            name: "Ipm or Motor Temperature",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[1]?.LimitFlags
                    .IpmOrMotorTemperature,
                severity: ISeverity.WARNING,
                indicationLocation: FaultLocations.RIGHTMOTOR,
              },
            ],
            isFault: true,
          },
        ],
      },
    },
  };

  return data as I_PIS;
};

export default Faults;
