import Modal from '@mui/material/Modal';
import { useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useAppState } from "@/contexts/AppStateContext";

function SettingsComponent() {
    const { toggleDarkMode } = useAppState();
    

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
      

    const [appearanceMode, setAppearanceMode] = useState<AppearanceMode>(AppearanceMode.Light);
    const [unitMode, setUnitMode] = useState<UnitMode>(UnitMode.Metric);
    const [connectionMode, setConnectionMode] = useState<ConnectionMode>(ConnectionMode.Network);

    const handleAppearanceChange = (
        event: React.MouseEvent<HTMLElement>,
        newAppearance: AppearanceMode,
        ) => {
            console.log(newAppearance);
            
            if (newAppearance!==null && newAppearance!==appearanceMode){
                toggleDarkMode(); 
                setAppearanceMode(newAppearance);
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
        <h2 onClick={handleOpen} className="text-text-gray dark:text-text-gray-dark">⚙</h2>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg p-4 rounded-lg flex flex-col">
            <h5 className="text-text-gray dark:text-text-gray-dark font-bold text-lg mb-4">Settings</h5>
            
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
                        <ToggleButton value="Dark" className="w-1/2">Dark</ToggleButton>
                        <ToggleButton value="Light" className="w-1/2">Light</ToggleButton>
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
                        <ToggleButton value="Metric" className="w-1/2">Metric</ToggleButton>
                        <ToggleButton value="Imperial" className="w-1/2">Imperial</ToggleButton>
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
                        <ToggleButton value="Network" className="w-1/2">Network</ToggleButton>
                        <ToggleButton value="Radio" className="w-1/2">Radio</ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>
        </div>

        </Modal>
      </div>
    );
}
  
export default SettingsComponent;