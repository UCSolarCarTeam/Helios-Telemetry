import { useState } from "react";

import {
  APPUNITS,
  CONNECTIONTYPES,
  useAppState,
} from "@/contexts/AppStateContext";
import Modal from "@mui/material/Modal";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

function SettingsComponent() {
  const { setCurrentAppState, currentAppState } = useAppState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDarkChange = (
    event: React.MouseEvent<HTMLElement>,
    inputMode: (typeof currentAppState)["darkMode"],
  ) => {
    if (inputMode !== null && inputMode !== currentAppState.darkMode) {
      setCurrentAppState({
        ...currentAppState,
        darkMode: inputMode,
      });
    }
  };

  const handleUnitChange = (
    event: React.MouseEvent<HTMLElement>,
    inputMode: (typeof currentAppState)["speedUnits"],
  ) => {
    if (inputMode !== null && inputMode !== currentAppState.speedUnits) {
      setCurrentAppState({
        ...currentAppState,
        speedUnits: inputMode,
      });
    }
  };

  const handleConnectionChange = (
    event: React.MouseEvent<HTMLElement>,
    inputMode: (typeof currentAppState)["connectionTypes"],
  ) => {
    if (inputMode !== null && inputMode !== currentAppState.connectionTypes) {
      setCurrentAppState({
        ...currentAppState,
        connectionTypes: inputMode,
      });
    }
  };

  return (
    <div className="grid">
      <h2
        onClick={handleOpen}
        className="text-text-gray dark:text-text-gray-dark cursor-pointer text-xl font-black"
      >
        ⛭
      </h2>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col rounded-lg bg-white p-4 shadow-lg shadow-lg">
          <h5 className="text-text-gray dark:text-text-gray-dark mb-4 text-2xl">
            Settings
          </h5>

          <div className="mb-4 grid grid-cols-2 items-center justify-between">
            <div className="col-span-1">
              <label className="mr-2">Appearance:</label>
            </div>

            <div className="col-span-1">
              <ToggleButtonGroup
                value={currentAppState.darkMode}
                exclusive
                onChange={handleDarkChange}
                aria-label="Appearance"
                className="w-full"
              >
                <ToggleButton value={false} className="w-1/2">
                  Light
                </ToggleButton>
                <ToggleButton value={true} className="w-1/2">
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
                value={currentAppState.speedUnits}
                exclusive
                onChange={handleUnitChange}
                aria-label="Units"
                className="w-full"
              >
                <ToggleButton value={APPUNITS.METRIC} className="w-1/2">
                  Metric
                </ToggleButton>
                <ToggleButton value={APPUNITS.IMPERIAL} className="w-1/2">
                  Imperial
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>

          <div className="mb-4 grid grid-cols-2 items-center justify-between">
            <div className="col-span-1">
              <label className="mr-2">Connection:</label>
            </div>
            <div className="col-span-1">
              <ToggleButtonGroup
                value={currentAppState.connectionTypes}
                exclusive
                onChange={handleConnectionChange}
                aria-label="Connection"
                className="w-full"
              >
                <ToggleButton value={CONNECTIONTYPES.NETWORK} className="w-1/2">
                  Network
                </ToggleButton>
                <ToggleButton value={CONNECTIONTYPES.RADIO} className="w-1/2">
                  Radio
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SettingsComponent;
