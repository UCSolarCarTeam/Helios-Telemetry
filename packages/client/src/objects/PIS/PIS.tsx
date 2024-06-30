import Battery from "@/objects/PIS/PIS.battery";
import Faults from "@/objects/PIS/PIS.faults";
import type I_PIS from "@/objects/PIS/PIS.interface";
import Motor from "@/objects/PIS/PIS.motor";
import MPPT from "@/objects/PIS/PIS.mppt";

const PIS = (): I_PIS => {
  return {
    battery: Battery(),
    motor: Motor(),
    mppt: MPPT(),
    faults: Faults(),
  };
};

export default PIS;
