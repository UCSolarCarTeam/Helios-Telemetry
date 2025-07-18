import type { JSX } from "react";

import PISTransformer from "@/components/transformers/PISTransformer";
import usePIS from "@/hooks/PIS/usePIS";
import type I_PIS from "@/objects/PIS/PIS.interface";

function MbmsTab(): JSX.Element {
  const { mbms } = usePIS();

  return (
    <div>
      <PISTransformer root={mbms as I_PIS} />
    </div>
  );
}

export default MbmsTab;
