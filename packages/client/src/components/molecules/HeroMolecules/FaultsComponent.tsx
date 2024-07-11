import FaultCard from "@/components/atoms/FaultCard";
import { ISeverity } from "@/components/molecules/HeroMolecules/HeroTypes";
import { useFaults } from "@/contexts/FaultsContext";

function FaultsComponent() {
  const { currentFaults } = useFaults();
  return (
    <div className="flex h-full flex-col overflow-y-scroll">
      {currentFaults instanceof Map && currentFaults.size > 0 ? (
        <>
          {Array.from(currentFaults.entries()).map(([key, faultObj]) => {
            if (!faultObj) return null;
            return (
              <FaultCard
                key={key}
                severity={faultObj.severity}
                faultName={faultObj.name}
              />
            );
          })}
        </>
      ) : (
        <FaultCard severity={ISeverity.CLEAR} faultName={"No Faults"} />
      )}
    </div>
  );
}

export default FaultsComponent;
