import { type MutableRefObject } from "react";

import DraggableGraph from "@/components/molecules/GraphMolecules/DraggableGraph";
import { type AnchorElTooltipsRefHandle } from "@/components/molecules/GraphMolecules/FieldGraphTooltip";
import { useGraphOverlay } from "@/contexts/GraphOverlayContext";

export default function GraphContainer() {
  const { openGraphs, closeGraph } = useGraphOverlay();

  return (
    <div className="absolute z-50 m-auto">
      {openGraphs.map((graph) => {
        return (
          <DraggableGraph
            graphRef={
              graph.ref as MutableRefObject<AnchorElTooltipsRefHandle | null>
            }
            closeGraph={closeGraph}
            graphID={graph.name}
            key={graph.name}
          />
        );
      })}
    </div>
  );
}
