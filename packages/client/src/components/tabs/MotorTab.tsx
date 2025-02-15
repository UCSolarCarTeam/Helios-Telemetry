import type { JSX } from "react";

import PIStransformer from "@/components/transformers/PISTransformer";
import usePIS from "@/hooks/PIS/usePIS";
import type I_PIS from "@/objects/PIS/PIS.interface";

function MotorTab(): JSX.Element {
  const { motor } = usePIS();
  return (
    <div>
      <PIStransformer root={motor as I_PIS} />
    </div>
  );
}

export default MotorTab;
