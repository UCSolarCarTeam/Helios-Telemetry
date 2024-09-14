import PISTransformer from "@/components/transformers/PISTransformer";
import usePIS from "@/hooks/PIS/usePIS";
import type I_PIS from "@/objects/PIS/PIS.interface";

function BatteryTab() {
  const { battery } = usePIS();

  return (
    <div>
      <PISTransformer root={battery as I_PIS} />
    </div>
  );
}

export default BatteryTab;
