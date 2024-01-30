import { motion } from "framer-motion";

import FaultCard from "../../atoms/FaultCard";
import { ISeverity } from "../../atoms/FaultCard";

function FaultsComponent(props: any) {
  {
  }
  return (
    <div>
      <motion.div
        className="h-[15%]"
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: 100, opacity: 0 }}
      >
        <FaultCard severity={ISeverity.WARNING} faultName={"FAULT 1"} />
      </motion.div>
      <motion.div className="h-[15%]" animate={{ y: 0 }} initial={{ y: 100 }}>
        <FaultCard severity={ISeverity.ERROR} faultName={"FAULT 2"} />
      </motion.div>
    </div>
  );
}

export default FaultsComponent;
