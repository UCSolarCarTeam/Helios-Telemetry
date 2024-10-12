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
          },
        ],
      },
    },
  };

  return data as I_PIS;
};

export default Faults;
