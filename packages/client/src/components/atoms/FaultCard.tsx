import { motion } from "framer-motion";
import React from "react";

import { ISeverity } from "@/components/molecules/HeroMolecules/HeroTypes";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DangerousIcon from "@mui/icons-material/Dangerous";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

type FaultCardProps = {
  severity: ISeverity;
  faultName: string;
  faultTime?: number;
};

function FaultCard(props: FaultCardProps) {
  const { faultName, severity } = props;
  return (
    <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 100 }}>
      <div className="flex p-2">
        <div
          className={`flex size-full items-center justify-start border p-2 transition-all duration-200 ${
            severity === ISeverity.ERROR
              ? "hover:border-primaryDark border-primary hover:scale-[1.01]"
              : severity === ISeverity.WARNING
                ? "border-[#F98D10] hover:scale-[1.01]"
                : severity === ISeverity.CLEAR
                  ? "border-[#00A651] hover:scale-[1.01]"
                  : ""
          }`}
        >
          <div className="flex h-full justify-start">
            {severity === ISeverity.ERROR ? (
              <DangerousIcon sx={{ color: "#9C0534", fontSize: "40px" }} />
            ) : severity === ISeverity.WARNING ? (
              <WarningAmberIcon sx={{ color: "#F98D10", fontSize: "40px" }} />
            ) : severity === ISeverity.CLEAR ? (
              <CheckCircleOutlineIcon
                sx={{ color: "#00A651", fontSize: "40px" }}
              />
            ) : null}
          </div>
          <div className="flex w-[93%] text-lg">{faultName}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default FaultCard;
