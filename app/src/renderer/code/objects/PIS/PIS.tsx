import Battery from "@/objects/PIS/PIS.battery";
import faults from "@/objects/PIS/PIS.faults";
import type I_PIS from "@/objects/PIS/PIS.interface";
import motor from "@/objects/PIS/PIS.motor";
import mppt from "@/objects/PIS/PIS.mppt";

const PIS = (): I_PIS => {
  return {
    battery: Battery(),
    motor: motor(),
    mppt: mppt(),
    faults: faults(),
  };
};

export default PIS;
