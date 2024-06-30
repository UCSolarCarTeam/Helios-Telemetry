import PIStransformer from "@/components/transformers/PISTransformer";
import Motor from "@/objects/PIS/PIS.motor";

function MotorTab(): JSX.Element {
  return (
    <div>
      <PIStransformer root={Motor()} />
    </div>
  );
}

export default MotorTab;
