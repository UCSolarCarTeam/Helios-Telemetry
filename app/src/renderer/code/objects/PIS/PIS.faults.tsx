import { usePacket } from "@/contexts/PacketContext";
import type I_PIS from "@/objects/PIS/PIS.interface";

const faults = (): I_PIS => {
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
            },
          ],
        },
        {
          name: "Internal Conversion Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags.InternalConversionFault,
            },
          ],
        },
        {
          name: "Weak Cell Fault",
          data: [
            { value: currentPacket?.BatteryFaults.ErrorFlags.WeakCellFault },
          ],
        },
        {
          name: "Low Cell Voltage Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags.LowCellVoltageFault,
            },
          ],
        },
        {
          name: "Open Wiring Fault",
          data: [
            { value: currentPacket?.BatteryFaults.ErrorFlags.OpenWiringFault },
          ],
        },
        {
          name: "Current Sensor Fault",
          data: [
            {
              value: currentPacket?.BatteryFaults.ErrorFlags.CurrentSensorFault,
            },
          ],
        },
        {
          name: "Pack Voltage Sensor Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags.PackVoltageSensorFault,
            },
          ],
        },
        {
          name: "Weak Pack Fault",
          data: [
            { value: currentPacket?.BatteryFaults.ErrorFlags.WeakPackFault },
          ],
        },
        {
          name: "Voltage Redundancy Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags.VoltageRedundancyFault,
            },
          ],
        },
        {
          name: "Fan Monitor Fault",
          data: [
            { value: currentPacket?.BatteryFaults.ErrorFlags.FanMonitorFault },
          ],
        },
        {
          name: "Thermistor Fault",
          data: [
            { value: currentPacket?.BatteryFaults.ErrorFlags.ThermistorFault },
          ],
        },
        {
          name: "CANBUS Communications Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags
                  .CANBUSCommunicationsFault,
            },
          ],
        },
        {
          name: "Always On Supply Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags.AlwaysOnSupplyFault,
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
            },
          ],
        },
        {
          name: "12V Power Supply Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags["12vPowerSupplyFault"],
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
            },
          ],
        },
        {
          name: "Charger Safety Relay Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags.ChargerSafetyRelayFault,
            },
          ],
        },
        {
          name: "Internal Memory Fault",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.ErrorFlags.InternalMemoryFault,
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
            },
          ],
        },
        {
          name: "Internal Logic Fault",
          data: [
            {
              value: currentPacket?.BatteryFaults.ErrorFlags.InternalLogicFault,
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
            },
          ],
        },
        {
          name: "Ccl Reduced Due to High Soc",
          data: [
            {
              value:
                currentPacket?.BatteryFaults.LimitFlags.CclReducedDueToHighSoc,
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
              },
            ],
          },
          {
            name: "Software Over Current",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[0].ErrorFlags.SoftwareOverCurrent,
              },
            ],
          },
          {
            name: "Dc Bus Over Voltage",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[0].ErrorFlags.DcBusOverVoltage,
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
              },
            ],
          },
          {
            name: "Config Read Error",
            data: [
              {
                value: currentPacket?.MotorFaults[0].ErrorFlags.ConfigReadError,
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
              },
            ],
          },
          {
            name: "Desaturation Fault",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[0].ErrorFlags.DesaturationFault,
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
              },
            ],
          },
          {
            name: "Motor Current",
            data: [
              { value: currentPacket?.MotorFaults[0].LimitFlags.MotorCurrent },
            ],
          },
          {
            name: "Velocity",
            data: [
              { value: currentPacket?.MotorFaults[0].LimitFlags.Velocity },
            ],
          },
          {
            name: "Bus Current",
            data: [
              { value: currentPacket?.MotorFaults[0].LimitFlags.BusCurrent },
            ],
          },
          {
            name: "Bus Voltage Upper",
            data: [
              {
                value: currentPacket?.MotorFaults[0].LimitFlags.BusVoltageUpper,
              },
            ],
          },
          {
            name: "Bus Voltage Lower",
            data: [
              {
                value: currentPacket?.MotorFaults[0].LimitFlags.BusVoltageLower,
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
              },
            ],
          },
          {
            name: "Software Over Current",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[1].ErrorFlags.SoftwareOverCurrent,
              },
            ],
          },
          {
            name: "Dc Bus Over Voltage",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[1].ErrorFlags.DcBusOverVoltage,
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
              },
            ],
          },
          {
            name: "Config Read Error",
            data: [
              {
                value: currentPacket?.MotorFaults[1].ErrorFlags.ConfigReadError,
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
              },
            ],
          },
          {
            name: "Desaturation Fault",
            data: [
              {
                value:
                  currentPacket?.MotorFaults[1].ErrorFlags.DesaturationFault,
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
              },
            ],
          },
          {
            name: "Motor Current",
            data: [
              { value: currentPacket?.MotorFaults[1].LimitFlags.MotorCurrent },
            ],
          },
          {
            name: "Velocity",
            data: [
              { value: currentPacket?.MotorFaults[1].LimitFlags.Velocity },
            ],
          },
          {
            name: "Bus Current",
            data: [
              { value: currentPacket?.MotorFaults[1].LimitFlags.BusCurrent },
            ],
          },
          {
            name: "Bus Voltage Upper",
            data: [
              {
                value: currentPacket?.MotorFaults[1].LimitFlags.BusVoltageUpper,
              },
            ],
          },
          {
            name: "Bus Voltage Lower",
            data: [
              {
                value: currentPacket?.MotorFaults[1].LimitFlags.BusVoltageLower,
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
              },
            ],
          },
        ],
      },
    },
  };

  return data;
};

export default faults;
