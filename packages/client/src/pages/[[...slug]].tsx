import BottomInformationContainer from "@/components/containers/BottomInformationContainer";
import HeroContainer from "@/components/containers/HeroContainer";
import LogoStatusContainer from "@/components/containers/LogoStatusContainer";
import MapContainer from "@/components/containers/MapContainer";
import TabsContainer from "@/components/containers/TabsContainer";
import PlaybackSlider from "@/components/molecules/PlaybackMolecules/PlaybackSlider";
import { useAppState } from "@/contexts/AppStateContext";

export default function Home() {
  const { currentAppState } = useAppState();

  return (
    <div className={currentAppState.darkMode ? "dark" : ""}>
      <div className="h-full w-screen overflow-x-hidden bg-light p-4 text-light dark:bg-dark dark:text-dark lg:h-screen">
        <div className="flex h-full flex-col gap-y-2">
          <div className="flex h-full flex-wrap gap-2">
            <div className="mx-auto w-36">
              <LogoStatusContainer />
            </div>
            <div className="w-full flex-1 flex-row">
              <TabsContainer />
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
            {currentAppState.playbackSwitch ? (
              <PlaybackSlider />
            ) : (
              <BottomInformationContainer />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
