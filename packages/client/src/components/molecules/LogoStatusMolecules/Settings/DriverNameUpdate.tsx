import axios from "axios";
import React, { useState } from "react";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { IDriverNameUpdate } from "@shared/helios-types";
import { prodURL } from "@shared/helios-types";

const driverDetailsText: IDriverNameUpdate = {
  Rfid: "Rfid",
  name: "Name",
} as const;

export default function DriverUpdate() {
  const [driverDetails, setDriverDetails] = useState<IDriverNameUpdate>({
    Rfid: "",
    name: "",
  });
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState(new Set<keyof IDriverNameUpdate>());
  const [errorMessages, setErrorMessages] = useState<
    Partial<IDriverNameUpdate>
  >({});
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
      typeof driverDetails.Rfid !== "string" ||
      driverDetails.Rfid.trim() === "" ||
      isNaN(Number(driverDetails.Rfid))
    ) {
      newErrors.add("Rfid");
      newErrorMessages.Rfid = "Rfid must not be empty and must be a number.";
    }

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);

    return newErrors.size === 0;
  };

  const checkMQTTPassword = async () => {
    try {
      const res = await axios.post("/api/checkMQTTPassword", { password });
      if (res.status === 200) {
        return true;
      }
      return false;
    } catch (e) {
      setStatusMessage("Error checking password");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessages({});
    setStatusMessage("");
    if (validateInputs()) {
      if (await checkMQTTPassword()) {
        axios
          .post(`${prodURL}/updatedriverinfo`, {
            Rfid: driverDetails.Rfid,
            name: driverDetails.name,
          })
          .then((res) => {
            if (res.status === 200) {
              setStatusMessage(res.data.message);
              setLoading(false);
            } else {
              setStatusMessage("Error updating driver info 1");
              setLoading(false);
            }
          })
          .catch(() => {
            setStatusMessage("Error updating driver info 2");
            setLoading(false);
          });
      } else {
        setStatusMessage("Incorrect password, please try again.");
        setLoading(false);
      }
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
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          value={password}
          variant="filled"
        />
        <Button type="submit">Submit</Button>
        {loading && (
          <div className="flex justify-center">
            <CircularProgress size="2rem" />
          </div>
        )}
        {statusMessage && (
          <div className="text-green-500 mt-2 text-center">{statusMessage}</div>
        )}
      </form>
    </div>
  );
}
