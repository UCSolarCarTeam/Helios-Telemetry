import PIS from "../../objects/PIS/PIS";
import PIStransformers from "../transformers/PIStransformer";

function FaultsTab(): JSX.Element {
  return (
    <div>
      <p>Faults Tab</p>
      <PIStransformers root={PIS().Battery} />
    </div>
  );
}

export default FaultsTab;
