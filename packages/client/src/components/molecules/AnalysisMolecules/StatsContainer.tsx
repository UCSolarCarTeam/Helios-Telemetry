import MotorEfficiencySquare from "./MotorEfficiencySquare";
import OptimalSpeedSquare from "./OptimalDrivingSpeed";
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
    <div className="flex flex-wrap items-center justify-center gap-4 md:flex-nowrap">
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <OptimalSpeedSquare {...statsProps} />

        <MotorEfficiencySquare infoNumber={statsProps.infoNumber} />
      </div>

      <PerformanceRectangles {...statsProps} />
    </div>
  );
};

export default StatsContainer;
