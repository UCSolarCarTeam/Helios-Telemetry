import { RefObject } from "react";

import DraggableGraph from "@/components/molecules/GraphMolecules/DraggableGraph";
import { type AnchorElTooltipsRefHandle } from "@/components/molecules/GraphMolecules/FieldGraphTooltip";
import { useGraphOverlay } from "@/contexts/GraphOverlayContext";

export default function GraphContainer() {
  const { closeGraph, openGraphs } = useGraphOverlay();

  return (
    <div className="absolute z-50 m-auto">
      {openGraphs.map((graph) => {
        return (
          <DraggableGraph
            closeGraph={closeGraph}
            graphID={graph.name}
            graphRef={graph.ref as RefObject<AnchorElTooltipsRefHandle | null>}
            key={graph.name}
          />
        );
      })}
    </div>
  );
}
