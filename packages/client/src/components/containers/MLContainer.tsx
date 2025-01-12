"use client";

import { useEffect, useState } from "react";
import type { PlotParams } from "react-plotly.js";

import useWindowDimensions from "@/hooks/PIS/useWindowDimensions";

import Plotly from "./Plotly";

const SMALL_SCREEN = 380;

type PlotTypes =
  | "/api/getPacketCorrelationMatrix"
  | "/api/getLapCorrelationMatrix";

export default function MLContainer({
  plotType = "/api/getPacketCorrelationMatrix",
}: {
  plotType?: PlotTypes;
}) {
  const [plot, setPlot] = useState<PlotParams | { error: boolean }>();
  const { width } = useWindowDimensions();

  useEffect(() => {
    const fetchPlot = async () => {
      try {
        const response = await fetch(plotType);
        const graph = await response.json();
        const data = JSON.parse(graph) as PlotParams;
        const layout: PlotParams["layout"] = {
          autosize: true,
          font: {
            color: "black",
          },
          margin: { l: 175, t: 75 },
          paper_bgcolor: "rgba(0,0,0,0)",
          title: data.layout.title,
        };
        data.layout = layout;

        setPlot(data);
      } catch (e) {
        setPlot({ error: true });
      }
    };
    fetchPlot();
  }, [plotType]);

  if (!plot) {
    return <div>Loading...</div>;
  }
  if ("error" in plot) {
    return <div>Error loading data</div>;
  }
  return (
    <Plotly
      className="h-72 w-full bg-inherit"
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
    />
  );
}
