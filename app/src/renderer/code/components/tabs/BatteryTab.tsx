import { usePacket } from "@/contexts/PacketContext";

import Battery from "../../objects/PIS/PIS.battery";
import PISTransformer from "../transformers/PISTransformer";

function BatteryTab() {
  const { currentPacket } = usePacket();

  const fakeBatteryData = currentPacket.Battery;

  const fakeAuxBMSData = currentPacket.AuxBms;

  return (
    <div>
      <PISTransformer root={Battery()} />
    </div>
  );
}

export default BatteryTab;
