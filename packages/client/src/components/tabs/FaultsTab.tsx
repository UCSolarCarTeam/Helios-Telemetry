import type { JSX } from "react";

import PISTransformer from "@/components/transformers/PISTransformer";
import FullscreenWrapper from "@/contexts/FullscreenWrapper";
import usePIS from "@/hooks/PIS/usePIS";
import type I_PIS from "@/objects/PIS/PIS.interface";

function FaultsTab(): JSX.Element {
  const { faults } = usePIS();

  return (
    <div>
      <FullscreenWrapper>
        <PISTransformer root={faults as I_PIS} />
      </FullscreenWrapper>
    </div>
  );
}

export default FaultsTab;
