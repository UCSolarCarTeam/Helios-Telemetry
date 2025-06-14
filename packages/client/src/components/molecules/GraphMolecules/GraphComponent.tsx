/* eslint-disable sort-keys */
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useRef, useState } from "react";

import { type I_PISFieldData } from "@/objects/PIS/PIS.interface";

export default function GraphComponent({
  graphData,
}: {
  graphData?: I_PISFieldData;
}) {
  const [chartOptions] = useState<Highcharts.Options>({
    chart: {
      backgroundColor: "#D2D2D2",
      height: 200,
      type: "spline",
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        color: "#9C0534",
        data: new Array(15).fill(0),
        name: undefined,
        showInLegend: false,
        type: "spline",
      },
    ],
    title: {
      text: undefined,
    },
    xAxis: {
      title: { text: "Time" },
    },
    yAxis: {
      title: { text: `Value (${graphData?.unit})` },
    },
  });
  const [chart, setChart] = useState<Highcharts.Chart | null>(null);
  const chartComponent = useRef<HighchartsReact.RefObject>(null);
  interface PulseSeries extends Highcharts.Series {
    pulse: Highcharts.SVGElement;
    markerGroup?: Highcharts.SVGElement;
  }
  interface AddPointEvent {
    point: Highcharts.Point;
    target: PulseSeries;
  }
  Highcharts.addEvent(Highcharts.Series, "addPoint", (e: AddPointEvent) => {
    const point: Highcharts.Point = e.point,
      series: PulseSeries = e.target;

    if (!series.pulse) {
      series.pulse = series.chart.renderer.circle().add(series.markerGroup);
    }
    setTimeout(() => {
      series.pulse
        .attr({
          fill: series.color,
          opacity: 1,
          // @ts-expect-error: Necessary for accessing 'radius' property.
          r: (series.options.marker as { object }).radius as number,
          x: series.xAxis.toPixels(point.x, true),
          y: series.yAxis.toPixels(point.y as number, true),
        })
        .animate(
          {
            opacity: 0,
            r: 20,
          },
          {
            duration: 1000,
          },
        );
    }, 1);
  });

  useEffect(() => {
    setChart(chartComponent.current && chartComponent.current.chart);
  }, []);

  const updateSeries = () => {
    if (
      chart &&
      chart.series &&
      chart.series[0] &&
      graphData &&
      typeof graphData.value !== "undefined"
    ) {
      chart.series[0].addPoint([graphData.value], true, true);
    }
  };
  useEffect(() => {
    updateSeries();
  }, [graphData]);
  return (
    <div className="w-80">
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        ref={chartComponent}
      />
    </div>
  );
}
