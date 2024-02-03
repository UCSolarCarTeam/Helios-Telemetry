import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
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

interface GraphOverlayContextProps {
  children: ReactNode | ReactNode[];
}

interface IGraphOverlayContexttReturn {
  openNewGraph: (field: string) => void;
}

const graphOverlayContext = createContext<IGraphOverlayContexttReturn>(
  {} as IGraphOverlayContexttReturn,
);

function DragableGraph({ data }: { data: any[] }) {
  return (
    <div className="">
      <Draggable handle=".handle">
        <div className="handle">Drag from here</div>

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
      </Draggable>
    </div>
  );
}

export function GraphOverlayContextProvider({
  children,
}: GraphOverlayContextProps): JSX.Element {
  const [openGraphs, setOpenGraphs] = useState<string[]>([]);

  const openNewGraph = (field: string) => setOpenGraphs([...openGraphs, field]);
  const closeGraph = (field: string) =>
    setOpenGraphs(openGraphs.filter((graph) => graph !== field));
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <graphOverlayContext.Provider value={{ openNewGraph }}>
      {children}

      {openGraphs.map((graph) => (
        <DragableGraph key={graph} data={data} />
      ))}
    </graphOverlayContext.Provider>
  );
}

export function useGraphOverlay(): IGraphOverlayContexttReturn {
  return useContext(graphOverlayContext);
}
