import { RefObject, useEffect } from "react";
import Draggable from "react-draggable";
import { IoIosClose } from "react-icons/io";

import { type AnchorElTooltipsRefHandle } from "@/components/molecules/GraphMolecules/FieldGraphTooltip";
import GraphComponent from "@/components/molecules/GraphMolecules/GraphComponent";
import { usePacket } from "@/contexts/PacketContext";

function DraggableGraph({
  closeGraph,
  graphID,
  graphRef,
}: {
  graphRef: RefObject<AnchorElTooltipsRefHandle | null>;
  graphID: string;
  closeGraph: (field: string) => void;
}) {
  const { currentPacket } = usePacket();
  useEffect(() => {}, [currentPacket, graphRef]);

  return (
    <Draggable handle="strong">
      <div className="box absolute z-50 w-fit rounded bg-light text-light shadow-2xl dark:bg-dark dark:text-dark">
        <div className="flex w-full flex-row">
          <strong className="flex grow justify-center">
            <button className="cursor-all-scroll select-none text-center">
              {graphID}
            </button>
          </strong>
          <IoIosClose
            className="cursor-pointer select-none text-black dark:text-white"
            onClick={() => closeGraph(graphID)}
            size={40}
          />
        </div>
        <GraphComponent graphData={graphRef.current?.getData()[0]} />
      </div>
    </Draggable>
  );
}
export default DraggableGraph;
