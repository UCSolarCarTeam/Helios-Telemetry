"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { PlotParams } from "react-plotly.js";

import useWindowDimensions from "@/hooks/PIS/useWindowDimensions";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
const SMALL_SCREEN = 380;
type PlotTypes =
  | "/api/getPacketCorrelationMatrix"
  | "/api/getLapCorrelationMatrix";
export default function MLContainer({
  plotType = "/api/getLapCorrelationMatrix",
}: {
  plotType?: PlotTypes;
}) {
  const [plot, setPlot] = useState<PlotParams | { error: boolean }>();
  const { width } = useWindowDimensions();

  const fetchPlot = useCallback(async () => {
    try {
      const response = await fetch(plotType);
      const graph = await response.json();
      const data = JSON.parse(graph);
      const layout: PlotParams["layout"] = {
        autosize: true,
        title: data.layout.title.text,
      };
      data.layout = layout;

      setPlot(data);
    } catch (e) {
      setPlot({ error: true });
    }
  }, [plotType]);

  useEffect(() => {
    fetchPlot();
  }, [fetchPlot]);

  if (!plot) {
    return <div>Loading...</div>;
  }
  if ("error" in plot) {
    return <div>Error loading data</div>;
  }
  return (
    <Plot
      className="h-96 w-full"
      config={{
        displayModeBar: width < SMALL_SCREEN,
        displaylogo: false,
        modeBarButtonsToRemove: [
          "toImage",
          "zoomOut2d",
          "zoom2d",
          "resetScale2d",
        ],
        scrollZoom: true,
        staticPlot: width < SMALL_SCREEN,
      }}
      data={plot.data}
      layout={plot.layout}
      useResizeHandler={true}
    />
  );
}
