import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useRef, useState } from "react";

import { type I_PISFieldData } from "@/objects/PIS/PIS.interface";

export default function GraphComponent2({
  graphData,
}: {
  graphData?: I_PISFieldData;
}) {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      backgroundColor: "#D2D2D2",
      type: "spline",
    },
    xAxis: {
      categories: ["A", "B", "C"],
      title: { text: "Time" },
    },
    yAxis: {
      title: { text: "Value" },
    },
    series: [{ data: new Array(15).fill(0) }],
    credits: {
      enabled: false,
    },
    title: {
      text: undefined,
    },
  });
  const [chart, setChart] = useState(null);
  const chartComponent = useRef(null);

  useEffect(() => {
    setChart(chartComponent.current.chart);
  }, []);

  const updateSeries = () => {
    if (chart) {
      chart.series[0].addPoint([graphData?.time, graphData?.value], true, true);
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
