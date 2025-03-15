import LogoComponent from "@/components/molecules/LogoStatusMolecules/LogoComponent";
import SettingsComponent from "@/components/molecules/LogoStatusMolecules/SettingsComponent";
import StatusComponent from "@/components/molecules/LogoStatusMolecules/StatusComponent";

import PlaybackDatePicker from "../molecules/LogoStatusMolecules/PlaybackDatePicker";

function LogoStatusContainer() {
  return (
    <>
      <LogoComponent />
      <StatusComponent />
      <div className="flex flex-row gap-2">
        <SettingsComponent />
        <PlaybackDatePicker />
      </div>
    </>
  );
}

export default LogoStatusContainer;
