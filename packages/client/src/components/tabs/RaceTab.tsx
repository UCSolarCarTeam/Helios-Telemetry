import axios from "axios";
import React, { useEffect, useState } from "react";

import { useLapData } from "@/contexts/LapDataContext";
import { ContentCopy, ContentCopyTwoTone } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  type IFormattedLapData,
  ILapData,
  prodURL,
} from "@shared/helios-types";
import { IDriverData } from "@shared/helios-types/src/types";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper<IFormattedLapData>();

const formatLapData = (lapPacket: ILapData): IFormattedLapData => ({
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
    timeStamp: new Date(lapPacket.data.timeStamp).toLocaleString("en-US"),
    totalPowerIn: parseFloat(lapPacket.data.totalPowerIn.toFixed(2)),
    totalPowerOut: parseFloat(lapPacket.data.totalPowerOut.toFixed(2)),
  },
  rfid: lapPacket.rfid,
  timestamp: lapPacket.timestamp,
});

const columns = [
  columnHelper.accessor("data.timeStamp", {
    cell: (info) => info.getValue(),
    header: "Time Stamp",
    sortingFn: (rowA, rowB, columnId) => {
      const parseDate = (dateString: string) => {
        const parts = dateString.split(" ");

        const dateParts = parts[0]?.split("/");
        const timeParts = parts[1]?.split(":");

        if (!dateParts || !timeParts) {
          throw new Error("Invalid Time");
        }
        const hour = Number(timeParts[0]);
        const minute = Number(timeParts[1]);

        const day = Number(dateParts[1]);
        const month = Number(dateParts[0]);
        const year = Number(dateParts[2]);
        return new Date(year, month - 1, day, hour, minute).getTime();
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
  const [rfid, setDriverRFID] = useState<number | null>(null);
  const [driverData, setDriverData] = useState<IDriverData[]>([]);
  const [copy, setCopy] = useState<number>(0);
  const { lapData } = useLapData();
  const [filteredLaps, setFilteredLaps] =
    useState<IFormattedLapData[]>(lapData);
  const [columnName, setColumnName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof columnName>) => {
    const {
      target: { value },
    } = event;
    setColumnName(typeof value === "string" ? value.split(",") : value);

    table.getAllLeafColumns().forEach((col) => {
      const columnInstance = table.getColumn(col.id);
      if (columnInstance) {
        columnInstance.toggleVisibility(!value.includes(col.id));
      }
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(String(rfid));
    setCopy(1);
  };

  const handleDropdown = async (event: SelectChangeEvent<number | null>) => {
    const newRFID = Number(event.target.value);
    setDriverRFID(newRFID);
    setCopy(0);

    if (rfid == null || Number.isNaN(newRFID)) {
      setFilteredLaps(lapData);
    } else {
      await fetchFilteredLaps(newRFID).then((response) => {
        const formattedData = response.data.map(formatLapData);
        setFilteredLaps(formattedData);
      });
    }
  };

  const table = useReactTable({
    columns,
    data: filteredLaps,
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
      const response = await axios.get(`${prodURL}/drivers`);
      return response.data;
    } catch (error) {
      return { error: "Error fetching drivers" };
    }
  };

  const fetchFilteredLaps = async (rfid: number) => {
    try {
      const response = await axios.get(`${prodURL}/driver/${rfid}`);
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
    <div className="m-4 flex flex-col justify-center gap-4">
      <div className="flex w-full flex-col items-center sm:flex-row">
        <div className="flex flex-row items-center gap-2">
          <Box className="min-w-[120px]" component="div">
            <FormControl fullWidth>
              <InputLabel
                id="driver-select-label"
                sx={{
                  "&.Mui-focused": {
                    color: "#963A56",
                  },
                  "&.MuiInputLabel-shrink": {
                    color: "#963A56",
                  },
                  color: "#963A56",
                }}
              >
                Driver
              </InputLabel>
              <Select
                id="driver-select"
                label="Driver"
                labelId="driver-select-label"
                onChange={handleDropdown}
                sx={{
                  "& .MuiMenuItem-root": {
                    "&:hover": {
                      backgroundColor: "#963A56",
                    },
                    backgroundColor: "#B94A6C",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#B94A6C",
                  },
                  "& .MuiSelect-icon": {
                    color: "#963A56",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#963A56",
                  },
                }}
                value={rfid}
              >
                <MenuItem value={NaN}>Show all data</MenuItem>
                {driverData.map((driver) => (
                  <MenuItem key={driver.rfid} value={driver.rfid}>
                    {driver.driver ? `${driver.driver}` : `NO NAME`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {rfid ? rfid : ""}
          {rfid ? (
            <button className="items-center" onClick={handleCopy}>
              {copy === 0 ? <ContentCopy /> : <ContentCopyTwoTone />}
            </button>
          ) : (
            <div></div>
          )}
          <div></div>
        </div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel
            id="column-toggle-label"
            sx={{
              "&.Mui-focused": {
                color: "#963A56",
              },
              "&.MuiInputLabel-shrink": {
                color: "#963A56",
              },
              color: "#963A56",
            }}
          >
            Column
          </InputLabel>

          <Select
            id="column-toggle"
            input={<OutlinedInput id="select-multiple-chip" label="Column" />}
            labelId="column-toggle-label"
            multiple
            onChange={handleChange}
            renderValue={(selected) => (
              <Box className="flex flex-wrap gap-2" component="div">
                {selected.map((value) => (
                  <Chip key={value} label={checkBoxFormatting(value)} />
                ))}
              </Box>
            )}
            sx={{
              "& .MuiMenuItem-root": {
                "&:hover": {
                  backgroundColor: "#963A56",
                },
                backgroundColor: "#B94A6C",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#B94A6C",
              },
              "& .MuiSelect-icon": {
                color: "#963A56",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#963A56",
              },
            }}
            value={columnName}
          >
            {table.getAllLeafColumns().map(
              (column, index) =>
                index !== 0 && (
                  <MenuItem
                    key={checkBoxFormatting(column.id)}
                    value={column.id}
                  >
                    {checkBoxFormatting(column.id)}
                  </MenuItem>
                ),
            )}
          </Select>
        </FormControl>
      </div>

      <div className="grid max-h-[218px] w-full grid-cols-1 overflow-auto overflow-x-auto">
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
