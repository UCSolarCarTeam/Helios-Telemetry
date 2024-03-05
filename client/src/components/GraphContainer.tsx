import React from "react";

import DraggableGraph from "@/components/DraggableGraph";
import { useGraphOverlay } from "@/contexts/GraphOverlayContext";

export default function GraphContainer() {
  const { openGraphs, closeGraph } = useGraphOverlay();
  const data = [
    {
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <div className="absolute z-50 m-auto">
      {openGraphs.map((graph) => {
        return (
          <DraggableGraph
            data={data}
            closeGraph={closeGraph}
            graphID={graph}
            key={graph}
          />
        );
      })}
    </div>
  );
}
