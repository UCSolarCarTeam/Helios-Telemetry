import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

import { useAppState } from "@/contexts/AppStateContext";
import { useLapData } from "@/contexts/LapDataContext";
import { notifications } from "@mantine/notifications";
import { ContentCopy, ContentCopyTwoTone } from "@mui/icons-material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { type IFormattedLapData, prodURL } from "@shared/helios-types";
import { IDriverData } from "@shared/helios-types/src/types";
import {
  SortingState,
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
  columnHelper.accessor("data.energyConsumed", {
    cell: (info) => info.getValue(),
    header: "Energy Consumed",
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
  const { currentAppState } = useAppState();
  const [Rfid, setDriverRFID] = useState<number | string>("");
  const [driverData, setDriverData] = useState<IDriverData[]>([]);
  const [copy, setCopy] = useState<number>(0);
  const { formatLapData, lapData } = useLapData();
  const [filteredLaps, setFilteredLaps] =
    useState<IFormattedLapData[]>(lapData);
  const [sorting, setSorting] = useState<SortingState>([
    { desc: false, id: "data_timeStamp" },
  ]);

  const table = useReactTable({
    columns,
    data: filteredLaps,
    defaultColumn: { enableSorting: true },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [{ desc: false, id: "data_timeStamp" }],
    },
    onSortingChange: setSorting,
    state: { sorting },
  });

  const [columnName, setColumnName] = React.useState<string[]>(
    table.getAllLeafColumns().map((col) => col.id),
  );

  const handleChange = useCallback(
    (event: SelectChangeEvent<typeof columnName>) => {
      const {
        target: { value },
      } = event;

      setColumnName(typeof value === "string" ? value.split(",") : value);

      table.getAllLeafColumns().forEach((col) => {
        const columnInstance = table.getColumn(col.id);
        if (columnInstance) {
          columnInstance.toggleVisibility(value.includes(col.id));
        }
      });
    },
    [table, setColumnName],
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(String(Rfid));
    setCopy(1);
    setTimeout(() => setCopy(0), 5000);
    onCopied();
  };

  const onCopied = useCallback(() => {
    notifications.show({
      color: "green",
      message: "Copied to clipboard",
      title: "Copied",
    });
  }, []);

  const handleDropdown = useCallback(
    async (event: SelectChangeEvent<number | string>) => {
      const newRFID = event.target.value;
      setDriverRFID(newRFID);
      setCopy(0);

      if (Number.isNaN(newRFID) || newRFID === "Show all data") {
        setFilteredLaps(lapData);
      } else {
        await fetchFilteredLaps(Number(newRFID)).then((response) => {
          const formattedData = response.data.map(formatLapData);
          setFilteredLaps(formattedData);
        });
      }
    },
    [formatLapData, lapData],
  );

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

  const fetchFilteredLaps = async (Rfid: number) => {
    try {
      const response = await axios.get(`${prodURL}/driver/${Rfid}`);
      return response.data;
    } catch (error) {
      setFilteredLaps([]);
      return { error: "Error fetching driver laps" };
    }
  };

  useEffect(() => {
    fetchDriverNames()
      .then((response) => {
        const driverData = response.data.map((driver: IDriverData) => ({
          Rfid: driver.Rfid,
          driver: driver.driver,
        }));
        setDriverData(driverData);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  return (
    <div className="m-3 flex flex-col justify-center gap-4">
      <p className="-mb-2 font-bold text-helios">Lap Data</p>
      <hr className="border-[1.4px] border-helios" />
      <div className="flex w-full flex-col items-center gap-2 sm:flex-row">
        <div className="flex flex-row items-center gap-2">
          <Box className="min-w-[120px]" component="div">
            <FormControl fullWidth>
              <InputLabel
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
                label="Driver"
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
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: currentAppState.darkMode ? "white" : "",
                  },
                }}
                value={Rfid}
              >
                <MenuItem value={"Show all data"}>Show all data</MenuItem>
                {driverData.map((driver) => (
                  <MenuItem key={driver.Rfid} value={driver.Rfid}>
                    {driver.driver ? `${driver.driver}` : `NO NAME`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {Number.isNaN(Rfid) || Rfid === "Show all data" ? "" : Rfid}
          {Rfid && Rfid !== "Show all data" ? (
            <button className="items-center" onClick={handleCopy}>
              {copy === 0 ? <ContentCopy /> : <ContentCopyTwoTone />}
            </button>
          ) : (
            <></>
          )}
        </div>
        <FormControl
          sx={{
            display: "flex",
            maxWidth: "100%",
            minWidth: "16rem",
          }}
        >
          <InputLabel
            sx={{
              "&.Mui-focused": {
                color: "#963A56",
              },
              "&.MuiInputLabel-shrink": {
                color: "#963A56",
              },
              color: "#963A56",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            Column
          </InputLabel>

          <Select
            className="max-w-56 overflow-auto"
            input={<OutlinedInput label="Column" />}
            multiple
            onChange={handleChange}
            renderValue={(selected) => {
              return selected
                .map((value) => checkBoxFormatting(value))
                .join(", ");
            }}
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
              "& .MuiSelect-select": {
                color: currentAppState.darkMode ? "#D2D2D2" : "black",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#963A56",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: currentAppState.darkMode ? "white" : "",
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

      <div className="grid max-h-[200px] w-full grid-cols-1 overflow-auto overflow-x-auto">
        <table className="w-full border-separate border-spacing-0 divide-gray-200">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    className={`sticky top-0 z-10 w-24 border-b-2 border-r-2 border-t-2 border-helios bg-slate px-4 py-2 text-center text-xs font-medium uppercase text-helios first:border-l-2 dark:bg-lightergrey ${header.id === "data_timeStamp" ? "left-0 z-50" : ""}`}
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    <span
                      className="ml-1 cursor-pointer text-xs font-bold text-helios hover:text-red-900"
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.column.getIsSorted() === "asc"
                        ? "↑"
                        : header.column.getIsSorted() === "desc"
                          ? "↓"
                          : "⇅"}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr
                className="odd:bg-white even:bg-slate dark:odd:bg-darkergrey dark:even:bg-lightergrey"
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    className={`text-gray-900 w-fullpx-4 sticky w-24 border-b-2 border-r-2 border-helios py-2 text-center text-sm first:border-l-2 dark:text-white ${cell.id.includes("data_timeStamp") ? "left-0 z-10" : ""}`}
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
