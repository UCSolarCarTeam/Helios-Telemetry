import { Inter } from "next/font/google";

import BottomInformationContainer from "@/components/containers/BottomInformationContainer";
import HeroContainer from "@/components/containers/HeroContainer";
import LogoStatusContainer from "@/components/containers/LogoStatusContainer";
import MapContainer from "@/components/containers/MapContainer";
import TabsContainer from "@/components/containers/TabsContainer";
import { useAppState } from "@/contexts/AppStateContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { currentAppState } = useAppState();
  // 38, 55, 7

  return (
    <div className={currentAppState.darkMode ? "dark" : ""}>
      <div className="bg-light text-light dark:bg-dark dark:text-dark h-screen w-screen overflow-x-hidden p-4">
        <div className="flex h-full flex-col gap-y-2 ">
          <div className="flex flex-wrap gap-2">
            <div className="mx-auto w-36">
              <LogoStatusContainer />
            </div>
            <div className="flex-1 grow">
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
            <BottomInformationContainer />
          </div>
        </div>
      </div>
    </div>
  );
}
