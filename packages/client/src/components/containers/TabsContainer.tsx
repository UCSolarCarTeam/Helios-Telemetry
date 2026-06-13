import { useRouter } from "next/router";
import { Fragment } from "react";

import NavBar from "@/components/tabs/NavBar";
import FullscreenWrapper from "@/contexts/FullscreenWrapper";
import { type SolarCarRoutes, routes } from "@/objects/TabRoutes";

function TabsContainer() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <NavBar />
      <div className="min-h-0 flex-1 overflow-y-auto">
        {routes.map((route: SolarCarRoutes) => {
          if (route.path === "/" + slug?.toString()) {
            const isRaceOrAnalysisTab =
              route.path === "/race" || route.path === "/analysis";

            return (
              <Fragment key={route.id}>
                {isRaceOrAnalysisTab ? (
                  route.element
                ) : (
                  <FullscreenWrapper componentName={`${route.id} Tab`}>
                    {route.element}
                  </FullscreenWrapper>
                )}
              </Fragment>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default TabsContainer;
