import React from "react";
import { ReactComponent as WarningIcon } from "./../../assets/faults/warning.svg";
import { ReactComponent as ErrorIcon } from "./../../assets/faults/Error.svg";

export enum ISeverity {
  "Error",
  "Warning",
}

type FaultCardProps = {
  severity: ISeverity;
  faultName: string;
};

function FaultCard(props: FaultCardProps) {
  const { severity, faultName } = props;

  if (severity == ISeverity.Error) {
  } else if (severity == ISeverity.Warning) {
  }

  return (
    <div className="h-1/6">
      <img src="/Warning.svg" alt="WarningIcon"></img>
    </div>
  );
}

export default FaultCard;
