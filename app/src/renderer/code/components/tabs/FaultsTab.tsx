import PIS from "../../objects/PIS/PIS";
import Battery from "../../objects/PIS/PIS.battery";
import PIStransformers from "../transformers/PIStransformer";

function FaultsTab(): JSX.Element {
  return (
    <div>
      <p>Faults Tab</p>
      <PIStransformers root={Battery()} />
    </div>
  );
}

export default FaultsTab;
