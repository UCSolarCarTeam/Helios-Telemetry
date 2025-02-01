import axios from "axios";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import type { ILapData } from "@shared/helios-types";
import { IDriverData } from "@shared/helios-types/src/types";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper<ILapData>();

const columns = [
  columnHelper.accessor("rfid", {
    cell: (info) => info.getValue(),
    header: "RFID",
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
  columnHelper.accessor("data.timeStamp", {
    cell: (info) => info.getValue(),
    header: "Time Stamp",
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
  const [lapData, setLapData] = useState<ILapData[]>([]);
  const [rfid, setDriverRFID] = useState<number | undefined>(undefined);
  const [driverData, setDriverData] = useState<IDriverData[]>([]);

  const handleDriverRFID: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setDriverRFID(Number(e.target.value));
  };

  // const filteredLapData = useMemo(
  //   () => (rfid ? lapData.filter((lap) => lap.rfid === rfid) : lapData),
  //   [lapData, rfid],
  // );

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
  });

  function checkBoxFormatting(text: string) {
    const spaced: string = text.replace(/([A-Z])/g, " $1");
    const result: string = spaced.charAt(0).toUpperCase() + spaced.slice(1);

    return result;
  }

  const fetchLapData = async () => {
    try {
      const response = await axios.get(
        `https://aedes.calgarysolarcar.ca:3001/laps`,
      );
      return response.data; // Assuming the API returns an array of lap data
    } catch (error) {
      return { error: "Error fetching lap data" };
    }
  };
  const fetchDriverNames = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/drivers`);
      return response.data;
    } catch (error) {
      return { error: "Error fetching drivers" };
    }
  };

  useEffect(() => {
    fetchDriverNames()
      .then((response) => {
        const formattedData = response.data.map((driver: IDriverData) => ({
          driver: driver.driver,
          rfid: driver.rfid,
        }));
        setDriverData(formattedData);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  useEffect(() => {
    fetchLapData()
      .then((response) => {
        const formattedData = response.data.map((lapPacket: ILapData) => ({
          data: {
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
          },
          rfid: lapPacket.rfid,
        }));
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
          <select className="w-64" onChange={handleDriverRFID}>
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
      {filteredLapData.length === 0 ? (
        <div className="w-3/4 overflow-x-auto">
          <div className="pt-8 text-center">No Lap Data</div>
        </div>
      ) : (
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
          </table>
          <div style={{ height: "350px", overflow: "auto" }}>
            <table className="w-full table-fixed divide-gray-200 border-b-2 border-helios">
              <tbody className="divide-y divide-gray-200 bg-white">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        className={`text-gray-900 border-x-2 border-helios px-4 py-2 text-center text-sm`}
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
      )}
    </div>
  );
}

export default RaceTab;
