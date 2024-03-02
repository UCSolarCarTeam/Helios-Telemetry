import Draggable from "react-draggable";
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
      <div className="box z-50 w-fit rounded bg-red-500">
        <div className="flex flex-row justify-between">
          <strong>
            <button className="rounded bg-orange-400">Drag here</button>
          </strong>
          <strong>
            <div className="select-none">{graphID}</div>
          </strong>

          <strong>
            <button
              onClick={() => closeGraph(graphID)}
              className=" rounded bg-red-400"
            >
              Close Graph
            </button>
          </strong>
        </div>

        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
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
