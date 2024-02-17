/* eslint-disable @typescript-eslint/restrict-plus-operands */
// eslint-disable-next-line prettier/prettier
import PISTransformer from "@/components/transformers/PIStransformer";
import mppt from "@/objects/PIS/PIS.mppt";

function MpptTab(): JSX.Element {
  return (
    <div>
      <PISTransformer root={mppt()} />
    </div>
  );
}

export default MpptTab;
