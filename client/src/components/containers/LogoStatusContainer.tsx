import LogoComponent from "@/components/molecules/LogoStatusMolecules/LogoComponent";
import StatusComponent from "@/components/molecules/LogoStatusMolecules/StatusComponent";
import SettingsComponent from "../molecules/LogoStatusMolecules/SettingsComponent";

function LogoStatusContainer() {
  return (
    <>
      <LogoComponent />
      <StatusComponent />
      <SettingsComponent/>
    </>
  );
}

export default LogoStatusContainer;
