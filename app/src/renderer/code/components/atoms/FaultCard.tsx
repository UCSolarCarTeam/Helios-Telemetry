import { motion } from "framer-motion";
import React from "react";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DangerousIcon from "@mui/icons-material/Dangerous";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export enum ISeverity {
  ERROR,
  WARNING,
  CLEAR,
}

type FaultCardProps = {
  severity: ISeverity;
  faultName: string;
  faultTime?: number;
};

function FaultCard(props: FaultCardProps) {
  const { severity, faultName } = props;
  return (
    <motion.div
      className="h-[15%]"
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: 100, opacity: 0 }}
    >
      <div className="flex p-2">
        <div className="flex justify-self-start"></div>
        <div
          className={`flex size-full items-center justify-start border p-2 ${
            severity === ISeverity.ERROR
              ? "border-[#9C0534]"
              : severity === ISeverity.WARNING
                ? "border-[#F98D10]"
                : severity === ISeverity.CLEAR
                  ? "border-[#00A651]"
                  : ""
          }`}
        >
          <div className="flex h-full w-[15%] justify-start">
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
          <div className="flex w-[85%] text-2xl">{faultName}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default FaultCard;
