import { usePacket } from '../../contexts/PacketContext'
import I_PIS, { I_PISField } from './PIS.interface'

const Faults = (): I_PIS => {
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
        }
      ]
    }
  }
}

Faults
