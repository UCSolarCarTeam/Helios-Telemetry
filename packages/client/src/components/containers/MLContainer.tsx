"use client";

import axios from "axios";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { PlotParams } from "react-plotly.js";

import correlationMatrixData from "@/correlationMatrixData.json";
import useWindowDimensions from "@/hooks/PIS/useWindowDimensions";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export default function MLContainer() {
  const [plot, setPlot] = useState<PlotParams>();
  const { height, width } = useWindowDimensions();

  const fetchPlot = useCallback(async () => {
    let data = JSON.parse(correlationMatrixData);

    try {
      const response = await axios.get("http://localhost:8000/packet_plot");
      data = JSON.parse(await response.data);
    } catch {}

    const layout: PlotParams["layout"] = {
      height: (height ?? window.innerHeight) / 3.5,
      margin: {
        b: 100,
        l: 185,
        r: (width ?? window.innerWidth) < 380 ? 0 : 150,
        t: 40,
      },
      title: data.layout.title.text,
      width: width * 0.35 || window.innerWidth * 0.35,
      // OLD width
      // (width ?? window.innerWidth) < 380
      //   ? 300
      //   : (width ?? window.innerWidth) < 640
      //     ? 460
      //     : 600,
    };
    data.layout = layout;

    setPlot(data);
  }, [height, width]);

  useEffect(() => {
    fetchPlot();
  }, [fetchPlot]);

  return (
    <>
      <div className="flex w-full items-center justify-center gap-4 rounded-lg bg-white p-2 text-3xl font-bold">
        {plot ? (
          <Plot
            config={{
              displayModeBar: (width ?? window.innerWidth) < 380 ? false : true,
              displaylogo: false,
              modeBarButtonsToRemove: [
                "toImage",
                "zoomOut2d",
                "zoom2d",
                "resetScale2d",
              ],
              scrollZoom: (width ?? window.innerWidth) < 380 ? false : true,
              staticPlot: (width ?? window.innerWidth) < 380 ? true : false,
            }}
            data={plot.data}
            layout={plot.layout}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
}
