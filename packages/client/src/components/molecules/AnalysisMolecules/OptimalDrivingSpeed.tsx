import React from "react";

interface OptimalSpeedSquareProps {
  percent: number;
  OptimalDrivingSpeed: number;
  leftNumber: number;
  rightNumber: number;
  linePercentage: number;
}

const OptimalSpeedSquare: React.FC<OptimalSpeedSquareProps> = ({
  OptimalDrivingSpeed,
  leftNumber,
  linePercentage,
  percent,
  rightNumber,
}) => (
  <div className="flex h-[17rem] w-[18.7rem] flex-col items-center justify-center rounded-2xl bg-[#BFBFBF] px-4">
    <p className="text-center text-base font-normal sm:text-lg lg:text-xl">
      Optimal Driving Speed At&nbsp;
      <span className="text-primary">{percent}%</span>
    </p>
    <p className="m-2 text-center text-4xl font-normal text-primary md:text-[2.5rem] lg:text-4xl">
      {OptimalDrivingSpeed}km/h
    </p>
    <div className="h-3.5 w-full rounded-full bg-[#3A3A3A]">
      <div className="flex h-3.5 w-1/2 rounded-full bg-[#3A3A3A]">
        <div
          className="ml-auto flex h-3.5 items-stretch bg-[#009F10]"
          style={{ width: `${linePercentage}%` }}
        ></div>
      </div>
    </div>
    <div className="flex w-full items-center justify-between">
      <span className="text-sm text-primary">{leftNumber}</span>
      <span className="text-sm text-primary">{rightNumber}</span>
    </div>
  </div>
);

export default OptimalSpeedSquare;
