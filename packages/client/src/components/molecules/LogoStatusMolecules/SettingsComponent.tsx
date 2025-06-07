import { useTheme } from "next-themes";
import { useCallback, useState } from "react";

import {
  APPUNITS,
  CONNECTIONTYPES,
  useAppState,
} from "@/contexts/AppStateContext";
import { TimeInput } from "@mantine/dates";
import SettingsIcon from "@mui/icons-material/Settings";
import Modal from "@mui/material/Modal";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import DriverNameUpdate from "./Settings/DriverNameUpdate";

function SettingsComponent() {
  const { resolvedTheme, setTheme, theme } = useTheme();

  const { currentAppState, setCurrentAppState } = useAppState();
  const [open, setOpen] = useState(false);

  const handleDarkChange = useCallback(
    (event: React.MouseEvent<HTMLElement>, newTheme: string | null) => {
      if (newTheme) {
        setTheme(newTheme);
      }
    },
    [setTheme],
  );

  const handleUnitChange = useCallback(
    (
      event: React.MouseEvent<HTMLElement>,
      inputMode: (typeof currentAppState)["appUnits"],
    ) => {
      if (inputMode !== null) {
        setCurrentAppState((prev) => ({ ...prev, appUnits: inputMode }));
      }
    },
    [setCurrentAppState],
  );

  const handleConnectionChange = useCallback(
    (event: React.MouseEvent<HTMLElement>, inputMode: CONNECTIONTYPES) => {
      if (inputMode !== null) {
        setCurrentAppState((prev) => ({ ...prev, connectionType: inputMode }));
      }
    },
    [setCurrentAppState],
  );
  const [showModal, setShowModal] = useState(false);

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const onDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);

    // youll have to see if there are any available data for the date, if not
    // show the modal that there is no data for this date
  };

  return (
    <div className="grid">
      <h2 className="text-text-gray dark:text-text-gray-dark w-fit cursor-pointer text-sm font-black">
        <SettingsIcon onClick={() => setOpen(true)} />
      </h2>
      <Modal
        aria-describedby="modal-modal-description"
        aria-labelledby="modal-modal-title"
        className="flex flex-grow items-center justify-center"
        onClose={() => setOpen(false)}
        open={open}
      >
        <div className="w-full rounded-lg border-none bg-white p-4 shadow-lg outline-none dark:bg-dark dark:text-sand sm:max-w-[75%]">
          <h5 className="text-text-gray dark:text-text-gray-dark mb-5 text-center text-3xl font-semibold">
            Settings
          </h5>
          <div
            className="mb-4 grid items-center justify-between"
            style={{ gridTemplateColumns: "40% 60%" }}
          >
            <div className="col-span-1">
              <label className="mr-2">Appearance:</label>
            </div>

            <div className="col-span-1">
              <ToggleButtonGroup
                aria-label="Appearance"
                className="w-full"
                exclusive
                onChange={handleDarkChange}
                sx={{
                  "& .MuiToggleButton-root": {
                    color: resolvedTheme === "dark" ? "#BFBFBF" : "#000",
                  },
                  "& .MuiToggleButton-root.Mui-selected": {
                    "&:hover": {
                      backgroundColor:
                        resolvedTheme === "dark" ? "#a13b5a" : null,
                    },
                    backgroundColor:
                      resolvedTheme === "dark" ? "#B94A6C" : null,
                  },
                }}
                value={theme}
              >
                <ToggleButton className="w-1/3" value="light">
                  Light
                </ToggleButton>
                <ToggleButton className="w-1/3" value="dark">
                  Dark
                </ToggleButton>
                <ToggleButton className="w-1/3" value="system">
                  System
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
          <div
            className="grid-cols-[40% 60%] mb-4 grid items-center justify-between"
            style={{ gridTemplateColumns: "40% 60%" }}
          >
            <div className="col-span-1">
              <label className="mr-2">Units:</label>
            </div>
            <div className="col-span-1">
              <ToggleButtonGroup
                aria-label="Units"
                className="w-full"
                exclusive
                onChange={handleUnitChange}
                sx={{
                  "& .MuiToggleButton-root": {
                    color: resolvedTheme === "dark" ? "#BFBFBF" : "#000",
                  },
                  "& .MuiToggleButton-root.Mui-selected": {
                    "&:hover": {
                      backgroundColor:
                        resolvedTheme === "dark" ? "#a13b5a" : null,
                    },
                    backgroundColor:
                      resolvedTheme === "dark" ? "#B94A6C" : null,
                  },
                }}
                value={currentAppState.appUnits}
              >
                <ToggleButton className="w-1/2" value={APPUNITS.METRIC}>
                  Metric
                </ToggleButton>
                <ToggleButton className="w-1/2" value={APPUNITS.IMPERIAL}>
                  Imperial
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
          <div
            className="grid-cols-[40% 60%] items-top mb-2 grid justify-between"
            style={{ gridTemplateColumns: "40% 60%" }}
          >
            <div className="col-span-1">
              <label className="mr-2">Connection:</label>
            </div>

            <div className="col-span-1">
              <ToggleButtonGroup
                aria-label="Connection"
                className="w-full"
                exclusive
                onChange={handleConnectionChange}
                sx={{
                  "& .MuiToggleButton-root": {
                    color: resolvedTheme === "dark" ? "#BFBFBF" : "#000",
                  },
                  "& .MuiToggleButton-root.Mui-selected": {
                    "&:hover": {
                      backgroundColor:
                        resolvedTheme === "dark" ? "#a13b5a" : null,
                    },
                    backgroundColor:
                      resolvedTheme === "dark" ? "#B94A6C" : null,
                  },
                }}
                value={currentAppState.connectionType}
              >
                {(Object.keys(CONNECTIONTYPES) as Array<CONNECTIONTYPES>).map(
                  (key) => {
                    const disabled =
                      (key === CONNECTIONTYPES.NETWORK &&
                        !currentAppState.socketConnected) ||
                      (key === CONNECTIONTYPES.RADIO &&
                        !currentAppState.radioConnected);

                    return (
                      <ToggleButton
                        className="flex w-1/3 text-sm"
                        disabled={disabled}
                        key={key}
                        value={key}
                      >
                        {key}
                      </ToggleButton>
                    );
                  },
                )}
              </ToggleButtonGroup>

              <div className="flex">
                {(Object.keys(CONNECTIONTYPES) as Array<CONNECTIONTYPES>).map(
                  (key) => {
                    const disabledText =
                      (key === CONNECTIONTYPES.NETWORK &&
                        !currentAppState.socketConnected &&
                        "Can not connect to AWS") ||
                      (key === CONNECTIONTYPES.RADIO &&
                        !currentAppState.radioConnected &&
                        "Can not connect to USB Radio Board");

                    return (
                      <div
                        className="w-1/3 items-center justify-center"
                        key={key}
                      >
                        <div className="my-1 flex flex-col items-center">
                          {disabledText ? (
                            <>
                              <span className="text-center text-sm text-helios">
                                Not Available
                              </span>
                              <span className="text-center text-xs">
                                ({disabledText})
                              </span>
                            </>
                          ) : (
                            <span className="text-sm text-green">
                              Available
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          </div>
          <DriverNameUpdate />
        </div>
      </Modal>
    </div>
  );
}

export default SettingsComponent;
