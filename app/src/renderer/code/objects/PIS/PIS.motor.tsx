import { usePacket } from '../../contexts/PacketContext'
import I_PIS, { I_PISField } from './PIS.interface'

const Motor = (): I_PIS => {
  const { currentPacket } = usePacket()
  return {
    Key_Left_Motor_Details: [
      {
        Name: 'Alive',
        data: [
          {
            value: currentPacket?.KeyMotor[0].Alive
          }
        ]
      },
      {
        Name: 'Set Current',
        data: [
          {
            value: currentPacket?.KeyMotor[0].SetCurrent,
            unit: 'C'
          }
        ]
      },
      {
        Name: 'Set Velocity',
        data: [
          {
            value: currentPacket?.KeyMotor[0].SetVelocity,
            unit: 'km/h'
          }
        ]
      },
      {
        Name: 'Bus Current',
        data: [
          {
            value: currentPacket?.KeyMotor[0].BusCurrent,
            unit: 'C'
          }
        ]
      },
      {
        Name: 'Bus Voltage',
        data: [
          {
            value: currentPacket?.KeyMotor[0].BusVoltage,
            unit: 'V'
          }
        ]
      },
      {
        Name: 'Vehicle Velocity',
        data: [
          {
            value: currentPacket?.KeyMotor[0].VehicleVelocity,
            unit: 'km/h'
          }
        ]
      }
    ] as I_PISField[],
    Key_Right_Motor_Details: [
      {
        Name: 'Alive',
        data: [
          {
            value: currentPacket?.KeyMotor[1].Alive
          }
        ]
      },
      {
        Name: 'Set Current',
        data: [
          {
            value: currentPacket?.KeyMotor[1].SetCurrent,
            unit: 'C'
          }
        ]
      },
      {
        Name: 'Set Velocity',
        data: [
          {
            value: currentPacket?.KeyMotor[1].SetVelocity,
            unit: 'km/h'
          }
        ]
      },
      {
        Name: 'Bus Current',
        data: [
          {
            value: currentPacket?.KeyMotor[1].BusCurrent,
            unit: 'C'
          }
        ]
      },
      {
        Name: 'Bus Voltage',
        data: [
          {
            value: currentPacket?.KeyMotor[1].BusVoltage,
            unit: 'V'
          }
        ]
      },
      {
        Name: 'Vehicle Velocity',
        data: [
          {
            value: currentPacket?.KeyMotor[1].VehicleVelocity,
            unit: 'km/h'
          }
        ]
      }
    ] as I_PISField[],
    Left_Motor_Details: [
      {
        Name: 'Phase C Current',
        data: [
          {
            value: currentPacket?.MotorDetails[0].PhaseCCurrent,
            unit: 'C'
          }
        ]
      },
      {
        Name: 'Phase B Current',
        data: [
          {
            value: currentPacket?.MotorDetails[0].PhaseBCurrent,
            unit: 'C'
          }
        ]
      },
      {
        Name: 'Motor Voltage Real',
        data: [
          {
            value: currentPacket?.MotorDetails[0].MotorVoltageReal,
            unit: 'V'
          }
        ]
      },
      {
        Name: 'Motor Voltage Imaginary',
        data: [
          {
            value: currentPacket?.MotorDetails[0].MotorVoltageImaginary,
            unit: 'V'
          }
        ]
      },
      {
        Name: 'Motor Current Real',
        data: [
          {
            value: currentPacket?.MotorDetails[0].MotorVoltageReal,
            unit: 'V'
          }
        ]
      },
      {
        Name: 'Motor Current Imaginary',
        data: [
          {
            value: currentPacket?.MotorDetails[0].MotorVoltageImaginary,
            unit: 'V'
          }
        ]
      },
      {
        Name: 'Back EMF',
        data: [
          {
            value: currentPacket?.MotorDetails[0].BackEmf,
            unit: ''
          }
        ]
      },
      {
        Name: 'Voltage Rail 15V',
        data: [
          {
            value: currentPacket?.MotorDetails[0].VoltageRail15VSupply,
            unit: 'V'
          }
        ]
      },
      {
        Name: 'Voltage Rail 3V',
        data: [
          {
            value: currentPacket?.MotorDetails[0].VoltageRail3VSupply,
            unit: 'V'
          }
        ]
      },
      {
        Name: 'Voltage Rail 1V',
        data: [
          {
            value: currentPacket?.MotorDetails[0].VoltageRail1VSupply,
            unit: 'V'
          }
        ]
      },
      {
        Name: 'Heat Sink Temp',
        data: [
          {
            value: currentPacket?.MotorDetails[0].VoltageRail15VSupply,
            unit: '°C'
          }
        ]
      },
      {
        Name: 'Motor Temp',
        data: [
          {
            value: currentPacket?.MotorDetails[0].MotorTemp,
            unit: '°C'
          }
        ]
      },
      {
        Name: 'DSP Board Temp',
        data: [
          {
            value: currentPacket?.MotorDetails[0].DspBoardTemp,
            unit: '°C'
          }
        ]
      },
      {
        Name: 'Dc Bus Amp Hours',
        data: [
          {
            value: currentPacket?.MotorDetails[0].DcBusAmpHours,
            unit: 'C'
          }
        ]
      },
      {
        Name: 'Odometer',
        data: [
          {
            value: currentPacket?.MotorDetails[0].Odometer,
            unit: 'M'
          }
        ]
      },
      {
        Name: 'Slip Speed',
        data: [
          {
            value: currentPacket?.MotorDetails[0].SlipSpeed,
            unit: 'M'
          }
        ]
      }
    ] as I_PISField[],
    Right_Motor_Details: [
      {
        Name: 'Phase C Current',
        data: [
          {
            value: currentPacket?.MotorDetails[1].PhaseCCurrent,
            unit: 'C'
          }
        ]
      },
      {
        Name: 'Phase B Current',
        data: [
          {
            value: currentPacket?.MotorDetails[1].PhaseBCurrent,
            unit: 'C'
          }
        ]
      },
      {
        Name: 'Motor Voltage Real',
        data: [
          {
            value: currentPacket?.MotorDetails[1].MotorVoltageReal,
            unit: 'V'
          }
        ]
      },
      {
        Name: 'Motor Voltage Imaginary',
        data: [
          {
            value: currentPacket?.MotorDetails[1].MotorVoltageImaginary,
            unit: 'V'
          }
        ]
      },
      {
        Name: 'Motor Current Real',
        data: [
          {
            value: currentPacket?.MotorDetails[1].MotorVoltageReal,
            unit: 'V'
          }
        ]
      },
      {
        Name: 'Motor Current Imaginary',
        data: [
          {
            value: currentPacket?.MotorDetails[1].MotorVoltageImaginary,
            unit: 'V'
          }
        ]
      },
      {
        Name: 'Back EMF',
        data: [
          {
            value: currentPacket?.MotorDetails[1].BackEmf,
            unit: ''
          }
        ]
      },
      {
        Name: 'Voltage Rail 15V',
        data: [
          {
            value: currentPacket?.MotorDetails[1].VoltageRail15VSupply,
            unit: 'V'
          }
        ]
      },
      {
        Name: 'Voltage Rail 3V',
        data: [
          {
            value: currentPacket?.MotorDetails[1].VoltageRail3VSupply,
            unit: 'V'
          }
        ]
      },
      {
        Name: 'Voltage Rail 1V',
        data: [
          {
            value: currentPacket?.MotorDetails[1].VoltageRail1VSupply,
            unit: 'V'
          }
        ]
      },
      {
        Name: 'Heat Sink Temp',
        data: [
          {
            value: currentPacket?.MotorDetails[1].VoltageRail15VSupply,
            unit: '°C'
          }
        ]
      },
      {
        Name: 'Motor Temp',
        data: [
          {
            value: currentPacket?.MotorDetails[1].MotorTemp,
            unit: '°C'
          }
        ]
      },
      {
        Name: 'DSP Board Temp',
        data: [
          {
            value: currentPacket?.MotorDetails[1].DspBoardTemp,
            unit: '°C'
          }
        ]
      },
      {
        Name: 'Dc Bus Amp Hours',
        data: [
          {
            value: currentPacket?.MotorDetails[1].DcBusAmpHours,
            unit: 'C'
          }
        ]
      },
      {
        Name: 'Odometer',
        data: [
          {
            value: currentPacket?.MotorDetails[1].Odometer,
            unit: 'M'
          }
        ]
      },
      {
        Name: 'Slip Speed',
        data: [
          {
            value: currentPacket?.MotorDetails[1].SlipSpeed,
            unit: 'M'
          }
        ]
      }
    ] as I_PISField[]
  }
}

export default Motor
