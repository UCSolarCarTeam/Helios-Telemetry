import axios from "axios";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { usePacket } from "@/contexts/PacketContext";
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
    timeStamp: 324234,
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
    timeStamp: 324234,
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
    timeStamp: 324234,
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
    timeStamp: 324234,
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
    timeStamp: 324234,
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
    timeStamp: 324234,
    totalPowerIn: 1500,
    totalPowerOut: 150,
  },
];

function RaceTab() {
  const [lapData, setLapData] = useState<ILapData[]>([]);

  const data = useMemo(() => lapData, [lapData]);

  const { currentPacket } = usePacket();

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  function checkBoxFormatting(text: string) {
    const spaced: string = text.replace(/([A-Z])/g, " $1");
    const result: string = spaced.charAt(0).toUpperCase() + spaced.slice(1);

    return result;
  }

  const fetchLapData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/laps`);
      return response.data; // Assuming the API returns an array of lap data
    } catch (error) {
      return { error: "Error fetching lap data" };
    }
  };

  useEffect(() => {
    fetchLapData()
      .then((response) => {
        const formattedData = response.data.map(
          (lapPacket: { data: ILapData }) => ({
            ampHours: parseFloat(lapPacket.data.ampHours.toFixed(2)),
            averagePackCurrent: parseFloat(
              lapPacket.data.averagePackCurrent.toFixed(2),
            ),
            averageSpeed: parseFloat(lapPacket.data.averageSpeed.toFixed(2)),
            batterySecondsRemaining: parseFloat(
              lapPacket.data.batterySecondsRemaining.toFixed(2),
            ),
            distance: parseFloat(lapPacket.data.distance.toFixed(2)),
            lapTime: parseFloat(lapPacket.data.lapTime.toFixed(2)),
            netPowerOut: parseFloat(lapPacket.data.netPowerOut.toFixed(2)),
            timeStamp: new Date(lapPacket.data.timeStamp).toLocaleDateString(
              "en-US",
            ),
            totalPowerIn: parseFloat(lapPacket.data.totalPowerIn.toFixed(2)),
            totalPowerOut: parseFloat(lapPacket.data.totalPowerOut.toFixed(2)),
          }),
        );

        setLapData(formattedData);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  return (
    <div className="m-4 flex justify-around">
      <div className="mb-4 flex flex-col flex-wrap justify-end gap-2">
        <div className="justify-left flex items-center gap-x-2 pb-2 pr-2">
          <Image
            alt="pfp"
            className="rounded-full border-2 border-helios object-cover p-2"
            height={50}
            src="/assets/HeliosSideview.png"
            width={50}
          />
          <span className="text-sm">
            Current Driver: {currentPacket.Pi.rfid}
          </span>
        </div>
        {table.getAllLeafColumns().map((column) => (
          <label className="flex items-center gap-1 text-sm" key={column.id}>
            <input
              checked={column.getIsVisible()}
              className="peer size-4 cursor-pointer accent-helios"
              onChange={column.getToggleVisibilityHandler()}
              type="checkbox"
            />
            <span className="min-w-44 select-none text-sm peer-hover:font-bold">
              {checkBoxFormatting(column.id)}
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
                    className="text-gray-900 border-x-2 border-helios px-4 py-2 text-center text-sm"
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
