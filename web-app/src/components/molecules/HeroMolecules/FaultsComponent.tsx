import React from "react";
import FaultCard from "../../atoms/FaultCard";
import { ISeverity } from "../../atoms/FaultCard";

function FaultsComponent(props: any) {
  return (
    <div className="h-[15%]">
      <FaultCard severity={ISeverity.Error} faultName={"Help us"} />
    </div>
  );
}

export default FaultsComponent;
