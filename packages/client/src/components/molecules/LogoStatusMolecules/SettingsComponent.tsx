import { useCallback, useState } from "react";

import {
  APPUNITS,
  CONNECTIONTYPES,
  useAppState,
} from "@/contexts/AppStateContext";
import SettingsIcon from "@mui/icons-material/Settings";
import Modal from "@mui/material/Modal";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import DriverNameUpdate from "./Settings/DriverNameUpdate";

function SettingsComponent() {
  const { currentAppState, setCurrentAppState } = useAppState();
  const [open, setOpen] = useState(false);
  const handleDarkChange = useCallback(
    (
      event: React.MouseEvent<HTMLElement>,
      inputMode: (typeof currentAppState)["darkMode"],
    ) => {
      if (inputMode !== null) {
        setCurrentAppState((prev) => ({
          ...prev,
          darkMode: inputMode,
        }));
      }
    },
    [setCurrentAppState],
  );

  const handleUnitChange = useCallback(
    (
      event: React.MouseEvent<HTMLElement>,
      inputMode: (typeof currentAppState)["appUnits"],
    ) => {
      if (inputMode !== null) {
        setCurrentAppState((prev) => ({
          ...prev,
          appUnits: inputMode,
        }));
      }
    },
    [setCurrentAppState],
  );

  const handleConnectionChange = useCallback(
    (event: React.MouseEvent<HTMLElement>, inputMode: CONNECTIONTYPES) => {
      if (inputMode !== null) {
        setCurrentAppState((prev) => ({
          ...prev,
          connectionType: inputMode,
        }));
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
      {currentAppState.playbackSwitch && (
        <>
          <div className="flex flex-col gap-2 py-1">
            <input
              className="max-w-32 rounded-md bg-[#BCBCBC] p-1 text-pink shadow-sm transition-all focus:outline-none"
              id="playbackDate"
              onChange={onDateChange}
              type="date"
              value={date}
            />
          </div>
          <Modal
            aria-describedby="modal-modal-description"
            aria-labelledby="modal-modal-title"
            className="flex flex-grow items-center justify-center"
            onClose={() => setShowModal(false)}
            open={showModal}
          >
            <div className="w-full rounded-lg border-none bg-white p-4 shadow-lg outline-none sm:max-w-[75%]">
              <h5 className="text-text-gray dark:text-text-gray-dark mb-5 text-center text-3xl font-semibold">
                There is no data for this date
              </h5>{" "}
            </div>
          </Modal>
        </>
      )}

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
        <div className="w-full rounded-lg border-none bg-white p-4 shadow-lg outline-none sm:max-w-[75%]">
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
