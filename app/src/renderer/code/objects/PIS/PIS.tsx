import battery from './PIS.battery'
import motor from './PIS.motor'
import mppt from './PIS.mppt'
import I_PIS from './PIS.interface'

const PIS: I_PIS = {
  Battery: battery,
  Motor: motor,
  MPPT: mppt
}

export default PIS
