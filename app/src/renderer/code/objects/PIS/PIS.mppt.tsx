import { usePacket } from '../../contexts/PacketContext'
import I_PIS, { I_PISField } from './PIS.interface'

const mppt = (): I_PIS => {
  const { currentPacket } = usePacket()
  return {
    Unit0: {
      Channel0: [
        {
          Name: 'Array Voltage',
          data: [
            {
              value: currentPacket?.MPPT[0].Alive,
              unit: 'V',
              min: 20,
              max: 100,
              hover: 'Unit 0 Channel 0 Array Voltage '
            }
          ]
        },
        {
          Name: 'Array Current',
          data: [
            {
              IName: currentPacket?.MPPT[0].ArrayCurrent,
              Unit: 'A',
              min: 20,
              max: 100
            }
          ]
        },
        {
          Name: 'Battery Voltage',
          data: [
            {
              IName: currentPacket?.MPPT[0].BatteryVoltage,
              unit: 'V',
              min: 20,
              max: 100
            }
          ]
        },
        {
          Name: 'Battery Current',
          data: [
            {
              IName: currentPacket?.MPPT[0].ArrayCurrent,
              unit: 'V',
              min: 20,
              max: 100
            }
          ]
        },
        {
          Name: 'Temperature',
          data: [
            {
              IName: currentPacket?.MPPT[0].Temperature,
              unit: '°C',
              min: 20,
              max: 100
            }
          ]
        }
      ] as I_PISField[],
      Channel1: [
        {
          Name: 'Array Voltage',
          data: [
            {
              value: currentPacket?.MPPT[1].Alive,
              unit: 'V',
              min: 20,
              max: 100,
              hover: 'Unit 0 Channel 0 Array Voltage '
            }
          ]
        },
        {
          Name: 'Array Current',
          data: [
            {
              IName: currentPacket?.MPPT[1].ArrayCurrent,
              Unit: 'A',
              min: 20,
              max: 100
            }
          ]
        },
        {
          Name: 'Battery Voltage',
          data: [
            {
              IName: currentPacket?.MPPT[1].BatteryVoltage,
              unit: 'V',
              min: 20,
              max: 100
            }
          ]
        },
        {
          Name: 'Battery Current',
          data: [
            {
              IName: currentPacket?.MPPT[1].ArrayCurrent,
              unit: 'V',
              min: 20,
              max: 100
            }
          ]
        },
        {
          Name: 'Temperature',
          data: [
            {
              IName: currentPacket?.MPPT[1].Temperature,
              unit: '°C',
              min: 20,
              max: 100
            }
          ]
        }
      ] as I_PISField[]
    },
    Unit1: {
      Channel0: [
        {
          Name: 'Array Voltage',
          data: [
            {
              value: currentPacket?.MPPT[2].Alive,
              unit: 'V',
              min: 20,
              max: 100,
              hover: 'Unit 0 Channel 0 Array Voltage '
            }
          ]
        },
        {
          Name: 'Array Current',
          data: [
            {
              IName: currentPacket?.MPPT[2].ArrayCurrent,
              Unit: 'A',
              min: 20,
              max: 100
            }
          ]
        },
        {
          Name: 'Battery Voltage',
          data: [
            {
              IName: currentPacket?.MPPT[2].BatteryVoltage,
              unit: 'V',
              min: 20,
              max: 100
            }
          ]
        },
        {
          Name: 'Battery Current',
          data: [
            {
              IName: currentPacket?.MPPT[2].ArrayCurrent,
              unit: 'V',
              min: 20,
              max: 100
            }
          ]
        },
        {
          Name: 'Temperature',
          data: [
            {
              IName: currentPacket?.MPPT[2].Temperature,
              unit: '°C',
              min: 20,
              max: 100
            }
          ]
        }
      ] as I_PISField[],
      Channel1: [
        {
          Name: 'Array Voltage',
          data: [
            {
              value: currentPacket?.MPPT[3].Alive,
              unit: 'V',
              min: 20,
              max: 100,
              hover: 'Unit 0 Channel 0 Array Voltage '
            }
          ]
        },
        {
          Name: 'Array Current',
          data: [
            {
              IName: currentPacket?.MPPT[3].ArrayCurrent,
              Unit: 'A',
              min: 20,
              max: 100
            }
          ]
        },
        {
          Name: 'Battery Voltage',
          data: [
            {
              IName: currentPacket?.MPPT[3].BatteryVoltage,
              unit: 'V',
              min: 20,
              max: 100
            }
          ]
        },
        {
          Name: 'Battery Current',
          data: [
            {
              IName: currentPacket?.MPPT[3].ArrayCurrent,
              unit: 'V',
              min: 20,
              max: 100
            }
          ]
        },
        {
          Name: 'Temperature',
          data: [
            {
              IName: currentPacket?.MPPT[3].Temperature,
              unit: '°C',
              min: 20,
              max: 100
            }
          ]
        }
      ] as I_PISField[]
    }
  }
}

export default mppt
