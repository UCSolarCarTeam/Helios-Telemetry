import { BrowserRouter } from "react-router-dom";

import "./App.css";
import BottomInformationContainer from "./components/containers/BottomInformationContainer";
import HeroContainer from "./components/containers/HeroContainer";
import LogoStatusContainer from "./components/containers/LogoStatusContainer";
import MapContainer from "./components/containers/MapContainer";
import TabsContainer from "./components/containers/TabsContainer";
import { useAppState } from "./contexts/AppStateContext";

function App() {
  const { currentAppState } = useAppState();
  // 38, 55, 7
  return (
    <div className={currentAppState.darkMode ? "dark" : ""}>
      <div className="size-screen overflow-x-hidden bg-light p-4 text-light dark:bg-dark dark:text-dark">
        <div className="flex h-full flex-col gap-y-2 ">
          <div className="flex flex-wrap gap-2">
            <div className="mx-auto w-36">
              <LogoStatusContainer />
            </div>
            <div className="flex-1 grow">
              <BrowserRouter>
                <TabsContainer />
              </BrowserRouter>
            </div>
          </div>
          <div className="flex flex-row flex-wrap gap-2">
            <div className="size-96 grow">
              <MapContainer />
            </div>
            <div className="grow basis-2/3">
              <HeroContainer />
            </div>
          </div>
          <div className="grid">
            <BottomInformationContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
