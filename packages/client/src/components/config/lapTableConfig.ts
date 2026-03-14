import { IFormattedLapData } from "@shared/helios-types";
import { createColumnHelper } from "@tanstack/react-table";

/*
 * This file is used to configure the columns of the lap data table
 * The columns are created using the createColumnHelper() function from tanstack table
 */

const columnHelper = createColumnHelper<IFormattedLapData>();

export const columns = [
  columnHelper.accessor("TimeStamp", {
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
  columnHelper.accessor("AmpHours", {
    cell: (info) => info.getValue(),
    header: "Amp Hours",
  }),
  columnHelper.accessor("AveragePackCurrent", {
    cell: (info) => info.getValue(),
    header: "Average Pack Current",
  }),
  columnHelper.accessor("AverageSpeed", {
    cell: (info) => info.getValue(),
    header: "Average Speed",
  }),
  columnHelper.accessor("BatterySecondsRemaining", {
    cell: (info) => info.getValue(),
    header: "Battery Seconds Remaining",
  }),
  columnHelper.accessor("Distance", {
    cell: (info) => info.getValue(),
    header: "Distance",
  }),
  columnHelper.accessor("EnergyConsumed", {
    cell: (info) => info.getValue(),
    header: "Energy Consumed",
  }),
  columnHelper.accessor("LapTime", {
    cell: (info) => info.getValue(),
    header: "Lap Time",
  }),
  columnHelper.accessor("NetPowerOut", {
    cell: (info) => info.getValue(),
    header: "Net Power Out",
  }),

  columnHelper.accessor("TotalPowerIn", {
    cell: (info) => info.getValue(),
    header: "Total Power In",
  }),
  columnHelper.accessor("TotalPowerOut", {
    cell: (info) => info.getValue(),
    header: "Total Power Out",
  }),
];
