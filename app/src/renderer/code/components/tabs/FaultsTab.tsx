import PIS from "../../objects/PIS/PIS";
import Battery from "../../objects/PIS/PIS.battery";
import PISTransformers from "../transformers/PISTransformer";

function FaultsTab(): JSX.Element {
  return (
    <div>
      <PISTransformers root={Battery()} />
    </div>
  );
}

export default FaultsTab;
