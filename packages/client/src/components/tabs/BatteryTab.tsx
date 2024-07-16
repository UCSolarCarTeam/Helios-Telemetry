import PISTransformer from "@/components/transformers/PISTransformer";
import Battery from "@/objects/PIS/PIS.battery";

function BatteryTab() {
  return (
    <div>
      <PISTransformer root={Battery()} />
    </div>
  );
}

export default BatteryTab;
