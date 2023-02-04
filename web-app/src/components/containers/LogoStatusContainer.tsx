import React from "react";
import LogoComponent from "../molecules/LogoStatusMolecules/LogoComponent"
import StatusComponent from "../molecules/LogoStatusMolecules/StatusComponent"

function LogoStatusContainer() {
    return (
      <div className="grid w-full">
        <LogoComponent/>
        <StatusComponent/>
      </div>
    );
  }

  export default LogoStatusContainer;
