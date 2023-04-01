import React from "react";

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
    return (
      <div>
        <div className="border-t border-[#9C0534] mt-2"></div>
        <div className="flex p-1 mt-1">
          <div className="flex justify-self-start"></div>
          <div className="flex justify-bot h-full">
            <div className="flex justify-start w-[33%]">
              <img
                src="/assets/faults/Error.svg"
                alt="ErrorIcon"
                className="h-full"
              ></img>
            </div>
            <div className="flex self-center justify-end text-2xl min-w-[66%]">
              {faultName}
            </div>
          </div>
        </div>
      </div>
    );
  } else if (severity == ISeverity.Warning) {
    return (
      <div>
        <div className="border-t border-[#9C0534] mt-2"></div>
        <div className="flex p-1 mt-1">
          <div className="flex justify-self-start"></div>
          <div className="flex justify-bot h-full">
            <div
              className="flex justify-start w-1/2"
              //style={{ backgroundImage: WarningAmberIcon }}
            ></div>
            <div className="flex self-center justify-end text-2xl min-w-[66%]">
              {faultName}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="border-t border-[#9C0534] mt-2"></div>
      <div className="flex p-1 mt-2">
        <div className="flex justify-self-start"></div>
        <div className="flex justify-bot h-full">
          <div className="flex justify-start w-1/2">
            <img
              src="/assets/faults/Warning.svg"
              alt="WarningIcon"
              className="h-full"
            ></img>
          </div>
          <div className="flex self-center justify-end text-2xl min-w-[66%]">
            {faultName}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FaultCard;
