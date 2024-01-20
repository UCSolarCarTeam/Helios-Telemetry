import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";

import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

function generateTableData(): any[] {
  var tableData = [];
  for (var i = 0; i < 100; i++) {
    tableData.push({
      dataPoint: faker.number.int({ min: 0, max: 100 }),
      time: faker.number.int({ min: 1553236613, max: 1711089413 }),
      powerIn: faker.number.int({ min: 0, max: 100 }),
      powerOut: faker.number.int({ min: 0, max: 100 }),
      netPowerOut: faker.number.int({ min: 0, max: 100 }),
      speed: faker.number.int({ min: 0, max: 100 }),
      distance: faker.number.int({ min: 0, max: 100 }),
      energy: faker.number.int({ min: 0, max: 100 }),
      efficiency: faker.number.int({ min: 0, max: 100 }),
    });
  }
  return tableData;
}

const tableData = generateTableData();

const GraphOptions = [
  { id: "time", name: "TIME" },
  { id: "power", name: "POWER" },
  { id: "distance", name: "DISTANCE" },
  { id: "amp_hours", name: "AMP HOURS" },
  { id: "current", name: "CURRENT" },
  { id: "battery", name: "BATTERY" },
];

const timeGraphOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      title: {
        display: true,
        text: "Lap Time (minutes)",
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  animation: {
    duration: 0,
  },
};

const powerGraphOptions = {
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
  animation: {
    duration: 0,
  },
};

const distanceGraphOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      title: {
        display: true,
        text: "Distance Remaining (km)",
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  animation: {
    duration: 0,
  },
};

const ampHoursGraphOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      title: {
        display: true,
        text: "Amp Hours (Ah)",
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  animation: {
    duration: 0,
  },
};

const currentGraphOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      title: {
        display: true,
        text: "Average Pack Current (A)",
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  animation: {
    duration: 0,
  },
};

const batteryGraphOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      title: {
        display: true,
        text: "Battery Seconds Remaining (s)",
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  animation: {
    duration: 0,
  },
};

const labels = [0, 5, 10, 15, 20, 25, 30, 35];

