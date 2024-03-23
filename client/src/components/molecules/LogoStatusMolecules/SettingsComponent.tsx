import Modal from '@mui/material/Modal';
import { useState, useEffect } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useAppState } from "@/contexts/AppStateContext";

function SettingsComponent() {
    enum AppearanceMode {
        Light = 'Light',
        Dark = 'Dark'
      }
      
    enum UnitMode {
        Metric = 'Metric',
        Imperial = 'Imperial'
    }
    
    enum ConnectionMode {
        Network = 'Network',
        Radio = 'Radio'
    }
    const { toggleDarkMode, currentAppState } = useAppState();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [appearanceMode, setAppearanceMode] = useState<AppearanceMode | null>(null);
    const [unitMode, setUnitMode] = useState<UnitMode| null>(null);
    const [connectionMode, setConnectionMode] = useState<ConnectionMode| null>(null);

    const saveSettingsToLocalStorage = () => {
        if (appearanceMode!==null){
            localStorage.setItem('settings', JSON.stringify({
                appearanceMode,
                unitMode,
                connectionMode
            }));
        }
    };

    const fetchSettingsFromLocalStorage = () => {
        const savedSettings = localStorage.getItem('settings');
        if (savedSettings) {
            const { appearanceMode: savedAppearanceMode, unitMode: savedUnitMode, connectionMode: savedConnectionMode } = JSON.parse(savedSettings);
            setAppearanceMode(savedAppearanceMode);
            setUnitMode(savedUnitMode);
            setConnectionMode(savedConnectionMode);

            checkDarkState(savedAppearanceMode); 
            //add more checks for connection and unit mode 
        } else {
            setAppearanceMode(AppearanceMode.Light);
            setUnitMode(UnitMode.Metric);
            setConnectionMode(ConnectionMode.Network);
        }
    };
    
    useEffect(() => {
        fetchSettingsFromLocalStorage();
    }, []);

    useEffect(() => {
        saveSettingsToLocalStorage();
    }, [appearanceMode, unitMode, connectionMode]);


    const checkDarkState = (mode: AppearanceMode) => { //add more functions for connection and unit mode 
        if (mode===AppearanceMode.Dark && !currentAppState.darkMode
            || mode===AppearanceMode.Light && currentAppState.darkMode){
            toggleDarkMode(); 
        }
    }
    const handleAppearanceChange = (
        event: React.MouseEvent<HTMLElement>,
        newAppearance: AppearanceMode,
        ) => {
            if (newAppearance!==null && newAppearance!==appearanceMode){
                setAppearanceMode(newAppearance);
                checkDarkState(newAppearance);  
            } 
    };

    const handleUnitChange = (
        event: React.MouseEvent<HTMLElement>,
        newUnit: UnitMode,
        ) => {
            if (newUnit!==null && newUnit!=unitMode){
                setUnitMode(newUnit);
            }  
    };

    const handleConnectionChange = (
        event: React.MouseEvent<HTMLElement>,
        newConnection: ConnectionMode,
        ) => {
            if (newConnection!==null && newConnection!=connectionMode){
                setConnectionMode(newConnection);
            }  
    };

      
    return (
      <div className="grid">
        <h2 onClick={handleOpen} className="text-text-gray dark:text-text-gray-dark font-black text-xl cursor-pointer">⛭</h2>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg p-4 rounded-lg flex flex-col shadow-lg">
            <h5 className="text-text-gray dark:text-text-gray-dark text-2xl mb-4">Settings</h5>
            
            <div className="mb-4 grid grid-cols-2 justify-between items-center">
                <div className="col-span-1">
                    <label className="mr-2">Appearance:</label>
                </div>

                <div className="col-span-1">
                    <ToggleButtonGroup
                        value={appearanceMode}
                        exclusive
                        onChange={handleAppearanceChange}
                        aria-label="Appearance"
                        className="w-full"

                    >
                        <ToggleButton value={AppearanceMode.Light} className="w-1/2">{AppearanceMode.Light}</ToggleButton>
                        <ToggleButton value={AppearanceMode.Dark} className="w-1/2">{AppearanceMode.Dark}</ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>

            <div className="mb-4 grid grid-cols-2 justify-between items-center">
                <div className="col-span-1">
                    <label className="mr-2">Units:</label>
                </div>
                <div className="col-span-1">
                    <ToggleButtonGroup
                        value={unitMode}
                        exclusive
                        onChange={handleUnitChange}
                        aria-label="Units"
                        className="w-full"
                    >
                        <ToggleButton value={UnitMode.Metric} className="w-1/2">{UnitMode.Metric}</ToggleButton>
                        <ToggleButton value={UnitMode.Imperial} className="w-1/2">{UnitMode.Imperial} </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>

            <div className="mb-4 grid grid-cols-2 justify-between items-center">
                <div className="col-span-1">
                    <label className="mr-2">Connection:</label>
                </div>
                    <div className="col-span-1">
                    <ToggleButtonGroup
                        value={connectionMode}
                        exclusive
                        onChange={handleConnectionChange}
                        aria-label="Connection"
                        className="w-full"
                    >
                        <ToggleButton value={ConnectionMode.Network} className="w-1/2">{ConnectionMode.Network}</ToggleButton>
                        <ToggleButton value={ConnectionMode.Radio} className="w-1/2">{ConnectionMode.Radio} </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>
        </div>

        </Modal>
      </div>
    );
}
  
export default SettingsComponent;