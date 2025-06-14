import { useTheme } from "next-themes";

import { ContentCopy, ContentCopyTwoTone } from "@mui/icons-material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";

/*
 * This component is used to filter the drivers of the lap data table
 * Each specific driver is shown in the dropdown and will have their specific laps based on their Rfid
 */
export default function DriverFilter({
  Rfid,
  copy,
  driverData,
  handleCopy,
  handleDropdown,
}: {
  driverData: { Rfid: string; driver: string }[];
  handleDropdown: (event: SelectChangeEvent<string>) => void;
  handleCopy: () => void;
  Rfid: string | number;
  copy: number;
}) {
  const { resolvedTheme } = useTheme();
  return (
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
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: resolvedTheme === "dark" ? "#222" : "#fff",
                  color: resolvedTheme === "dark" ? "#fff" : "#963A56",
                },
              },
            }}
            label="Driver"
            onChange={handleDropdown}
            sx={{
              "& .MuiMenuItem-root": {
                "&:hover": {
                  backgroundColor: "#963A56",
                },
                backgroundColor: "#B94A6C",
                color: resolvedTheme === "dark" ? "#fff" : "#963A56",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#B94A6C",
              },
              "& .MuiSelect-icon": {
                color: "#963A56",
              },
              "& .MuiSelect-select": {
                color: resolvedTheme === "dark" ? "#fff" : "#963A56",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#963A56",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: resolvedTheme === "dark" ? "white" : "",
              },
            }}
            value={Rfid?.toString()}
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
  );
}
