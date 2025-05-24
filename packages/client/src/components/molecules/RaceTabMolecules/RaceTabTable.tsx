import { IFormattedLapData } from "@shared/helios-types";
import { Table, flexRender } from "@tanstack/react-table";

/**
 *  The actual table that displays the lap data
 */
export default function RaceTabTable({
  table,
}: {
  table: Table<IFormattedLapData>;
}) {
  return (
    <div className="grid max-h-[200px] w-full grid-cols-1 overflow-auto overflow-x-auto">
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
        <tbody className="divide-y divide-gray-200 bg-white">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  className={`text-gray-900 w-fullpx-4 sticky w-24 border-b-2 border-r-2 border-helios py-2 text-center text-sm first:border-l-2 ${cell.id.includes("data_timeStamp") ? "left-0 z-10 bg-white" : ""}`}
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
  );
}
