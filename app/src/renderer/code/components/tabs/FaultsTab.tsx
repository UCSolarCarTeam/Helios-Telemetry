import PIS from "../../objects/PIS/PIS";
import Battery from "../../objects/PIS/PIS.battery";
import PISTransformer from "../transformers/PISTransformer";

function FaultsTab(): JSX.Element {
  return (
    <div>
      <PISTransformer root={Battery()} />
    </div>
  );
}

export default FaultsTab;
