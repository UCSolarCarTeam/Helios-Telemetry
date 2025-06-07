import Card from "./Card";
import DonutChartRect from "./DonutChartRect";
import PerformanceRectangles from "./PerformanceRectangles";

const statsProps = {
  OptimalDrivingSpeed: 50,
  dpsLeft: 28,
  dpsRight: 97,
  driverPerfScore: 83,
  eodPredictor1: 74,
  eodPredictor2: 89,
  ep2Left: 57,
  ep2Right: 104,
  epLeft: 135,
  epRight: 269,
  infoNumber: 78,
  leftNumber: 46,
  linePercentage: 40,
  percent: 38,
  rightNumber: 55,
};

const StatsContainer = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 xl:flex-nowrap custom:flex-wrap">
      <div className="flex flex-col items-center gap-4 dark:text-black sm:flex-row">
        <Card className={"text-3xl font-bold"} square>
          <p className="text-center text-base font-normal dark:text-white sm:text-lg lg:text-xl">
            Optimal Driving Speed At
            <span className="text-primary"> {statsProps.percent}%</span>
          </p>
          <p className="pt-1 text-center text-4xl font-normal text-primary">
            {statsProps.OptimalDrivingSpeed}km/h
          </p>
          <div className="h-3 w-full rounded-full bg-arsenic">
            <div
              className="flex h-3 items-stretch rounded-full bg-green-dark"
              style={{ width: `${statsProps.linePercentage}%` }}
            />
          </div>
          <div className="flex w-full items-center justify-between pt-1">
            <span className="text-sm text-primary">
              {statsProps.leftNumber}
            </span>
            <span className="text-sm text-primary">
              {statsProps.rightNumber}
            </span>
          </div>
        </Card>

        <Card className="text-lg" square>
          <p className="text-lg dark:text-white">{"Motor Efficiency at"}</p>
          <DonutChartRect
            circ={360}
            className="size-28"
            fontSize="2rem"
            leftoverColour="#e0daf0"
            numColour="#65558F"
            percentage={statsProps.infoNumber}
            thickness="80%"
          />
        </Card>
      </div>

      <PerformanceRectangles percentage={0} {...statsProps} />
    </div>
  );
};

export default StatsContainer;
