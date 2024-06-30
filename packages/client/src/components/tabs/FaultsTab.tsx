import PISTransformer from "@/components/transformers/PISTransformer";
import faults from "@/objects/PIS/PIS.faults";

function FaultsTab(): JSX.Element {
  return (
    <div>
      <PISTransformer root={faults()} />
    </div>
  );
}

export default FaultsTab;
