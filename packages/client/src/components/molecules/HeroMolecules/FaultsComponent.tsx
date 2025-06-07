import FaultCard from "@/components/atoms/FaultCard";
import { ISeverity } from "@/components/molecules/HeroMolecules/HeroTypes";
import { useFaults } from "@/contexts/FaultsContext";

function FaultsComponent() {
  const { currentFaults } = useFaults();

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      {currentFaults instanceof Map && currentFaults.size > 0 ? (
        <>
          {Array.from(currentFaults.entries()).map(([key, faultObj]) => {
            if (!faultObj) return null;
            return (
              <FaultCard
                faultName={faultObj.name}
                key={key}
                severity={faultObj.severity}
              />
            );
          })}
        </>
      ) : (
        <FaultCard faultName={"No Faults"} severity={ISeverity.CLEAR} />
      )}
    </div>
  );
}

export default FaultsComponent;
