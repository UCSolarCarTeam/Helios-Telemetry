import Battery from "@/hooks/PIS/PIS.battery";
import Faults from "@/hooks/PIS/PIS.faults";
import Motor from "@/hooks/PIS/PIS.motor";
import MPPT from "@/hooks/PIS/PIS.mppt";
import type I_PIS from "@/objects/PIS/PIS.interface";

const usePIS = (): I_PIS => {
  return {
    battery: Battery(),
    motor: Motor(),
    mppt: MPPT(),
    faults: Faults(),
  };
};

export default usePIS;