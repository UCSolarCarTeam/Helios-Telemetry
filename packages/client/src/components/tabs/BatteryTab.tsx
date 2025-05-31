import PISTransformer from "@/components/transformers/PISTransformer";
import FullscreenWrapper from "@/contexts/FullscreenWrapper";
import usePIS from "@/hooks/PIS/usePIS";
import type I_PIS from "@/objects/PIS/PIS.interface";

function BatteryTab() {
  const { battery } = usePIS();

  return (
    <div>
      <FullscreenWrapper>
        <PISTransformer root={battery as I_PIS} />
      </FullscreenWrapper>
    </div>
  );
}

export default BatteryTab;
