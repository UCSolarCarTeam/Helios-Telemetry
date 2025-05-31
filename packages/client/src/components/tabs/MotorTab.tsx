import type { JSX } from "react";

import PIStransformer from "@/components/transformers/PISTransformer";
import FullscreenWrapper from "@/contexts/FullscreenWrapper";
import usePIS from "@/hooks/PIS/usePIS";
import type I_PIS from "@/objects/PIS/PIS.interface";

function MotorTab(): JSX.Element {
  const { motor } = usePIS();
  return (
    <div>
      <FullscreenWrapper>
        <PIStransformer root={motor as I_PIS} />
      </FullscreenWrapper>
    </div>
  );
}

export default MotorTab;
