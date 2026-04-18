import { useTheme } from "next-themes";

import { useDrivers } from "@/hooks/useDrivers";
import { gray, helios, heliosCompliment } from "@/styles/colors";
import { ContentCopy, ContentCopyTwoTone } from "@mui/icons-material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
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
  handleCopy,
  handleDropdown,
}: {
  handleDropdown: (event: SelectChangeEvent<string>) => void;
  handleCopy: () => Promise<void>;
  Rfid: string;
  copy: number;
}) {
  const { resolvedTheme } = useTheme();
  const { data: driverData, isError, isLoading } = useDrivers();
  const helperText = isLoading
    ? "Loading drivers..."
    : isError
      ? "Unable to load drivers."
      : " ";

  return (
    <div className="flex flex-row items-center gap-2">
      <Box className="min-w-[120px]" component="div">
        <FormControl error={isError} fullWidth>
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
            value={Rfid}
          >
            <MenuItem value={"Show all data"}>Show all data</MenuItem>
            {isLoading && <MenuItem disabled>Loading drivers...</MenuItem>}
            {isError && <MenuItem disabled>Unable to load drivers</MenuItem>}
            {driverData?.map((driver) => (
              <MenuItem key={driver.rfid} value={driver.rfid}>
                {driver.driver ? `${driver.driver}` : `NO NAME`}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
      </Box>
      {Number.isNaN(Rfid) || Rfid === "Show all data" ? "" : Rfid}
      {Rfid && Rfid !== "Show all data" && (
        <button className="items-center" onClick={() => void handleCopy()}>
          {copy === 0 ? <ContentCopy /> : <ContentCopyTwoTone />}
        </button>
      )}
    </div>
  );
}
