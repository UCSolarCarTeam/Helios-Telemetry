import React from "react";

import DonutChartRect from "./DonutChartRect";

interface PerformanceRectanglesProps {
  driverPerfScore: number;
  dpsLeft: number;
  dpsRight: number;
  eodPredictor1: number;
  epLeft: number;
  epRight: number;
  eodPredictor2: number;
  ep2Left: number;
  ep2Right: number;
}

const PerformanceRectangles: React.FC<PerformanceRectanglesProps> = ({
  dpsLeft,
  dpsRight,
  driverPerfScore,
  eodPredictor1,
  eodPredictor2,
  ep2Left,
  ep2Right,
  epLeft,
  epRight,
}) => (
  <div className="flex flex-col items-center gap-4 sm:flex-row xl:flex-col custom:flex-row">
    <div className="h-[6.68rem] w-[17.81rem] rounded-2xl bg-[#BFBFBF]">
      <p className="mt-2 text-center text-sm font-normal leading-[1.3rem] sm:text-base md:text-lg">
        Driver Performance Score
      </p>
      <div className="-ml-2 mt-[-0.75rem] flex w-[18.5rem] items-center justify-center opacity-100">
        <DonutChartRect
          circ={310}
          fontSize="1.4rem"
          height="h-[4.4rem]"
          leftoverColour="#FFFFFF"
          numColour="#CF4242"
          percentage={driverPerfScore}
          thickness="78%"
          width="w-[4.4rem]"
        />
      </div>
      <div className="flex justify-center">
        <div className="opacity-1 mt-[-0.25rem] flex w-[4.1rem] items-center justify-between gap-0">
          <span className="text-left text-sm text-primary">{dpsLeft}</span>
          <div className="h-[0.8rem] flex-1 bg-[#BFBFBF]"></div>
          <span className="text-right text-sm text-[#369A34]">{dpsRight}</span>
        </div>
      </div>
    </div>

    <div className="flex h-[8.7rem] w-[17.8rem] flex-col items-center rounded-2xl bg-[#BFBFBF] p-4">
      <p className="mt-[-0.5rem] text-center text-[0.875rem] font-normal leading-[1.35rem] sm:text-base md:text-lg">
        End of Day Predictors
      </p>
      <div className="mt-0 flex items-center justify-center gap-8">
        <div className="mt-[-0.5rem] flex w-[6.5rem] items-center justify-center">
          <div>
            <div className="h-0.6 ml-2">
              <DonutChartRect
                circ={310}
                fontSize="1.4rem"
                height="h-[4.4rem]"
                leftoverColour="#FFFFFF"
                numColour="#CF4242"
                percentage={eodPredictor1}
                thickness="78%"
                width="w-[4.4rem]"
              />
            </div>
            <div>
              <div className="flex w-[5rem] items-center justify-between">
                <span className="text-left text-xs text-primary">{epLeft}</span>
                <div className="mx-1 h-[0.1rem] flex-1 bg-[#BFBFBF]"></div>
                <span className="text-right text-xs text-[#369A34]">
                  {epRight}
                </span>
              </div>
              <p className="-ml-4 text-center text-[0.6rem] leading-[0.7rem]">
                Laps Left on Battery [km] (FSGP)
              </p>
            </div>
          </div>
        </div>

        <div className="mt-[-0.5rem] flex w-[3.1rem] items-center justify-center">
          <div>
            <div className="h-0.6rem ml-2">
              <DonutChartRect
                circ={310}
                fontSize="1.4rem"
                height="h-[4.4rem]"
                leftoverColour="#FFFFFF"
                numColour="#CF4242"
                percentage={eodPredictor2}
                thickness="78%"
                width="w-[4.4rem]"
              />
            </div>
            <div>
              <div className="flex w-[5rem] items-center justify-between">
                <span className="ml-2 text-xs text-primary">{ep2Left}</span>
                <div className="mx-1 h-[0.1rem] flex-1 bg-[#BFBFBF]"></div>
                <span className="text-right text-xs text-[#369A34]">
                  {ep2Right}
                </span>
              </div>
              <p className="text-center text-[0.6rem] leading-[0.7rem]">
                Battery Time Remaining [min]
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PerformanceRectangles;
