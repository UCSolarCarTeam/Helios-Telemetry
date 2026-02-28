import React, { useEffect, useState } from "react";

import { columns } from "@/components/config/lapTableConfig";
import ColumnFilters from "@/components/molecules/RaceTabMolecules/ColumnFilters";
import DriverFilter from "@/components/molecules/RaceTabMolecules/DriverFilter";
import RaceTabTable from "@/components/molecules/RaceTabMolecules/RaceTabTable";
import { useDriverLaps } from "@/hooks/useDriverLaps";
import { useDrivers } from "@/hooks/useDrivers";
import { useLapDataStore } from "@/stores/useLapData";
import { notifications } from "@mantine/notifications";
import { SelectChangeEvent } from "@mui/material/Select";
import { type IFormattedLapData } from "@shared/helios-types";
import {
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

/*
 * This component is used to display the lap data of the drivers
 * Filters are shown in ColumnFilters
 * Driver name are shown in DriverFilter
 * Lap data is shown in RaceTabTable
 *
 * Tanstack table is used to display the data in a table format
 *
 * The flow of data is as follows:
 * Lap data is initially fetched from timescale with useLapData()
 * Driver names are also fetched from timescale in the useEffect() with the fetchDriveNames()
 * When the dropdown is pressed for the driver, the handleDropdown() is called and then the
 * fetchFilteredLaps() is called to get the lap data for the selected driver
 * When the column filter is changed, the setColumnName() is called to set the column name
 */
function RaceTab() {
  const [driverRFID, setDriverRFID] = useState<string>("");
  const [copy, setCopy] = useState<number>(0);
  const { formatLapData, lapData } = useLapDataStore();
  const [filteredLaps, setFilteredLaps] =
    useState<IFormattedLapData[]>(lapData);
  const [sorting, setSorting] = useState<SortingState>([
    { desc: false, id: "TimeStamp" },
  ]);

  // Use TanStack Query hooks for data fetching
  const { data: drivers } = useDrivers();
  const { data: driverLaps } = useDriverLaps({
    enabled:
      driverRFID.length > 0 &&
      driverRFID !== "Show all data" &&
      driverRFID !== "",
    rfid: driverRFID,
  });

  useEffect(() => {
    if (driverRFID === "" || driverRFID === "Show all data") {
      setFilteredLaps(lapData);
      return;
    }

    setFilteredLaps(driverLaps.map(formatLapData));
  }, [driverLaps, driverRFID, formatLapData, lapData]);

  const table = useReactTable({
    columns,
    data: filteredLaps,
    defaultColumn: { enableSorting: true },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [{ desc: false, id: "TimeStamp" }],
    },
    onSortingChange: setSorting,
    state: { sorting },
  });

  const [columnName, setColumnName] = React.useState<string[]>(
    table.getAllLeafColumns().map((col) => col.id),
  );

  // copy rfid to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(String(driverRFID));
      setCopy(1);
      setTimeout(() => setCopy(0), 5000);
      notifications.show({
        color: "green",
        message: "Copied to clipboard",
        title: "Copied",
      });
    } catch (error) {
      notifications.show({
        color: "red",
        message: `Error copying to clipboard: ${error instanceof Error ? error.message : String(error)}`,
        title: "Error",
      });
    }
  };

  // dropdown handler for the drivers
  // dropdown handler for the drivers
  const handleDropdown = (event: SelectChangeEvent<string>) => {
    const newRFID = String(event.target.value);
    setDriverRFID(newRFID);
    setCopy(0);
  };
  return (
    <div className="m-3 flex flex-col justify-center gap-4">
      <p className="-mb-2 font-bold text-helios">Lap Data</p>
      <hr className="border-[1.4px] border-helios" />
      <div className="flex w-full flex-col items-center gap-2 sm:flex-row">
        <DriverFilter
          Rfid={driverRFID}
          copy={copy}
          driverData={drivers ?? []}
          handleCopy={handleCopy}
          handleDropdown={handleDropdown}
        />
        <ColumnFilters
          columnName={columnName}
          setColumnName={setColumnName}
          table={table}
        />
      </div>

      <RaceTabTable table={table} />
    </div>
  );
}

export default RaceTab;
