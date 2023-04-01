import React from "react";
import FaultCard from "../../atoms/FaultCard";
import { ISeverity } from "../../atoms/FaultCard";

function FaultsComponent(props: any) {
  return (
    <div>
      <div className="h-[15%]">
        <FaultCard severity={ISeverity.Error} faultName={"fuel injector"} />
      </div>
      <div className="h-[15%]">
        <FaultCard severity={ISeverity.Warning} faultName={"help me"} />
      </div>
    </div>
  );
}

export default FaultsComponent;
