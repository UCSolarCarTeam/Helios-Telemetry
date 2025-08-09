import type { JSX } from "react";

import PISTransformer from "@/components/transformers/PISTransformer";
import FullscreenWrapper from "@/contexts/FullscreenWrapper";
import usePIS from "@/hooks/PIS/usePIS";
import type I_PIS from "@/objects/PIS/PIS.interface";

function MpptTab(): JSX.Element {
  const { mppt } = usePIS();
  return (
    <div>
      <FullscreenWrapper>
        <PISTransformer root={mppt as I_PIS} />
      </FullscreenWrapper>
    </div>
  );
}

export default MpptTab;
