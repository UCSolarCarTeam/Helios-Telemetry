import PISTransformer from "@/components/transformers/PISTransformer";
import mppt from "@/objects/PIS/PIS.mppt";

function MpptTab(): JSX.Element {
  return (
    <div>
      <PISTransformer root={mppt()} />
    </div>
  );
}

export default MpptTab;