const timeGraphData = {
  labels,
  datasets: [
    {
      data: labels.map(() => faker.number.int({ min: 0, max: 3000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const powerGraphData = {
  labels,
  datasets: [
    {
      label: "Total Power In",
      data: labels.map(() => faker.number.int({ min: 0, max: 3000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Total Power Out",
      data: labels.map(() => faker.number.int({ min: 0, max: 3000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Net Power Out",
      data: labels.map(() => faker.number.int({ min: 0, max: 3000 })),
      borderColor: "rgb(66, 204, 45)",
      backgroundColor: "rgba(66, 204, 45, 0.5)",
    },
  ],
};

const distanceGraphData = {
  labels,
  datasets: [
    {
      data: labels.map(() => faker.number.int({ min: 0, max: 3000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const ampHoursGraphData = {
  labels,
  datasets: [
    {
      data: labels.map(() => faker.number.int({ min: 0, max: 3000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const currentGraphData = {
  labels,
  datasets: [
    {
      data: labels.map(() => faker.number.int({ min: 0, max: 3000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const batteryGraphData = {
  labels,
  datasets: [
    {
      data: labels.map(() => faker.number.int({ min: 0, max: 3000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

function RaceTab() {
  const [currentGraph, setCurrentGraph] = useState("time");
  const [menuOpen, setMenuOpen] = useState(false);
  function handleGraphChange(id: string) {
    setCurrentGraph(id);
    setMenuOpen(false);
  }
  function GraphMenu() {
    return (
      <>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="border-light dark:border-dark float-right
            rounded border-2 bg-light p-1 dark:bg-dark"
        >
          {menuOpen ? (
            <MdClose style={{ width: "16px", height: "16px" }} />
          ) : (
            <FiMenu style={{ width: "16px", height: "16px" }} />
          )}
        </button>
        <ul className={menuOpen ? "block pt-7" : "hidden"}>
          {GraphOptions.map((option) => (
            <li
              key={option.id}
              className="bg-light p-2 pl-4 text-right
              text-light hover:bg-primary hover:text-dark dark:bg-dark dark:text-dark hover:dark:bg-primary"
              onClick={() => handleGraphChange(option.id)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      </>
    );
  }
  return (
    <div className="h-full w-full">
      <div className="grid grid-cols-2">
        <div className="block max-h-96 overflow-y-auto">
          <table className="h-full border-collapse">
            <thead className="sticky top-0">
              <tr>
                <th
                  key="lap"
                  className="w-1/12 text-xs uppercase text-light dark:text-dark"
                >
                  Lap Number
                </th>
                <th
                  key="time"
                  className="w-1/12 text-xs uppercase text-light dark:text-dark"
                >
                  Time
                </th>
                <th
                  key="power_in"
                  className="w-1/12 text-xs uppercase text-light dark:text-dark"
                >
                  Power In
                </th>
                <th
                  key="power_out"
                  className="w-1/12 text-xs uppercase text-light dark:text-dark"
                >
                  Power Out
                </th>
                <th
                  key="net_power"
                  className="w-1/12 text-xs uppercase text-light dark:text-dark"
                >
                  Net Power Out
                </th>
                <th
                  key="speed"
                  className="w-1/12 text-xs uppercase text-light dark:text-dark"
                >
                  Avg Speed
                </th>
                <th
                  key="distance"
                  className="w-1/12 text-xs uppercase text-light dark:text-dark"
                >
                  Distance
                </th>
                <th
                  key="amphours"
                  className="w-1/12 text-xs uppercase text-light dark:text-dark"
                >
                  AmpHours
                </th>
                <th
                  key="current"
                  className="w-1/12 text-xs uppercase text-light dark:text-dark"
                >
                  Avg Pack Current
                </th>
              </tr>
            </thead>
            <tbody className="">
              {tableData.map((data) => (
                <tr>
                  <td
                    key={data.id}
                    className="border-light dark:border-dark border-t text-center text-xs text-light dark:text-dark"
                  >
                    {data.dataPoint}
                  </td>
                  <td
                    key={data.id}
                    className="border-light dark:border-dark border-t text-center text-xs text-light dark:text-dark"
                  >
                    {data.time}
                  </td>
                  <td
                    key={data.id}
                    className="border-light dark:border-dark border-t text-center text-xs text-light dark:text-dark"
                  >
                    {data.powerIn} W
                  </td>
                  <td
                    key={data.id}
                    className="border-light dark:border-dark border-t text-center text-xs text-light dark:text-dark"
                  >
                    {data.powerOut} W
                  </td>
                  <td
                    key={data.id}
                    className="border-light dark:border-dark border-t text-center text-xs text-light dark:text-dark"
                  >
                    {data.netPowerOut} W
                  </td>
                  <td
                    key={data.id}
                    className="border-light dark:border-dark border-t text-center text-xs text-light dark:text-dark"
                  >
                    {data.speed} km/h
                  </td>
                  <td
                    key={data.id}
                    className="border-light dark:border-dark border-t text-center text-xs text-light dark:text-dark"
                  >
                    {data.distance} km
                  </td>
                  <td
                    key={data.id}
                    className="border-light dark:border-dark border-t text-center text-xs text-light dark:text-dark"
                  >
                    {data.energy} Ah
                  </td>
                  <td
                    key={data.id}
                    className="border-light dark:border-dark border-t text-center text-xs text-light dark:text-dark"
                  >
                    {data.efficiency} %
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="relative h-full w-full">
          <div className={currentGraph === "time" ? "block h-full" : "hidden"}>
            <Line
              height={"100%"}
              options={timeGraphOptions}
              data={timeGraphData}
            />
          </div>
          <div className={currentGraph === "power" ? "block h-full" : "hidden"}>
            <Line
              height={"100%"}
              options={powerGraphOptions}
              data={powerGraphData}
            />
          </div>
          <div
            className={currentGraph === "distance" ? "block h-full" : "hidden"}
          >
            <Line
              height={"100%"}
              options={distanceGraphOptions}
              data={distanceGraphData}
            />
          </div>
          <div
            className={currentGraph === "amp_hours" ? "block h-full" : "hidden"}
          >
            <Line
              height={"100%"}
              options={ampHoursGraphOptions}
              data={ampHoursGraphData}
            />
          </div>
          <div
            className={currentGraph === "current" ? "block h-full" : "hidden"}
          >
            <Line
              height={"100%"}
              options={currentGraphOptions}
              data={currentGraphData}
            />
          </div>
          <div
            className={currentGraph === "battery" ? "block h-full" : "hidden"}
          >
            <Line
              height={"100%"}
              options={batteryGraphOptions}
              data={batteryGraphData}
            />
          </div>
          <div className="absolute right-0 top-1">
            <GraphMenu />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RaceTab;
