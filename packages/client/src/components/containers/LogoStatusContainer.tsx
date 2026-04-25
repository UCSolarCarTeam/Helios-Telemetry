import LogoComponent from "@/components/molecules/LogoStatusMolecules/LogoComponent";
import SettingsComponent from "@/components/molecules/LogoStatusMolecules/SettingsComponent";
import StatusComponent from "@/components/molecules/LogoStatusMolecules/StatusComponent";
import { useAppState } from "@/stores/useAppState";

import PlaybackDatePicker from "../molecules/LogoStatusMolecules/PlaybackDatePicker";

function LogoStatusContainer() {
  const { currentAppState } = useAppState();
  return (
    <>
      <LogoComponent />
      <StatusComponent />
      <div className="flex flex-row gap-2">
        <SettingsComponent />
        {currentAppState.playbackSwitch && <PlaybackDatePicker />}
      </div>
    </>
  );
}

export default LogoStatusContainer;
