import { usePacket } from '../../contexts/PacketContext'
import I_PIS, { I_PISField } from './PIS.interface'

const faults = (): I_PIS => {
  const { currentPacket } = usePacket()
  return {
    BatteryFaults: {
      ErrorFlags: [
        {
          Name: 'Internal Communication Fault',
          data: [{ value: currentPacket?.BatteryFaults.ErrorFlags.InternalCommunicationFault }]
        },
        {
          Name: 'Internal Conversion Fault',
          data: [{ value: currentPacket?.BatteryFaults.ErrorFlags.InternalConversionFault }]
        },
        {
          Name: 'Weak Cell Fault',
          data: [{ value: currentPacket?.BatteryFaults.ErrorFlags.WeakCellFault }]
        },
        {
          Name: 'Low Cell Voltage Fault',
          data: [{ value: currentPacket?.BatteryFaults.ErrorFlags.LowCellVoltageFault }]
        },
        {
          Name: 'Open Wiring Fault',
          data: [{ value: currentPacket?.BatteryFaults.ErrorFlags.OpenWiringFault }]
        },
        {
          Name: 'Current Sensor Fault',
          data: [{ value: currentPacket?.BatteryFaults.ErrorFlags.CurrentSensorFault }]
        },
        {
          Name: 'Pack Voltage Sensor Fault',
          data: [{ value: currentPacket?.BatteryFaults.ErrorFlags.PackVoltageSensorFault }]
        },
        {
          Name: 'Weak Pack Fault',
          data: [{ value: currentPacket?.BatteryFaults.ErrorFlags.WeakPackFault }]
        },
        {
          Name: 'Voltage Redundancy Fault',
          data: [{ value: currentPacket?.BatteryFaults.ErrorFlags.VoltageRedundancyFault }]
        },
        {
          Name: 'Fan Monitor Fault',
          data: [{ value: currentPacket?.BatteryFaults.ErrorFlags.FanMonitorFault }]
        },
        {
          Name: 'Thermistor Fault',
          data: [{ value: currentPacket?.BatteryFaults.ErrorFlags.ThermistorFault }]
        },
        {
          Name: 'CANBUS Communications Fault',
          data: [{ value: currentPacket?.BatteryFaults.ErrorFlags.CANBUSCommunicationsFault }]
        },
        {
          Name: 'Always On Supply Fault',
          data: [{ value: currentPacket?.BatteryFaults.ErrorFlags.AlwaysOnSupplyFault }]
        },
        {
          Name: 'High Voltage Isolation Fault',
          data: [{ value: currentPacket?.BatteryFaults.ErrorFlags.HighVoltageIsolationFault }]
        },
        {
          Name: '12V Power Supply Fault',
          data: [{ value: currentPacket?.BatteryFaults.ErrorFlags['12vPowerSupplyFault'] }]
        },
        {
          Name: 'Charge Limit Enforcement Fault',
          data: [{ value: currentPacket?.BatteryFaults.ErrorFlags.ChargeLimitEnforcementFault }]
        },
        {
          Name: 'Discharge Limit Enforcement Fault',
          data: [{ value: currentPacket?.BatteryFaults.ErrorFlags.DischargeLimitEnforcementFault }]
        },
        {
          Name: 'Charger Safety Relay Fault',
          data: [{ value: currentPacket?.BatteryFaults.ErrorFlags.ChargerSafetyRelayFault }]
        },
        {
          Name: 'Internal Memory Fault',
          data: [{ value: currentPacket?.BatteryFaults.ErrorFlags.InternalMemoryFault }]
        },
        {
          Name: 'Internal Thermistors Fault',
          data: [{ value: currentPacket?.BatteryFaults.ErrorFlags.InternalThermistorsFault }]
        },
        {
          Name: 'Internal Logic Fault',
          data: [{ value: currentPacket?.BatteryFaults.ErrorFlags.InternalLogicFault }]
        }
      ],
      LimitFlags: [
        {
          Name: 'Dcl Reduced Due To Low Soc',
          data: [{ value: currentPacket?.BatteryFaults.LimitFlags.DclReducedDueToLowSoc }]
        },
        {
          Name: 'Dcl Reduced Due to HighCell Resistance',
          data: [
            { value: currentPacket?.BatteryFaults.LimitFlags.DclReducedDueToHighCellResistance }
          ]
        },
        {
          Name: 'Dcl Reduced Due to Temperature',
          data: [{ value: currentPacket?.BatteryFaults.LimitFlags.DclReducedDueToTemperature }]
        },
        {
          Name: 'Dcl Reduced Due to Low Cell Voltage',
          data: [{ value: currentPacket?.BatteryFaults.LimitFlags.DclReducedDueToLowCellVoltage }]
        },
        {
          Name: 'Dcl Reduced Due to Low Pack Voltage',
          data: [{ value: currentPacket?.BatteryFaults.LimitFlags.DclReducedDueToLowPackVoltage }]
        },
        {
          Name: 'Dcl and Ccl Reduced Due to Voltage Fail Safe',
          data: [
            { value: currentPacket?.BatteryFaults.LimitFlags.DclandCclReducedDueToVoltageFailsafe }
          ]
        },
        {
          Name: 'Dcl and Ccl Reduced Due to Communication Fail Safe',
          data: [
            {
              value:
                currentPacket?.BatteryFaults.LimitFlags.DclandCclReducedDueToCommunicationFailsafe
            }
          ]
        },
        {
          Name: 'Ccl Reduced Due to High Soc',
          data: [{ value: currentPacket?.BatteryFaults.LimitFlags.CclReducedDueToHighSoc }]
        },
        {
          Name: 'Ccl Reduced to High Cell Resistance',
          data: [
            { value: currentPacket?.BatteryFaults.LimitFlags.CclReducedDueToHighCellResistance }
          ]
        },
        {
          Name: 'Ccl Reduced Due to Temperature',
          data: [{ value: currentPacket?.BatteryFaults.LimitFlags.CclReducedDueToTemperature }]
        },
        {
          Name: 'Ccl Reduced Due to High Cell Voltage',
          data: [{ value: currentPacket?.BatteryFaults.LimitFlags.CclReducedDueToHighCellVoltage }]
        },
        {
          Name: 'Ccl Reduced Due to High Pack Voltage',
          data: [{ value: currentPacket?.BatteryFaults.LimitFlags.CclReducedDueToHighPackVoltage }]
        },
        {
          Name: 'Ccl Reduced Due to Charger Latch',
          data: [{ value: currentPacket?.BatteryFaults.LimitFlags.CclReducedDueToChargerLatch }]
        },
        {
          Name: 'Ccl Reduced Due to Alternate Current Limit',
          data: [
            { value: currentPacket?.BatteryFaults.LimitFlags.CclReducedDueToAlternateCurrentLimit }
          ]
        }
      ]
    },
    MotorFaults: {
      MotorLeft: {
        ErrorFlags: [
          {
            Name: 'Motor Over Speed',
            data: [{ value: currentPacket?.MotorFaults[0].ErrorFlags.MotorOverSpeed }]
          },
          {
            Name: 'Software Over Current',
            data: [{ value: currentPacket?.MotorFaults[0].ErrorFlags.SoftwareOverCurrent }]
          },
          {
            Name: 'Dc Bus Over Voltage',
            data: [{ value: currentPacket?.MotorFaults[0].ErrorFlags.DcBusOverVoltage }]
          },
          {
            Name: 'Bad Motor Position Hall Sequence',
            data: [{ value: currentPacket?.MotorFaults[0].ErrorFlags.BadMotorPositionHallSequence }]
          },
          {
            Name: 'Watch Dog Caused Last Reset',
            data: [{ value: currentPacket?.MotorFaults[0].ErrorFlags.WatchdogCausedLastReset }]
          },
          {
            Name: 'Config Read Error',
            data: [{ value: currentPacket?.MotorFaults[0].ErrorFlags.ConfigReadError }]
          },
          {
            Name: 'Wail 15V Under Voltage Lock Out',
            data: [{ value: currentPacket?.MotorFaults[0].ErrorFlags.Wail15VUnderVoltageLockOut }]
          },
          {
            Name: 'Desaturation Fault',
            data: [{ value: currentPacket?.MotorFaults[0].ErrorFlags.DesaturationFault }]
          }
        ],
        LimitFlags: [
          {
            Name: 'Output Voltage Pwm',
            data: [{ value: currentPacket?.MotorFaults[0].LimitFlags.OutputVoltagePwm }]
          },
          {
            Name: 'Motor Current',
            data: [{ value: currentPacket?.MotorFaults[0].LimitFlags.MotorCurrent }]
          },
          {
            Name: 'Velocity',
            data: [{ value: currentPacket?.MotorFaults[0].LimitFlags.Velocity }]
          },
          {
            Name: 'Bus Current',
            data: [{ value: currentPacket?.MotorFaults[0].LimitFlags.BusCurrent }]
          },
          {
            Name: 'Bus Voltage Upper',
            data: [{ value: currentPacket?.MotorFaults[0].LimitFlags.BusVoltageUpper }]
          },
          {
            Name: 'Bus Voltage Lower',
            data: [{ value: currentPacket?.MotorFaults[0].LimitFlags.BusVoltageLower }]
          },
          {
            Name: 'Ipm or Motor Temperature',
            data: [{ value: currentPacket?.MotorFaults[0].LimitFlags.IpmOrMotorTemperature }]
          }
        ]
      },
      MotorRight: {
        ErrorFlags: [
          {
            Name: 'Motor Over Speed',
            data: [{ value: currentPacket?.MotorFaults[1].ErrorFlags.MotorOverSpeed }]
          },
          {
            Name: 'Software Over Current',
            data: [{ value: currentPacket?.MotorFaults[1].ErrorFlags.SoftwareOverCurrent }]
          },
          {
            Name: 'Dc Bus Over Voltage',
            data: [{ value: currentPacket?.MotorFaults[1].ErrorFlags.DcBusOverVoltage }]
          },
          {
            Name: 'Bad Motor Position Hall Sequence',
            data: [{ value: currentPacket?.MotorFaults[1].ErrorFlags.BadMotorPositionHallSequence }]
          },
          {
            Name: 'Watch Dog Caused Last Reset',
            data: [{ value: currentPacket?.MotorFaults[1].ErrorFlags.WatchdogCausedLastReset }]
          },
          {
            Name: 'Config Read Error',
            data: [{ value: currentPacket?.MotorFaults[1].ErrorFlags.ConfigReadError }]
          },
          {
            Name: 'Wail 15V Under Voltage Lock Out',
            data: [{ value: currentPacket?.MotorFaults[1].ErrorFlags.Wail15VUnderVoltageLockOut }]
          },
          {
            Name: 'Desaturation Fault',
            data: [{ value: currentPacket?.MotorFaults[1].ErrorFlags.DesaturationFault }]
          }
        ],
        LimitFlags: [
          {
            Name: 'Output Voltage Pwm',
            data: [{ value: currentPacket?.MotorFaults[1].LimitFlags.OutputVoltagePwm }]
          },
          {
            Name: 'Motor Current',
            data: [{ value: currentPacket?.MotorFaults[1].LimitFlags.MotorCurrent }]
          },
          {
            Name: 'Velocity',
            data: [{ value: currentPacket?.MotorFaults[1].LimitFlags.Velocity }]
          },
          {
            Name: 'Bus Current',
            data: [{ value: currentPacket?.MotorFaults[1].LimitFlags.BusCurrent }]
          },
          {
            Name: 'Bus Voltage Upper',
            data: [{ value: currentPacket?.MotorFaults[1].LimitFlags.BusVoltageUpper }]
          },
          {
            Name: 'Bus Voltage Lower',
            data: [{ value: currentPacket?.MotorFaults[1].LimitFlags.BusVoltageLower }]
          },
          {
            Name: 'Ipm or Motor Temperature',
            data: [{ value: currentPacket?.MotorFaults[1].LimitFlags.IpmOrMotorTemperature }]
          }
        ]
      }
    }
  }
}

export default faults
