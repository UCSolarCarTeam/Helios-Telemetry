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
      <div className="dark:bg-dark bg-light dark:text-dark text-light">
        <div className="bg-background-gray dark:bg-background-gray-dark w-screen h-screen p-4">
          <div className="flex w-full max-h-[38%]">
            <div className="grid w-[10%] pr-1">
              <LogoStatusContainer />
            </div>
            <div className="grid w-[90%] pl-1">
              <BrowserRouter>
                <TabsContainer />
              </BrowserRouter>
            </div>
          </div>
          <div className="grid w-full h-[55%] grid-cols-3 pt-1 ">
            <div className="grid pr-1">
              <MapContainer />
            </div>
            <div className="grid col-span-2 pl-1">
              <HeroContainer />
            </div>
          </div>
          <div className="grid w-full h-[7%] pt-1 border-t border-light dark:border-dark">
            <BottomInformationContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;