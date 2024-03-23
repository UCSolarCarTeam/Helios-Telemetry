import * as Highcharts from "highcharts";
import { type SelectEventObject } from "highcharts";
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
  Highcharts.addEvent(
    Highcharts.Series,
    "addPoint",
    (e: Highcharts.ChartSelectionCallbackFunction) => {
      const point = e.point,
        series = e.target;

      if (!series.pulse) {
        series.pulse = series.chart.renderer.circle().add(series.markerGroup);
      }

      setTimeout(() => {
        series.pulse
          .attr({
            x: series.xAxis.toPixels(point.x, true),
            y: series.yAxis.toPixels(point.y, true),
            r: series.options.marker.radius,
            opacity: 1,
            fill: series.color,
          })
          .animate(
            {
              r: 20,
              opacity: 0,
            },
            {
              duration: 1000,
            },
          );
      }, 1);
    },
  );

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
