import React, {useState} from "react";
import BatteryThrottleComponent from "../molecules/HeroMolecules/BatteryThrottleComponent";
import CarGraphicComponent from "../molecules/HeroMolecules/CarGraphicComponent";
import FaultsComponent from "../molecules/HeroMolecules/FaultsComponent";
import GearParkBrakeComponent from "../molecules/HeroMolecules/GearParkBrakeComponent";

function HeroContainer(props: any) {

    const [variable, setVariable] = useState();

    return (
      <h1>Hero Container</h1>
    );
  }

  export default HeroContainer;
