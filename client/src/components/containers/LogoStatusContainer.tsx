import LogoComponent from "@/components/molecules/LogoStatusMolecules/LogoComponent";
import SettingsComponent from "@/components/molecules/LogoStatusMolecules/SettingsComponent";
import StatusComponent from "@/components/molecules/LogoStatusMolecules/StatusComponent";

function LogoStatusContainer() {
  return (
    <>
      <LogoComponent />
      <StatusComponent />
      <SettingsComponent />
    </>
  );
}

export default LogoStatusContainer;
