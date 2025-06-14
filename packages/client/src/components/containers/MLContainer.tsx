"use client";

import { useEffect, useState } from "react";
import type { PlotParams } from "react-plotly.js";

import { useAppState } from "@/contexts/AppStateContext";
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
  const {
    currentAppState: { darkMode },
  } = useAppState();
  useEffect(() => {
    const fetchPlot = async () => {
      try {
        const response = await fetch(plotType);
        const graph = await response.json();
        const data = JSON.parse(graph) as PlotParams;
        const layout: PlotParams["layout"] = {
          autosize: true,
          font: {
            color: darkMode ? "white" : "black",
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
  }, [plotType, darkMode]);

  if (!plot) {
    return (
      <div className="flex h-72 items-center justify-center rounded-lg bg-white p-2 text-3xl font-bold dark:bg-arsenic dark:text-white">
        Loading...
      </div>
    );
  }
  if ("error" in plot) {
    return (
      <div className="flex h-72 items-center justify-center rounded-lg bg-white p-2 text-3xl font-bold dark:bg-arsenic dark:text-white">
        Error loading data
      </div>
    );
  }
  return (
    <div className="flex h-72 items-center gap-4 overflow-x-auto overflow-y-hidden rounded-lg bg-white p-2 text-3xl font-bold dark:bg-arsenic dark:text-white sm:justify-center">
      <Plotly
        className="h-72 w-max bg-inherit"
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
    </div>
  );
}
