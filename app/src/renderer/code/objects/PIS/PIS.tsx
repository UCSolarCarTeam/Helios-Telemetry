import Battery from "./PIS.battery";
import faults from "./PIS.faults";
import I_PIS from "./PIS.interface";
import motor from "./PIS.motor";
import mppt from "./PIS.mppt";

const PIS = (): I_PIS => {
  return {
    battery: Battery(),
    motor: motor(),
    mppt: mppt(),
    faults: faults(),
  };
};

export default PIS;
