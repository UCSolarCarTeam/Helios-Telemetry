import axios from "axios";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";

import { useLapData } from "@/contexts/LapDataContext";
import type { IFormattedLapData } from "@shared/helios-types";
import { IDriverData } from "@shared/helios-types/src/types";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper<IFormattedLapData>();

const columns = [
  columnHelper.accessor("data.timeStamp", {
    cell: (info) => info.getValue(),
    header: "Time Stamp",
    sortingFn: (rowA, rowB, columnId) => {
      const parseDate = (dateString: string) => {
        const parts = dateString.split("/");
        const month = Number(parts[0]);
        const day = Number(parts[1]);
        const year = Number(parts[2]);
        return new Date(year, month - 1, day).getTime();
      };
      const dateA = parseDate(rowA.getValue(columnId));
      const dateB = parseDate(rowB.getValue(columnId));
      return dateB - dateA;
    },
  }),
  columnHelper.accessor("data.ampHours", {
    cell: (info) => info.getValue(),
    header: "Amp Hours",
  }),
  columnHelper.accessor("data.averagePackCurrent", {
    cell: (info) => info.getValue(),
    header: "Average Pack Current",
  }),
  columnHelper.accessor("data.averageSpeed", {
    cell: (info) => info.getValue(),
    header: "Average Speed",
  }),
  columnHelper.accessor("data.batterySecondsRemaining", {
    cell: (info) => info.getValue(),
    header: "Battery Seconds Remaining",
  }),
  columnHelper.accessor("data.distance", {
    cell: (info) => info.getValue(),
    header: "Distance",
  }),
  columnHelper.accessor("data.lapTime", {
    cell: (info) => info.getValue(),
    header: "Lap Time",
  }),
  columnHelper.accessor("data.netPowerOut", {
    cell: (info) => info.getValue(),
    header: "Net Power Out",
  }),

  columnHelper.accessor("data.totalPowerIn", {
    cell: (info) => info.getValue(),
    header: "Total Power In",
  }),
  columnHelper.accessor("data.totalPowerOut", {
    cell: (info) => info.getValue(),
    header: "Total Power Out",
  }),
];

function RaceTab() {
  const [rfid, setDriverRFID] = useState<number | undefined>(undefined);
  const [driverData, setDriverData] = useState<IDriverData[]>([]);
  const { lapData } = useLapData();

  const handleDriverRFID: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setDriverRFID(Number(e.target.value));
  };

  const filteredLapData = useMemo(() => {
    const res = rfid
      ? lapData.filter((lap) => {
          return Number(lap.rfid) === rfid;
        })
      : lapData;
    return res;
  }, [lapData, rfid]);

  const table = useReactTable({
    columns,
    data: filteredLapData,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [{ desc: false, id: "data_timeStamp" }],
    },
  });

  function checkBoxFormatting(text: string) {
    return text
      .replace(/^.*?_/g, "")
      .replace(/_/g, " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^\w/, (c) => c.toUpperCase());
  }

  const fetchDriverNames = async () => {
    try {
      const response = await axios.get(
        `https://aedes.calgarysolarcar.ca:3001/drivers`,
      );
      return response.data;
    } catch (error) {
      return { error: "Error fetching drivers" };
    }
  };

  useEffect(() => {
    fetchDriverNames()
      .then((response) => {
        const driverData = response.data.map((driver: IDriverData) => ({
          driver: driver.driver,
          rfid: driver.rfid,
        }));
        setDriverData(driverData);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  return (
    <div className="m-4 flex flex-col justify-between gap-4 md:flex-row">
      <div className="flex flex-wrap gap-2 md:w-1/3 lg:w-1/4">
        <div className="flex w-full items-center gap-x-2 pb-2 pr-2">
          <Image
            alt="pfp"
            className="rounded-full border-2 border-helios object-cover p-2"
            height={50}
            src="/assets/HeliosSideview.png"
            width={50}
          />
          <select className="w-32" onChange={handleDriverRFID}>
            <option value="all">Show all data</option>
            {driverData.map((driver) => (
              <option key={driver.rfid} value={driver.rfid}>
                {driver.driver
                  ? `${driver.driver}: ${driver.rfid}`
                  : `NO NAME: ${driver.rfid}`}
              </option>
            ))}
          </select>
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

      <div className="overflow-x-auto md:w-2/3 lg:w-3/4">
        <div style={{ height: "350px", overflow: "auto" }}>
          <table className="w-full border-separate border-spacing-0 divide-gray-200">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      className={`sticky top-0 z-10 w-24 border-b-2 border-r-2 border-t-2 border-helios bg-white px-4 py-2 text-center text-xs font-medium uppercase text-helios first:border-l-2 ${header.id === "data_timeStamp" ? "left-0 z-50" : ""}`}
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
                      className={`text-gray-900 w-fullpx-4 sticky w-24 border-b-2 border-r-2 border-helios py-2 text-center text-sm first:border-l-2 ${typeof cell.id} ${cell.id.includes("data_timeStamp") ? "left-0 z-10 bg-white" : ""}`}
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RaceTab;
