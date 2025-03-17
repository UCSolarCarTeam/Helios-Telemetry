import React from "react";

import DonutChartRect from "./DonutChartRect";

interface MotorEfficiencySquareProps {
  infoNumber: number;
}

const MotorEfficiencySquare: React.FC<MotorEfficiencySquareProps> = ({
  infoNumber,
}) => (
  <div className="flex h-[17rem] w-[18.7rem] flex-col items-center justify-center rounded-2xl bg-[#BFBFBF] px-4">
    <p className="text-center text-lg font-normal">
      Motor Efficiency at&nbsp;
      <span className="text-primary">{infoNumber}%</span>
    </p>
    <div className="flex w-[15rem] items-center justify-center">
      <DonutChartRect
        circ={360}
        fontSize="2rem"
        height="h-[6.4rem]"
        leftoverColour="#e0daf0"
        numColour="#65558F"
        percentage={infoNumber}
        thickness="80%"
        width="w-[6.4rem]"
      />
    </div>
  </div>
);

export default MotorEfficiencySquare;
