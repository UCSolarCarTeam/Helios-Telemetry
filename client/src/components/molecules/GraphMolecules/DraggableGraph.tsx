import { type MutableRefObject, useEffect, useState } from "react";
import React from "react";
import Draggable from "react-draggable";
import { IoIosClose } from "react-icons/io";

import GraphComponent2 from "@/components/molecules/GraphMolecules/GraphComponent2";
import { type AnchorElTooltipsRefHandle } from "@/components/transformers/PISTransformer";
import { usePacket } from "@/contexts/PacketContext";

function DraggableGraph({
  myRef,
  closeGraph,
  graphID,
}: {
  myRef: MutableRefObject<AnchorElTooltipsRefHandle | null>;
  graphID: string;
  closeGraph: (field: string) => void;
}) {
  const { currentPacket } = usePacket();
  useEffect(() => {
    console.log(myRef.current?.getData()[0]);
  }, [currentPacket]);

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
        <GraphComponent2 graphData={myRef.current?.getData()[0]} />
      </div>
    </Draggable>
  );
}
export default DraggableGraph;
