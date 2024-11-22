"use client";

import axios from "axios";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { PlotParams } from "react-plotly.js";

import correlationMatrixData from "@/correlationMatrixData.json";
import useWindowDimensions from "@/hooks/PIS/useWindowDimensions";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
const SMALL_SCREEN = 380;
export default function MLContainer() {
  const [plot, setPlot] = useState<PlotParams>();
  const { width } = useWindowDimensions();

  const fetchPlot = useCallback(async () => {
    let data = JSON.parse(correlationMatrixData);

    try {
      const response = await axios.get("http://localhost:8000/packet_plot");
      data = JSON.parse(await response.data);
    } catch {}

    const layout: PlotParams["layout"] = {
      autosize: true,
      title: data.layout.title.text,
    };
    data.layout = layout;

    setPlot(data);
  }, []);

  useEffect(() => {
    fetchPlot();
  }, [fetchPlot]);

  if (!plot) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex max-h-96 w-full items-center justify-center gap-4 rounded-lg bg-white p-2 text-3xl font-bold">
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
    </div>
  );
}
