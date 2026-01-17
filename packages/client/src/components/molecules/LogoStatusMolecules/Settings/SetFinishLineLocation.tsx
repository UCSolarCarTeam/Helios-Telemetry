import { useTheme } from "next-themes";
import React from "react";

import { socketIO } from "@/components/global/SocketManager";
import { usePacketStore } from "@/stores/usePacket";
import { helios, heliosCompliment, sand } from "@/styles/colors";
import { notifications } from "@mantine/notifications";
import { Button, TextField } from "@mui/material";
import { CoordUpdateResponse } from "@shared/helios-types";

const SetFinishLineLocation = () => {
  const { currentPacket } = usePacketStore();
  const { resolvedTheme } = useTheme();
  const [password, setPassword] = React.useState("");

  const handleSetFinishLineLocation = () => {
    socketIO.emit(
      "setLapCoords",
      {
        lat: (currentPacket?.Telemetry.GpsLatitude).toString() || "0",
        long: (currentPacket?.Telemetry.GpsLongitude).toString() || "0",
        password: password,
      },
      (response: CoordUpdateResponse) => {
        if ("error" in response) {
          notifications.show({
            color: "red",
            message: response.error,
            title: "Error Setting Finish Line Location",
          });
          return;
        }
        notifications.show({
          color: "green",
          message: "Finish Line Location Updated Successfully",
          title: "Success",
        });
      },
    );
  };

  return (
    <div className="mb-4 grid grid-cols-2 items-center justify-between gap-4">
      <div className="col-span-1">
        <label className="mr-2">Update Finish Line Location:</label>
      </div>
      <div className="col-span-1 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        <Button
          className="h-14 min-w-0 flex-1"
          disabled={!password}
          onClick={handleSetFinishLineLocation}
          sx={{
            "&.Mui-disabled": {
              borderColor: resolvedTheme === "dark" ? sand : helios,
              color: resolvedTheme === "dark" ? sand : helios,
              opacity: 0.5,
            },
            "&:hover": {
              backgroundColor:
                resolvedTheme === "dark" ? heliosCompliment : helios,
              borderColor: resolvedTheme === "dark" ? sand : heliosCompliment,
              color: resolvedTheme === "dark" ? sand : "white",
            },
            borderColor: resolvedTheme === "dark" ? sand : helios,
            color: resolvedTheme === "dark" ? sand : helios,
            fontSize: { md: "0.875rem", sm: "0.75rem", xs: "0.65rem" },
            padding: { sm: "12px", xs: "8px" },
            whiteSpace: "normal",
            wordWrap: "break-word",
          }}
          variant="outlined"
        >
          Set Finish Line Location
        </Button>
        <TextField
          className="min-w-0 flex-1"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            "& .MuiInputBase-input": {
              color: resolvedTheme === "dark" ? "white" : "black",
            },
            "& .MuiInputBase-input::label": {
              color: resolvedTheme === "dark" ? sand : helios,
            },
            "& .MuiInputLabel-root, & .MuiInputLabel-root.Mui-focused": {
              color: resolvedTheme === "dark" ? sand : helios,
            },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline, & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: resolvedTheme === "dark" ? sand : helios,
              },
          }}
          type="password"
          value={password}
        />
      </div>
    </div>
  );
};

export default SetFinishLineLocation;
