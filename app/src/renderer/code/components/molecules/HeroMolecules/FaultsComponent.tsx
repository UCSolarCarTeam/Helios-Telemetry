import { useEffect, useState } from "react";

import { usePacket } from "../../../contexts/PacketContext";
import FaultCard from "../../atoms/FaultCard";
import { ISeverity } from "../../atoms/FaultCard";

type TestFaultType = {
  fault1: boolean;
  fault2: boolean;
  fault3: boolean;
  fault4: boolean;
};

type CurrentFaultsType = {
  [key in keyof TestFaultType]: number;
};

function FaultsComponent(props: any) {
  return (
    <div className="flex flex-col gap-4">
      {Object.keys(demoPacketFaults).map((fault) => (
        <FaultCard severity={ISeverity.WARNING} faultName={fault} />
      ))}
    </div>
  );
}

export default FaultsComponent;
