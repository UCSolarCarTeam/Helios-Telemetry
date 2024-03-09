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

function DraggableGraph({
  data,
  closeGraph,
  graphID,
}: {
  data: any[];
  graphID: string;
  closeGraph: (field: string) => void;
}) {
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
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          style={{ cursor: "crosshair" }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </div>
    </Draggable>
  );
}
export default DraggableGraph;
