import { type MutableRefObject, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { IoIosClose } from "react-icons/io";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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
  const NUM_DATA_POINTS = 10;

  useEffect(() => {
    // console.log(myRef.current?.getData());
    setArr((prevState) => {
      if (prevState.length > NUM_DATA_POINTS) {
        return [
          ...prevState,
          { X: myRef.current?.getData()[0].value as number },
        ].slice(1);
      } else {
        return [...prevState, { X: 0 }];
      }
    });
  }, [currentPacket]);
  const [arr, setArr] = useState([{ X: 0 }, { X: 0 }, { X: 0 }, { X: 0 }]);

  // const xDataKey = "time";
  const yDataKey = "X";
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
        <LineChart
          width={250}
          height={150}
          data={arr}
          margin={{
            left: -25,
          }}
          style={{ cursor: "crosshair" }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {/* <XAxis dataKey={xDataKey} /> */}
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={yDataKey}
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
    </Draggable>
  );
}
export default DraggableGraph;
