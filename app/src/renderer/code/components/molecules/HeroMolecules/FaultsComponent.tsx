import React from "react";
import FaultCard from "../../atoms/FaultCard";
import { ISeverity } from "../../atoms/FaultCard";

function FaultsComponent(props: any) {
  return (
    <div>
      <div className="h-[15%]">
        <FaultCard severity={ISeverity.WARNING} faultName={"FAULT 1"} />
      </div>
      <div className="h-[15%]">
        <FaultCard severity={ISeverity.ERROR} faultName={"FAULT 2"} />
      </div>
    </div>
  );
}

export default FaultsComponent;
