import PISTransformer from "@/components/transformers/PIStransformer";
import Battery from "@/objects/PIS/PIS.battery";

function FaultsTab(): JSX.Element {
  return (
    <div>
      <PISTransformer root={Battery()} />
    </div>
  );
}

export default FaultsTab;
