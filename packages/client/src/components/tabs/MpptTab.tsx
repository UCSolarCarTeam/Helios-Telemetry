import type { JSX } from "react";

import PISTransformer from "@/components/transformers/PISTransformer";
import usePIS from "@/hooks/PIS/usePIS";
import type I_PIS from "@/objects/PIS/PIS.interface";

function MpptTab(): JSX.Element {
  const { mppt } = usePIS();
  return (
    <div>
      <PISTransformer root={mppt as I_PIS} />
    </div>
  );
}

MpptTab.displayName = "MpptTab";

export default MpptTab;
