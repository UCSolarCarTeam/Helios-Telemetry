import { useState } from "react";

import {
  APPUNITS,
  CONNECTIONTYPES,
  useAppState,
} from "@/contexts/AppStateContext";
import SettingsIcon from "@mui/icons-material/Settings";
import Modal from "@mui/material/Modal";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

function SettingsComponent() {
  const { currentAppState, setCurrentAppState } = useAppState();
  const [open, setOpen] = useState(false);
  const handleDarkChange = (
    event: React.MouseEvent<HTMLElement>,
    inputMode: (typeof currentAppState)["darkMode"],
  ) => {
    if (inputMode !== null) {
      setCurrentAppState((prev) => ({
        ...prev,
        darkMode: inputMode,
      }));
    }
  };

  const handleUnitChange = (
    event: React.MouseEvent<HTMLElement>,
    inputMode: (typeof currentAppState)["appUnits"],
  ) => {
    if (inputMode !== null) {
      setCurrentAppState((prev) => ({
        ...prev,
        appUnits: inputMode,
      }));
    }
  };

  const handleConnectionChange = (
    event: React.MouseEvent<HTMLElement>,
    inputMode: CONNECTIONTYPES,
  ) => {
    if (inputMode !== null) {
      setCurrentAppState((prev) => ({
        ...prev,
        connectionType: inputMode,
      }));
    }
  };
  return (
    <div className="grid">
      <h2
        className="text-text-gray dark:text-text-gray-dark cursor-pointer text-sm font-black"
        onClick={() => setOpen(true)}
      >
        <SettingsIcon />
      </h2>
      <Modal
        aria-describedby="modal-modal-description"
        aria-labelledby="modal-modal-title"
        onClose={() => setOpen(false)}
        open={open}
      >
        <div className="fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-white p-4 shadow-lg">
          <h5 className="text-text-gray dark:text-text-gray-dark mb-4 text-2xl">
            Settings
          </h5>

          <div className="mb-4 grid grid-cols-2 items-center justify-between">
            <div className="col-span-1">
              <label className="mr-2">Appearance:</label>
            </div>

            <div className="col-span-1">
              <ToggleButtonGroup
                aria-label="Appearance"
                className="w-full"
                exclusive
                onChange={handleDarkChange}
                value={currentAppState.darkMode}
              >
                <ToggleButton className="w-1/2" value={false}>
                  Light
                </ToggleButton>
                <ToggleButton className="w-1/2" value={true}>
                  Dark
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>

          <div className="mb-4 grid grid-cols-2 items-center justify-between">
            <div className="col-span-1">
              <label className="mr-2">Units:</label>
            </div>
            <div className="col-span-1">
              <ToggleButtonGroup
                aria-label="Units"
                className="w-full"
                exclusive
                onChange={handleUnitChange}
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

          <div className="mb-4 grid grid-cols-2 items-center justify-between">
            <div className="col-span-1">
              <label className="mr-2">Connection:</label>
            </div>
            <div>
              <div className="col-span-1">
                <ToggleButtonGroup
                  aria-label="Connection"
                  className="w-full"
                  exclusive
                  onChange={handleConnectionChange}
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
                          className="flex w-1/3 flex-col text-sm"
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
              </div>
              <div className="justify-top col-span-1 flex items-start">
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
                        {disabledText ? (
                          <div className="flex flex-col items-center">
                            <span className="text-helios">Not Available</span>
                            <span className="text-xs">({disabledText})</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <span className="text-green">Available</span>
                          </div>
                        )}
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SettingsComponent;
