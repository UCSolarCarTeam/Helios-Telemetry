import FaultCard from "@/components/atoms/FaultCard";
import { ISeverity } from "@/components/molecules/HeroMolecules/HeroTypes";
import { type IFaults, useFaults } from "@/contexts/FaultsContext";
import { usePacket } from "@/contexts/PacketContext";

function FaultsComponent() {
  const { currentFaults } = useFaults();
  // console.log("faults", currentFaults);
  return (
    <div className="flex h-full flex-col overflow-y-scroll">
      {Array.isArray(currentFaults) && currentFaults.length > 0 ? (
        <>
          {currentFaults.map((faultObj: IFaults, index: number) => {
            return (
              <FaultCard
                key={index}
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
