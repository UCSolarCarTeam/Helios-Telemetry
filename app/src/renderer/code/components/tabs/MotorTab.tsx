import PIS from "@/objects/PIS/PIS";
import Motor from "@/objects/PIS/PIS.motor";
import PISTransformer from "@/transformers/PISTransformer";

function MotorTab(): JSX.Element {
  return (
    <div>
      <PISTransformer root={Motor()} />
    </div>
  );
}

export default MotorTab;
