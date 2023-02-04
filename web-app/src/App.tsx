import "./App.css";
import TabsContainer from "./components/containers/TabsContainer";
import BottomInformationContainer from "./components/containers/BottomInformationContainer";
import MapContainer from "./components/containers/MapContainer";
import HeroContainer from "./components/containers/HeroContainer";
import LogoStatusContainer from "./components/containers/LogoStatusContainer";
import ThemeSwitcher from "./components/molecules/ThemeSwitcher";

function App() {
  return (
    <div className="w-screen h-screen p-3 bg-primary dark:bg-primary-dark">
      <div className="grid w-full h-2/6 bg-primary dark:bg-primary-dark grid-cols-6 pt-1">
        <div className="grid col-span-1 bg-primary dark:bg-primary-dark pr-1">
          <LogoStatusContainer />
          <ThemeSwitcher />
        </div>
        <div className="grid col-span-5 bg-primary dark:bg-primary-dark pl-1">
          <TabsContainer />
        </div>
      </div>
      <div className="grid w-full h-3/6 bg-primary dark:bg-primary-dark grid-cols-3 pt-1">
        <div className="grid pr-1">
          <MapContainer />
        </div>
        <div className="grid col-span-2 bg-primary dark:bg-primary-dark pl-1">
          <HeroContainer />
        </div>
      </div>
      <div className="grid w-full h-1/6 bg-primary dark:bg-primary-dark pt-1">
        <BottomInformationContainer />
      </div>
    </div>
  );
}

export default App;
