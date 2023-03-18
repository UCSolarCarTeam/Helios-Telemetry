import React from "react";
import FaultCard from "../../atoms/FaultCard";
import { ISeverity } from "../../atoms/FaultCard";

function FaultsComponent(props: any) {
  return (
    <FaultCard severity={ISeverity.Error} faultName={"Fuel injector issue"} />
  );
}

export default FaultsComponent;
