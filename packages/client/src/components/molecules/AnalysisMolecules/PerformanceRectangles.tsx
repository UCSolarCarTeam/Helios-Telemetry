import Card from "./Card";
import DonutChartRect, { DonutChartProps } from "./DonutChartRect";

const PerformanceRectangles = (props: DonutChartProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <Card className={"bg-yellow-100"}>
        <p>{"Driver Performance Score"}</p>
        <DonutChartRect
          {...props}
          lowerBound={28}
          percentage={83}
          subTitle="this is a test title, to delete later"
          upperBound={84}
        />
      </Card>

      <Card className="flex-row">
        <p className="">{"End of Day Predictors"}</p>
        <DonutChartRect
          {...props}
          lowerBound={135}
          percentage={74}
          subTitle="Laps Left on Battery [km] (FSGP)"
          upperBound={269}
        />
        <DonutChartRect
          {...props}
          lowerBound={57}
          percentage={89}
          subTitle="Battery Time Remaining [min]"
          upperBound={104}
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
      {/*<EndOfDayPredictorsComponent {...props} />*/}
    </div>
  );
};

export default PerformanceRectangles;
