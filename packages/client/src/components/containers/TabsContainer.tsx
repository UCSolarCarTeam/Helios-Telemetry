import { useRouter } from "next/router";
import { Fragment } from "react";

import NavBar from "@/components/tabs/NavBar";
import FullscreenWrapper from "@/contexts/FullscreenWrapper";
import { type SolarCarRoutes, routes } from "@/objects/TabRoutes";

function TabsContainer() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className="flex h-full flex-col">
      <NavBar />
      {routes.map((route: SolarCarRoutes) => {
        if (route.path === "/" + slug?.toString()) {
          const isRaceOrAnalysisTab =
            route.path === "/race" || route.path === "/analysis";

          return (
            <Fragment key={route.id}>
              {isRaceOrAnalysisTab ? (
                route.element
              ) : (
                <FullscreenWrapper>{route.element}</FullscreenWrapper>
              )}
            </Fragment>
          );
        }
        return null;
      })}
    </div>
  );
}

export default TabsContainer;
