import { useMemo } from "react";

import type { ILapData } from "@shared/helios-types";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper<ILapData>();

const columns = [
  columnHelper.accessor("ampHours", {
    cell: (info) => info.getValue(),
    header: "Amp Hours",
  }),
  columnHelper.accessor("averagePackCurrent", {
    cell: (info) => info.getValue(),
    header: "Average Pack Current",
  }),
  columnHelper.accessor("averageSpeed", {
    cell: (info) => info.getValue(),
    header: "Average Speed",
  }),
  columnHelper.accessor("batterySecondsRemaining", {
    cell: (info) => info.getValue(),
    header: "Battery Seconds Remaining",
  }),
  columnHelper.accessor("distance", {
    cell: (info) => info.getValue(),
    header: "Distance",
  }),
  columnHelper.accessor("lapTime", {
    cell: (info) => info.getValue(),
    header: "Lap Time",
  }),
  columnHelper.accessor("netPowerOut", {
    cell: (info) => info.getValue(),
    header: "Net Power Out",
  }),
  columnHelper.accessor("timeStamp", {
    cell: (info) => info.getValue(),
    header: "Time Stamp",
  }),
  columnHelper.accessor("totalPowerIn", {
    cell: (info) => info.getValue(),
    header: "Total Power In",
  }),
  columnHelper.accessor("totalPowerOut", {
    cell: (info) => info.getValue(),
    header: "Total Power Out",
  }),
];

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

function RaceTab() {
  const data = useMemo(() => exampleData, []);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="m-4 flex justify-around">
      <div className="mb-4 flex flex-col flex-wrap justify-end gap-2">
        {table.getAllLeafColumns().map((column) => (
          <label className="flex items-center gap-1 text-sm" key={column.id}>
            <input
              checked={column.getIsVisible()}
              className="peer size-4 cursor-pointer accent-helios"
              onChange={column.getToggleVisibilityHandler()}
              type="checkbox"
            />
            <span className="min-w-44 select-none text-sm peer-hover:font-bold">
              {column.id}
            </span>
          </label>
        ))}
      </div>

      <div className="w-3/4 overflow-x-auto">
        <table className="w-full table-fixed divide-gray-200 border-b-2 border-helios">
          <thead className="border-b-2 border-helios">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    className="text-gray-500 overflow-x-hidden px-4 py-2 text-center text-xs font-medium uppercase text-helios"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    className={`text-gray-900 border-x-2 border-helios px-4 py-2 text-center text-sm`}
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
