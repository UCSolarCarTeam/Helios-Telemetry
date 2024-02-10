import PIStransformers from "@/components/transformers/PIStransformer";
import faults from "@/objects/PIS/PIS.faults";

function FaultsTab(): JSX.Element {
  return (
    <div>
      <p>Faults Tab</p>
      <PIStransformers root={faults()} />
    </div>
  );
}

export default FaultsTab;
