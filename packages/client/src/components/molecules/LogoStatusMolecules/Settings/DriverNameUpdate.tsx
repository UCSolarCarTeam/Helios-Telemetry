import axios from "axios";
import React, { useState } from "react";

import { Button, TextField } from "@mui/material";
import { IDriverNameUpdate } from "@shared/helios-types";
import { prodURL } from "@shared/helios-types";

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
  const [errorMessages, setErrorMessages] = useState<
    Partial<IDriverNameUpdate>
  >({});
  const [statusMessage, setStatusMessage] = useState("");

  const validateInputs = () => {
    const newErrors = new Set<keyof IDriverNameUpdate>();
    const newErrorMessages: Partial<IDriverNameUpdate> = {};

    if (
      typeof driverDetails.name !== "string" ||
      driverDetails.name.trim() === "" ||
      /\d/.test(driverDetails.name)
    ) {
      newErrors.add("name");
      newErrorMessages.name =
        "Name must be a non-empty string and should not contain digits.";
    }

    if (
      typeof driverDetails.rfid !== "string" ||
      driverDetails.rfid.trim() === "" ||
      isNaN(Number(driverDetails.rfid))
    ) {
      newErrors.add("rfid");
      newErrorMessages.rfid = "RFID must not be empty and must be a number.";
    }

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);

    return newErrors.size === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessages({});
    setStatusMessage("");
    if (validateInputs()) {
      axios
        .post(`${prodURL}/updatedriverinfo`, {
          name: driverDetails.name,
          rfid: driverDetails.rfid,
        })
        .then((res) => {
          if (res.status === 200) {
            setStatusMessage(res.data.message);
          } else {
            setStatusMessage("Error updating driver info");
          }
        })
        .catch(() => {
          setStatusMessage("Error updating driver info");
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
            helperText={errorMessages[key as keyof IDriverNameUpdate] || ""}
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
        {statusMessage && (
          <div className="text-green-500 mt-2 text-center">{statusMessage}</div>
        )}
      </form>
    </div>
  );
}
