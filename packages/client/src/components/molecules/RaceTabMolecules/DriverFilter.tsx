import { useTheme } from "next-themes";

import { gray, helios, heliosCompliment } from "@/styles/colors";
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
  handleDropdown: (event: SelectChangeEvent<string>) => Promise<void>;
  handleCopy: () => Promise<void>;
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
                color: heliosCompliment,
              },
              "&.MuiInputLabel-shrink": {
                color: heliosCompliment,
              },
              color: heliosCompliment,
            }}
          >
            Driver
          </InputLabel>
          <Select
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: resolvedTheme === "dark" ? gray : "white",
                  color: resolvedTheme === "dark" ? "white" : heliosCompliment,
                },
              },
            }}
            label="Driver"
            onChange={(event) => void handleDropdown(event)}
            sx={{
              "& .MuiMenuItem-root": {
                "&:hover": {
                  backgroundColor: heliosCompliment,
                },
                backgroundColor: helios,
                color: resolvedTheme === "dark" ? "white" : heliosCompliment,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: helios,
              },
              "& .MuiSelect-icon": {
                color: heliosCompliment,
              },
              "& .MuiSelect-select": {
                color: resolvedTheme === "dark" ? "white" : heliosCompliment,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: heliosCompliment,
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
        <button className="items-center" onClick={() => void handleCopy()}>
          {copy === 0 ? <ContentCopy /> : <ContentCopyTwoTone />}
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
