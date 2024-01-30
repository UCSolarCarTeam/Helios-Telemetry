import { motion } from "framer-motion";
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
    <div>
      <motion.div
        className="h-[15%]"
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: 100, opacity: 0 }}
      >
        {currentFaults.map((fault) => (
          <FaultCard severity={fault.severity} faultName={fault.name} />
        ))}
      </motion.div>
    </div>
  );
}

export default FaultsComponent;
