import { type MutableRefObject, useEffect } from "react";
import Draggable from "react-draggable";
import { IoIosClose } from "react-icons/io";

import { type AnchorElTooltipsRefHandle } from "@/components/molecules/GraphMolecules/FieldGraphTooltip";
import GraphComponent from "@/components/molecules/GraphMolecules/GraphComponent";
import { usePacket } from "@/contexts/PacketContext";

function DraggableGraph({
  graphRef,
  closeGraph,
  graphID,
}: {
  graphRef: MutableRefObject<AnchorElTooltipsRefHandle | null>;
  graphID: string;
  closeGraph: (field: string) => void;
}) {
  const { currentPacket } = usePacket();
  useEffect(() => {}, [currentPacket, graphRef]);

  return (
    <Draggable handle="strong">
      <div className="box bg-light text-light dark:bg-dark dark:text-dark absolute z-50 w-fit rounded shadow-2xl">
        <div className="flex w-full flex-row ">
          <strong className="flex grow justify-center ">
            <button className=" cursor-all-scroll  select-none text-center">
              {graphID}
            </button>
          </strong>
          <IoIosClose
            onClick={() => closeGraph(graphID)}
            size={40}
            className=" cursor-pointer select-none text-black dark:text-white"
          />
        </div>
        <GraphComponent graphData={graphRef.current?.getData()[0]} />
      </div>
    </Draggable>
  );
}
export default DraggableGraph;