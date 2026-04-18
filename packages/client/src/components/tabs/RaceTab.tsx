import React, { useState } from "react";

import { columns } from "@/components/config/lapTableConfig";
import ColumnFilters from "@/components/molecules/RaceTabMolecules/ColumnFilters";
import DriverFilter from "@/components/molecules/RaceTabMolecules/DriverFilter";
import RaceTabTable from "@/components/molecules/RaceTabMolecules/RaceTabTable";
import { useLapDataStore } from "@/stores/useLapData";
import { notifications } from "@mantine/notifications";
import { SelectChangeEvent } from "@mui/material/Select";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
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
  const showAllDataValue = "Show all data";
  const [driverRFID, setDriverRFID] = useState(showAllDataValue);
  const [copy, setCopy] = useState<number>(0);
  const { lapData } = useLapDataStore();
  const [sorting, setSorting] = useState<SortingState>([
    { desc: false, id: "TimeStamp" },
  ]);
  const defaultVisibility = columns.reduce<VisibilityState>(
    (visibility, column) => {
      visibility[column.id ?? ""] = true;
      return visibility;
    },
    {},
  );
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>(defaultVisibility);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]); // can set initial column filter state here

  const table = useReactTable({
    columns,
    data: lapData,
    defaultColumn: { enableSorting: true },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // needed for client-side filtering
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    state: { columnFilters, columnVisibility, sorting },
  });

  const columnName = table
    .getAllLeafColumns()
    .filter((column, index) => index !== 0 && column.getIsVisible())
    .map((column) => column.id);

  const handleColumnFilterChange = (selectedColumns: string[]) => {
    const nextVisibility = table
      .getAllLeafColumns()
      .reduce<VisibilityState>((visibility, column, index) => {
        visibility[column.id] =
          index === 0 ? true : selectedColumns.includes(column.id);
        return visibility;
      }, {});

    setColumnVisibility(nextVisibility);
  };

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
  const handleDropdown = (event: SelectChangeEvent<string>) => {
    const newRFID = String(event.target.value);
    setDriverRFID(newRFID);
    setColumnFilters(
      newRFID === "" || newRFID === showAllDataValue
        ? []
        : [{ id: "data_rfid", value: newRFID }],
    );
    setCopy(0);
  };
  return (
    <div className="m-3 flex flex-col justify-center gap-4">
      <p className="-mb-2 font-bold text-helios">Lap Data</p>
      <hr className="border-[1.4px] border-helios" />
      <div className="flex w-full flex-col items-center gap-2 sm:flex-row">
        <ColumnFilters
          columnName={columnName}
          onColumnNameChange={handleColumnFilterChange}
          table={table}
        />
        <DriverFilter
          Rfid={driverRFID}
          copy={copy}
          handleCopy={handleCopy}
          handleDropdown={handleDropdown}
        />
      </div>

      <RaceTabTable
        columnFilters={columnFilters}
        table={table}
        visibleColumns={columnVisibility}
      />
    </div>
  );
}

export default RaceTab;
