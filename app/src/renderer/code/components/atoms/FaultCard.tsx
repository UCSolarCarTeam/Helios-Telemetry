import React from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DangerousIcon from "@mui/icons-material/Dangerous";

export enum ISeverity {
  ERROR,
  WARNING,
}

type FaultCardProps = {
  severity: ISeverity;
  faultName: string;
};

function FaultCard(props: FaultCardProps) {
  const { severity, faultName } = props;

  return (
    <>
      <div className="flex p-2">
        <div className="flex justify-self-start"></div>
        <div
          className={`flex h-full w-full justify-start items-center p-2 border ${
            severity == ISeverity.ERROR
              ? "border-[#9C0534]"
              : "border-[#F98D10]"
          }`}
        >
          <div className="flex justify-start h-full w-[15%]">
            {severity == ISeverity.ERROR ? (
              <DangerousIcon sx={{ color: "#9C0534", fontSize: "40px" }} />
            ) : severity == ISeverity.WARNING ? (
              <WarningAmberIcon sx={{ color: "#F98D10", fontSize: "40px" }} />
            ) : null}
          </div>
          <div className="flex text-2xl w-[85%]">{faultName}</div>
        </div>
      </div>
    </>
  );
}

export default FaultCard;
