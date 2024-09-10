import PISTransformer from "@/components/transformers/PISTransformer";
import usePIS from "@/hooks/PIS/usePIS";
import type I_PIS from "@/objects/PIS/PIS.interface";

function FaultsTab(): JSX.Element {
  const { faults } = usePIS();
  return (
    <div>
      <PISTransformer root={faults as I_PIS} />
    </div>
  );
}

export default FaultsTab;
