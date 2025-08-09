import type { JSX } from "react";

import PISTransformer from "@/components/transformers/PISTransformer";
import FullscreenWrapper from "@/contexts/FullscreenWrapper";
import usePIS from "@/hooks/PIS/usePIS";
import type I_PIS from "@/objects/PIS/PIS.interface";

function MbmsTab(): JSX.Element {
  const { mbms } = usePIS();

  return (
    <div>
      <FullscreenWrapper>
        <PISTransformer root={mbms as I_PIS} />
      </FullscreenWrapper>
    </div>
  );
}

export default MbmsTab;
