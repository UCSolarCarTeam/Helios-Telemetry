import PIStransformers from "@/components/transformers/PIStransformer";
import Battery from "@/objects/PIS/PIS.battery";

function FaultsTab(): JSX.Element {
  return (
    <div>
      <p>Faults Tab</p>
      <PISTransformers root={Battery()} />
    </div>
  );
}

export default FaultsTab;
