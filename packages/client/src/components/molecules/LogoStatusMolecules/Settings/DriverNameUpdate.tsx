import { useTheme } from "next-themes";
import React, { useState } from "react";

import { useUpdateDriverInfo } from "@/hooks/useUpdateDriverInfo";
import {
  type ValidationSchema,
  driverName,
  rfid,
  validateData,
} from "@/lib/validation";
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

const driverDetailsText: IDriverNameUpdate = {
  Rfid: "Rfid",
  name: "Name",
} as const;

/**
 * Validation schema for driver information
 */
const driverValidationSchema: ValidationSchema<IDriverNameUpdate> = {
  Rfid: [rfid()],
  name: [driverName()],
};

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

  // Use TanStack Query mutation hook
  // Success and error notifications are handled automatically inside the hook
  const { isPending: isUpdatingDriver, mutate: updateDriver } =
    useUpdateDriverInfo({
      onSuccess: () => {
        // Reset form after successful update
        setDriverDetails({ Rfid: "", name: "" });
        setPassword("");
      },
    });

  const loading = isUpdatingDriver;

  /**
   * Validates driver details using the standardized validation schema
   */
  const validateInputs = () => {
    const result = validateData(driverDetails, driverValidationSchema);

    setErrors(result.errors);
    setErrorMessages(result.errorMessages);

    return result.isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessages({});

    if (!validateInputs()) {
      return;
    }

    // Update driver with password validation
    updateDriver({
      ...driverDetails,
      password,
    });
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
      </form>
    </div>
  );
}
