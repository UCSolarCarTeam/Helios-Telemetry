import React from "react";
import { useAppState } from "../../../contexts/AppStateContext";

function LogoComponent() {
  const { toggleDarkMode } = useAppState();
  return (
    <div className="w-full pt-2" onClick={() => toggleDarkMode()}>
      <img className="w-3/4 m-auto" src="/assets/Logo.png" />
    </div>
  );
}

export default LogoComponent;
