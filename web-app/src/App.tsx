import React from "react";
import "./App.css";
import TabsContainer from "./components/containers/TabsContainer";
import BottomInformationContainer from "./components/containers/BottomInformationContainer";
import MapContainer from "./components/containers/MapContainer";
import HeroContainer from "./components/containers/HeroContainer";
import LogoStatusContainer from "./components/containers/LogoStatusContainer";
import CarGraphicComponent from "./components/molecules/HeroMolecules/CarGraphicComponent";

function App() {
  let darkMode = false;
  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-background-gray dark:bg-background-gray-dark w-screen h-screen p-5">
        <div className="grid w-full h-2/6 grid-cols-6">
          <div className="grid col-span-1 pr-1">
            <LogoStatusContainer />
          </div>
          <div className="grid col-span-5 pl-1">
            <TabsContainer />
          </div>
        </div>
        <div className="grid w-full h-3/6 grid-cols-3 pt-1">
          <div className="grid pr-1">
            <MapContainer />
          </div>
          <div className="grid col-span-2 pl-1">
            <HeroContainer />
          </div>
        </div>
        <div className="grid w-full h-1/6 pt-1">
          <BottomInformationContainer />
        </div>
      </div>
    </div>
  );
}

export default App;
