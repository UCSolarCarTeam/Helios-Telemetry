import Card from "./Card";
import DonutChartRect, { DonutChartProps } from "./DonutChartRect";
import EndOfDayPredictorsComponent from "./EndOfDayPredictors";

const PerformanceRectangles = (props: DonutChartProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <Card>
        <p>{"Driver Performance Score"}</p>
        <DonutChartRect
          {...props}
          lowerBound={28}
          percentage={83}
          upperBound={84}
        />
      </Card>
      {/* <DriverPerformanceScoreComponent
        subTitle={"Laps left on Battery (FSGP)"}
        middleNumber={83}
        botLeft={28}
        botRight={84}
        {...props}
      />
      <DriverPerformanceScoreComponent
        subTitle={"Battery Time Remaining."}
        middleNumber={83}
        botLeft={28}
        botRight={84}
        {...props}
      /> */}
      <EndOfDayPredictorsComponent {...props} />
    </div>
  );
};

export default PerformanceRectangles;
