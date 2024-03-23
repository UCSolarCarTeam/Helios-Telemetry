import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useRef, useState } from "react";

import { type I_PISFieldData } from "@/objects/PIS/PIS.interface";

export default function GraphComponent2({
  graphData,
}: {
  graphData?: I_PISFieldData;
}) {
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({
    chart: {
      backgroundColor: "#D2D2D2",
      type: "spline",
    },
    xAxis: {
      title: { text: "Time" },
    },
    yAxis: {
      title: { text: `Value (${graphData?.unit})` },
    },
    series: [
      {
        data: new Array(15).fill(0),
        name: undefined,
        color: "#9C0534",
        type: "spline",
      },
    ],
    credits: {
      enabled: false,
    },
    title: {
      text: undefined,
    },
  });
  const [chart, setChart] = useState<Highcharts.Chart | null>(null);
  const chartComponent = useRef<HighchartsReact.RefObject>(null);

  useEffect(() => {
    setChart(chartComponent.current && chartComponent.current.chart);
  }, []);

  const updateSeries = () => {
    if (chart) {
      chart.series[0].addPoint([graphData?.value], true, true);
    }
  };
  useEffect(() => {
    updateSeries();
  }, [graphData]);
  return (
    <div className=" w-96">
      <HighchartsReact
        ref={chartComponent}
        highcharts={Highcharts}
        options={chartOptions}
      />
    </div>
  );
}
