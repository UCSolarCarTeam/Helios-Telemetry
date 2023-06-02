import React from "react";
import "./App.css";
import TabsContainer from "./components/containers/TabsContainer";
import BottomInformationContainer from "./components/containers/BottomInformationContainer";
import MapContainer from "./components/containers/MapContainer";
import HeroContainer from "./components/containers/HeroContainer";
import LogoStatusContainer from "./components/containers/LogoStatusContainer";
import { useAppState } from "./contexts/AppStateContext";
import { BrowserRouter } from "react-router-dom";

function App() {
  const { currentAppState } = useAppState();
  return (
    <div className={currentAppState.darkMode ? "dark" : ""}>
      <div className="dark:bg-dark bg-light dark:text-dark text-light w-screen h-screen">
        <div className="p-4 h-screen flex flex-col">
          <div className="flex flex-wrap h-[38%] overflow-hidden">
            <div className="w-36 flex-none mx-auto">
              <LogoStatusContainer />
            </div>
            <div className="grid flex-1 h-96">
              <BrowserRouter>
                <TabsContainer />
              </BrowserRouter>
            </div>
          </div>
          <div className="flex flex-wrap h-[55%]">
            <div className="grid basis-1/3 flex-1">
              <MapContainer />
            </div>
            <div className="basis-2/3 flex-1">
              <HeroContainer />
            </div>
          </div>
          <div className="h-[7%]">
            <BottomInformationContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
