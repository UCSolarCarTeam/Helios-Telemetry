import Card from "./Card";
import DonutChartRect, { DonutChartProps } from "./DonutChartRect";

const PerformanceRectangles = (props: DonutChartProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row md:flex-row lg:flex-row xl:flex-col custom:flex-row">
      <Card className="justify-start">
        <p className="pb-2 pt-2 text-lg">{"Driver Performance Score"}</p>
        <DonutChartRect
          {...props}
          lowerBound={28}
          percentage={83}
          upperBound={84}
        />
      </Card>

      <Card className="h-36 justify-start">
        <p className="pt-2 text-lg">{"End of Day Predictors"}</p>
        <div className="flex flex-row pt-4">
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
        </div>
      </Card>
    </div>
  );
};

export default PerformanceRectangles;
