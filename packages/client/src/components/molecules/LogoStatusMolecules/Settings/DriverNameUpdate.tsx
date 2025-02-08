import axios from "axios";
import axios from "axios";
import React, { useState } from "react";

import { Button, TextField } from "@mui/material";
import { IDriverNameUpdate } from "@shared/helios-types";

const driverDetailsText: IDriverNameUpdate = {
  name: "Name",
  rfid: "RFID",
} as const;

export default function DriverUpdate() {
  const [driverDetails, setDriverDetails] = useState<IDriverNameUpdate>({
    name: "",
    rfid: "",
  });

  const [errors, setErrors] = useState(new Set<keyof IDriverNameUpdate>());
  const [errorMessage, setErrorMessage] = useState("");

  const validateInputs = () => {
    const newErrors = new Set<keyof IDriverNameUpdate>();
    let message = "";

    if (
      typeof driverDetails.name !== "string" ||
      driverDetails.name.trim() === "" ||
      /\d/.test(driverDetails.name)
    ) {
      newErrors.add("name");
      message =
        "Name must be a non-empty string and should not contain digits.";
    }

    if (isNaN(Number(driverDetails.rfid))) {
      newErrors.add("rfid");
      message = "RFID must be a number.";
    }

    setErrors(newErrors);
    setErrorMessage(message);

    return newErrors.size === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInputs()) {
      axios
        .post("http://localhost:3001/updatedriverinfo", {
          name: driverDetails.name,
          rfid: Number(driverDetails.rfid),
        })
        .then((res) => {
          if (res.status === 200) {
            setErrorMessage("Driver info updated successfully");
          } else {
            setErrorMessage("Error updating driver info");
          }
        });
    }
  };

  return (
    <div className="mb-4 grid grid-cols-2 items-center justify-between">
      <div className="col-span-1">
        <label className="mr-2">Update Driver Info:</label>
      </div>
      <form className="col-span-1 flex flex-col" onSubmit={handleSubmit}>
        {Object.keys(driverDetailsText).map((key) => (
          <TextField
            error={errors.has(key as keyof IDriverNameUpdate)}
            helperText={
              errors.has(key as keyof IDriverNameUpdate) ? errorMessage : ""
            }
            key={key}
            label={driverDetailsText[key as keyof IDriverNameUpdate]}
            name={key}
            onChange={(e) => {
              setDriverDetails((prev) => ({
                ...prev,
                [key]: e.target.value,
              }));
            }}
            variant="filled"
          />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
