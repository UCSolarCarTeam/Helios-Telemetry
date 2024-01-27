import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { usePacket } from "../../../contexts/PacketContext";
import FaultCard from "../../atoms/FaultCard";
import { ISeverity } from "../../atoms/FaultCard";

type FaultStateType = { timer: number; name: String; on: boolean };
type TestFaultType = {
  fault1: boolean;
  fault2: boolean;
  fault3: boolean;
  fault4: boolean;
};

function FaultsComponent(props: any) {
  return (
    <div>
      <motion.div
        className="h-[15%]"
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: 100, opacity: 0 }}
      >
        {/* <FaultCard severity={ISeverity.WARNING} faultName={"FAULT 1"} />
      </motion.div>
      <motion.div className="h-[15%]" animate={{ y: 0 }} initial={{ y: 100 }}>
        <FaultCard severity={ISeverity.ERROR} faultName={"FAULT 2"} />
  */}
      </motion.div>
    </div>
  );
}

export default FaultsComponent;
