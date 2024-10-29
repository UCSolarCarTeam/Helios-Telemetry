import { useState } from "react";

import type { ILapData } from "@shared/helios-types";

// sample data
const exampleData: ILapData[] = [
  {
    ampHours: 10,
    averagePackCurrent: 11,
    averageSpeed: 23,
    batterySecondsRemaining: 23,
    distance: 23,
    lapTime: 23423,
    netPowerOut: 13434,
    timeStamp: 324234,
    totalPowerIn: 1234,
    totalPowerOut: 123,
  },
  {
    ampHours: 15,
    averagePackCurrent: 12,
    averageSpeed: 25,
    batterySecondsRemaining: 30,
    distance: 25,
    lapTime: 25000,
    netPowerOut: 15000,
    timeStamp: 324235,
    totalPowerIn: 1500,
    totalPowerOut: 150,
  },
  {
    ampHours: 15,
    averagePackCurrent: 12,
    averageSpeed: 25,
    batterySecondsRemaining: 30,
    distance: 25,
    lapTime: 25000,
    netPowerOut: 15000,
    timeStamp: 324235,
    totalPowerIn: 1500,
    totalPowerOut: 150,
  },
  {
    ampHours: 15,
    averagePackCurrent: 12,
    averageSpeed: 25,
    batterySecondsRemaining: 30,
    distance: 25,
    lapTime: 25000,
    netPowerOut: 15000,
    timeStamp: 324235,
    totalPowerIn: 1500,
    totalPowerOut: 150,
  },
  {
    ampHours: 15,
    averagePackCurrent: 12,
    averageSpeed: 25,
    batterySecondsRemaining: 30,
    distance: 25,
    lapTime: 25000,
    netPowerOut: 15000,
    timeStamp: 324235,
    totalPowerIn: 1500,
    totalPowerOut: 150,
  },
  {
    ampHours: 15,
    averagePackCurrent: 12,
    averageSpeed: 25,
    batterySecondsRemaining: 30,
    distance: 25,
    lapTime: 25000,
    netPowerOut: 15000,
    timeStamp: 324235,
    totalPowerIn: 1500,
    totalPowerOut: 150,
  },
  {
    ampHours: 15,
    averagePackCurrent: 12,
    averageSpeed: 25,
    batterySecondsRemaining: 30,
    distance: 25,
    lapTime: 25000,
    netPowerOut: 15000,
    timeStamp: 324235,
    totalPowerIn: 1500,
    totalPowerOut: 150,
  },
];

//names of columns to be displayed
const tableHeaders = [
  "ampHours",
  "averagePackCurrent",
  "averageSpeed",
  "batterySecondsRemaining",
  "distance",
  "lapTime",
  "netPowerOut",
  "timeStamp",
  "totalPowerIn",
  "totalPowerOut",
];

function formatHeaders(header: string) {
  return header.replace(/([a-z])([A-Z])/g, "$1 $2").toUpperCase();
  // uses a regular expression to add a space after a lowercase letter followed by an uppercase, and then converts the whole thing to uppercase
}
//javascript libraries are used to seperate the words

function RaceTab() {
  const [checked, setChecked] = useState<string[]>(tableHeaders); //all columns are shown initially

  const handleCheckboxChange = (header: string) => {
    setChecked((prevChecked) =>
      prevChecked.includes(header)
        ? prevChecked.filter((h) => h !== header)
        : [...prevChecked, header],
    );
  };

  return (
    <div className="m-4 flex justify-center gap-2">
      <div className="mb-4 flex flex-col flex-wrap justify-end gap-2">
        {tableHeaders.map((header, i) => (
          <label
            className="flex items-center gap-1 text-sm text-helios"
            key={i}
          >
            <input
              checked={checked.includes(header)}
              className="accent-slate-200 hover:accent-red-500"
              onChange={() => handleCheckboxChange(header)}
              type="checkbox"
            />
            {header}
          </label>
        ))}
      </div>

      <div className="w-3/4 overflow-x-auto">
        <table className="w-full table-fixed divide-gray-200 border-b-2 border-helios">
          <thead className="border-b-2 border-helios">
            <tr>
              {checked.map((header, i) => (
                <th
                  className="text-gray-500 overflow-x-hidden px-4 py-2 text-center text-xs font-medium uppercase text-helios"
                  key={i}
                >
                  {formatHeaders(header)}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {exampleData.map((lap, i) => (
              <tr key={i}>
                {checked.map((header, j) => (
                  <td
                    className={`text-gray-900 border-x-2 border-helios px-4 py-2 text-center text-sm`}
                    key={j}
                  >
                    {lap[header as keyof ILapData]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RaceTab;
