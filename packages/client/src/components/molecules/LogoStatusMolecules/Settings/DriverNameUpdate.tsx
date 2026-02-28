import axios from "axios";
import { useTheme } from "next-themes";
import React, { useState } from "react";

import { helios, heliosCompliment, sand } from "@/styles/colors";
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
  const { resolvedTheme } = useTheme();
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
    <div className="mb-4 grid grid-cols-[40%_60%] items-center justify-between">
      <div className="col-span-1">
        <label className="mr-2">Update Driver Info:</label>
      </div>
      <form className="col-span-1 flex flex-col gap-2" onSubmit={handleSubmit}>
        {Object.keys(driverDetailsText).map((key) => (
          <TextField
            error={errors.has(key as keyof IDriverNameUpdate)}
            helperText={errorMessages[key as keyof IDriverNameUpdate] || ""}
            inputProps={{
              placeholder: driverDetailsText[key as keyof IDriverNameUpdate],
            }}
            key={key}
            name={key}
            onChange={(e) => {
              setDriverDetails((prev) => ({
                ...prev,
                [key]: e.target.value,
              }));
            }}
            sx={{
              "& .MuiOutlinedInput-input::placeholder": {
                color: sand,
                opacity: 1,
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: sand },
                "&.Mui-focused fieldset": { borderColor: helios },
                "&:hover fieldset": { borderColor: helios },
                color: sand,
              },
            }}
            variant="outlined"
          />
        ))}
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  sx={{ color: resolvedTheme === "dark" ? "white" : "black" }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          inputProps={{
            placeholder: "Password",
          }}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            "& .MuiInputBase-input::placeholder": {
              color: sand,
              opacity: 1,
            },
            "& .MuiInputBase-root": {
              "& fieldset": { borderColor: sand },
              "&.Mui-focused fieldset": { borderColor: helios },
              "&:hover fieldset": { borderColor: helios },
              color: sand,
            },
          }}
          type={showPassword ? "text" : "password"}
          value={password}
          variant="outlined"
        />
        <Button
          className="mt-2 w-fit self-center"
          disabled={loading}
          sx={{
            "&:hover": {
              backgroundColor: heliosCompliment,
              borderColor: helios,
              color: "white",
            },
            backgroundColor: resolvedTheme === "dark" ? helios : "white",
            border: "1px solid",
            borderColor: sand,
            color: "black",
            px: 8,
          }}
          type="submit"
          variant="outlined"
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>

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
