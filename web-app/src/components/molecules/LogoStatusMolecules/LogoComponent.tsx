import React from "react";

function LogoComponent() {
  return (
    <div className="grid w-full pt-2">
      <img className="w-3/4 m-auto" src={require("../../../assets/Logo.png")} />
    </div>
  );
}

export default LogoComponent;
