import { useCallback } from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { IFormattedLapData } from "@shared/helios-types";
import { Table } from "@tanstack/react-table";

export default function ColumnFilters({
  columnName,
  setColumnName,
  table,
}: {
  columnName: string[];
  setColumnName: React.Dispatch<React.SetStateAction<string[]>>;
  table: Table<IFormattedLapData>;
}) {
  function checkBoxFormatting(text: string) {
    return text
      .replace(/^.*?_/g, "")
      .replace(/_/g, " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^\w/, (c) => c.toUpperCase());
  }

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
  return (
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
          return selected.map((value) => checkBoxFormatting(value)).join(", ");
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
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#963A56",
          },
        }}
        value={columnName}
      >
        {table.getAllLeafColumns().map(
          (column, index) =>
            index !== 0 && (
              <MenuItem key={checkBoxFormatting(column.id)} value={column.id}>
                {checkBoxFormatting(column.id)}
              </MenuItem>
            ),
        )}
      </Select>
    </FormControl>
  );
}
