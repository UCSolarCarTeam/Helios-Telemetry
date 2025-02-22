import React, { useCallback, useEffect, useState } from "react";

import { useAppState } from "@/contexts/AppStateContext";
import { socketIO } from "@/contexts/SocketContext";
import { Button, TextField } from "@mui/material";
import { CoordInfoUpdate, CoordUpdateResponse } from "@shared/helios-types";

const coordsFieldText: CoordInfoUpdate = {
  lat: "Latitude",
  long: "Longitude",
  password: "Password",
} as const;
export default function FlagCoordinates() {
  const { currentAppState } = useAppState();
  const [coords, setCoords] = useState<CoordInfoUpdate>({
    lat: currentAppState.lapCoords.lat.toString(),
    long: currentAppState.lapCoords.long.toString(),
    password: "",
  });
  const [errors, setErrors] = useState(new Set<keyof CoordInfoUpdate>());
  const [errorMessage, setErrorMessage] = useState("");
  const onLapCoords = useCallback((coords: CoordUpdateResponse) => {
    if ("invalidFields" in coords && coords.invalidFields) {
      const errorSet: Set<keyof CoordInfoUpdate> = new Set(
        coords.invalidFields,
      );
      setErrors(errorSet);
      setErrorMessage(coords.error ?? "");
    } else {
      setErrors(new Set());
    }
  }, []);
  useEffect(() => {
    socketIO.on("lapCoords", onLapCoords);
  }, [onLapCoords]);
  const handleCoordsSubmit = useCallback(() => {
    const newCoordInfo = {
      lat: coords.lat,
      long: coords.long,
      password: coords.password,
    };
    socketIO.emit("setLapCoords", newCoordInfo);
  }, [coords]);
  const handleCoordsChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setCoords((prev) => ({
        ...prev,
        [name]: value ? value : prev[name as keyof CoordInfoUpdate],
      }));
    },
    [],
  );
  return (
    <div className="mb-4 grid grid-cols-2 items-center justify-between">
      <div className="col-span-1">
        <label className="mr-2">Update Flag Coordinates:</label>
      </div>
      <form
        className="col-span-1 flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {Object.keys(coordsFieldText).map((key) => (
          <TextField
            error={errors.has(key as keyof CoordInfoUpdate)}
            helperText={
              errors.has(key as keyof CoordInfoUpdate) ? errorMessage : ""
            }
            key={key}
            label={coordsFieldText[key as keyof CoordInfoUpdate]}
            name={key}
            onChange={handleCoordsChange}
            placeholder={
              key !== "password" ? coords[key as keyof CoordInfoUpdate] : ""
            }
            type={key === "password" ? "password" : undefined}
            variant="filled"
          />
        ))}
        <Button onClick={handleCoordsSubmit} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
