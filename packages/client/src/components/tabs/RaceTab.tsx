import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

import { columns } from "@/components/config/lapTableConfig";
import ColumnFilters from "@/components/molecules/RaceTabMolecules/ColumnFilters";
import DriverFilter from "@/components/molecules/RaceTabMolecules/DriverFilter";
import RaceTabTable from "@/components/molecules/RaceTabMolecules/RaceTabTable";
import { useLapDataStore } from "@/stores/useLapData";
import { notifications } from "@mantine/notifications";
import { SelectChangeEvent } from "@mui/material/Select";
import { type IFormattedLapData, prodURL } from "@shared/helios-types";
import { IDriverData, ILapData } from "@shared/helios-types/src/types";
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
 * Lap data is initially fetched from dynamoDB with useLapData()
 * Driver names are also fetched from dynamoDB in the useEffect() with the fetchDriveNames()
 * When the dropdown is pressed for the driver, the handleDropdown() is called and then the
 * fetchFilteredLaps() is called to get the lap data for the selected driver
 * When the column filter is changed, the setColumnName() is called to set the column name
 */
function RaceTab() {
  const [Rfid, setDriverRFID] = useState<number | string>("");
  const [driverData, setDriverData] = useState<IDriverData[]>([]);
  const [copy, setCopy] = useState<number>(0);
  const { formatLapData, lapData } = useLapDataStore();
  const [filteredLaps, setFilteredLaps] =
    useState<IFormattedLapData[]>(lapData);
  const [sorting, setSorting] = useState<SortingState>([
    { desc: false, id: "TimeStamp" },
  ]);

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
      await navigator.clipboard.writeText(String(Rfid));
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
  const handleDropdown = useCallback(
    async (event: SelectChangeEvent<number | string>) => {
      const newRFID = event.target.value;
      setDriverRFID(newRFID);
      setCopy(0);

      if (Number.isNaN(newRFID) || newRFID === "Show all data") {
        setFilteredLaps(lapData);
      } else {
        const response = await fetchFilteredLaps(Number(newRFID));
        const formattedData = response.map(formatLapData);
        setFilteredLaps(formattedData);
      }
    },
    [formatLapData, lapData],
  );

  // fetch the driver names from dynamo
  const fetchDriverNames = async () => {
    try {
      const response = await axios.get<IDriverData[]>(`${prodURL}/drivers`);

      return response.data;
    } catch (error) {
      return { error: "Error fetching drivers" };
    }
  };

  // get the driver laps based on the selected rfid
  const fetchFilteredLaps = async (Rfid: number) => {
    try {
      const response = await axios.get<ILapData[]>(`${prodURL}/driver/${Rfid}`);
      return response.data;
    } catch (error) {
      setFilteredLaps([]);
      return [];
    }
  };

  // fetching driver names when component mounts
  useEffect(() => {
    void (async (): Promise<void> => {
      try {
        const response = await fetchDriverNames();

        if (!Array.isArray(response)) {
          setDriverData([]);
          return;
        }

        const driverData = response.map((driver: IDriverData) => ({
          Rfid: driver.Rfid,
          driver: driver.driver,
        }));

        setDriverData(driverData);
      } catch (error) {
        setDriverData([]);
      }
    })();
  }, []);

  return (
    <div className="m-3 flex flex-col justify-center gap-4">
      <p className="-mb-2 font-bold text-helios">Lap Data</p>
      <hr className="border-[1.4px] border-helios" />
      <div className="flex w-full flex-col items-center gap-2 sm:flex-row">
        <DriverFilter
          Rfid={Rfid}
          copy={copy}
          driverData={driverData}
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
