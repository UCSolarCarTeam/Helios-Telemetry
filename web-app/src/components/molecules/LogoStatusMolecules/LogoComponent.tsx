import React from "react";
import { useAppState } from "../../../contexts/AppStateContext";

function LogoComponent() {
  const { toggleDarkMode } = useAppState();
  return (
    <div
      className="logo-component grid w-full pt-2"
      onClick={() => toggleDarkMode()}
    >
      <img className="w-3/4 m-auto" src={require("../../../assets/Logo.png")} />
    </div>
  );
}

export default LogoComponent;
