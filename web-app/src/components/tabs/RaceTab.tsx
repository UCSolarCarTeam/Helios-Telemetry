import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      title: {
        display: true,
        text: "Power (W)",
      },
    },
  },
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
};

const labels = [0, 5, 10, 15, 20, 25, 30, 35];

export const data = {
  labels,
  datasets: [
    {
      label: "Total Power In",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 3000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Total Power Out",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 3000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Net Power Out",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 3000 })),
      borderColor: "rgb(66, 204, 45)",
      backgroundColor: "rgba(66, 204, 45, 0.5)",
    },
  ],
};

function generateTableData(): any[] {
  var tableData = [];
  for (var i = 0; i < 100; i++) {
    tableData.push({
      dataPoint: faker.datatype.number({ min: 0, max: 100 }),
      time: faker.datatype.number({ min: 1553236613, max: 1711089413 }),
      powerIn: faker.datatype.number({ min: 0, max: 100 }),
      powerOut: faker.datatype.number({ min: 0, max: 100 }),
      netPowerOut: faker.datatype.number({ min: 0, max: 100 }),
      speed: faker.datatype.number({ min: 0, max: 100 }),
      distance: faker.datatype.number({ min: 0, max: 100 }),
      energy: faker.datatype.number({ min: 0, max: 100 }),
      efficiency: faker.datatype.number({ min: 0, max: 100 }),
    });
  }
  return tableData;
}

export const tableData = generateTableData();

const GraphMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "close" : "open"}
      </button>
      <ul className={menuOpen ? "block" : "hidden"}>
        <li>Graph 1</li>
        <li>Graph 2</li>
        <li>Graph 3</li>
      </ul>
    </div>
  );
};

function RaceTab() {
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-2">
        <div className="block max-h-96 overflow-y-auto">
          <table className="border-collapse h-full">
            <thead className="top-0 sticky">
              <tr>
                <th className="uppercase text-xs w-1/12 dark:text-dark text-light">
                  Lap Number
                </th>
                <th className="uppercase text-xs w-1/12 dark:text-dark text-light">
                  Time
                </th>
                <th className="uppercase text-xs w-1/12 dark:text-dark text-light">
                  Power In
                </th>
                <th className="uppercase text-xs w-1/12 dark:text-dark text-light">
                  Power Out
                </th>
                <th className="uppercase text-xs w-1/12 dark:text-dark text-light">
                  Net Power Out
                </th>
                <th className="uppercase text-xs w-1/12 dark:text-dark text-light">
                  Avg Speed
                </th>
                <th className="uppercase text-xs w-1/12 dark:text-dark text-light">
                  Distance
                </th>
                <th className="uppercase text-xs w-1/12 dark:text-dark text-light">
                  AmpHours
                </th>
                <th className="uppercase text-xs w-1/12 dark:text-dark text-light">
                  Avg Pack Current
                </th>
              </tr>
            </thead>
            <tbody className="overflow-scroll">
              {tableData.map((data) => (
                <tr>
                  <td className="border-t border-light dark:border-dark text-center text-xs dark:text-dark text-light">
                    {data.dataPoint}
                  </td>
                  <td className="border-t border-light dark:border-dark text-center text-xs dark:text-dark text-light">
                    {data.time}
                  </td>
                  <td className="border-t border-light dark:border-dark text-center text-xs dark:text-dark text-light">
                    {data.powerIn} W
                  </td>
                  <td className="border-t border-light dark:border-dark text-center text-xs dark:text-dark text-light">
                    {data.powerOut} W
                  </td>
                  <td className="border-t border-light dark:border-dark text-center text-xs dark:text-dark text-light">
                    {data.netPowerOut} W
                  </td>
                  <td className="border-t border-light dark:border-dark text-center text-xs dark:text-dark text-light">
                    {data.speed} km/h
                  </td>
                  <td className="border-t border-light dark:border-dark text-center text-xs dark:text-dark text-light">
                    {data.distance} km
                  </td>
                  <td className="border-t border-light dark:border-dark text-center text-xs dark:text-dark text-light">
                    {data.energy} Ah
                  </td>
                  <td className="border-t border-light dark:border-dark text-center text-xs dark:text-dark text-light">
                    {data.efficiency} %
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="h-full w-full">
          <Line height={"100%"} width={"100%"} options={options} data={data} />
        </div>
      </div>
    </div>
  );
}

export default RaceTab;
