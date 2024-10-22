import { useRouter } from "next/router";
import { Fragment } from "react";

import NavBar from "@/components/tabs/NavBar";
import { type SolarCarRoutes, routes } from "@/objects/TabRoutes";

function TabsContainer() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className="flex h-full flex-col">
      <NavBar />
      {routes.map((route: SolarCarRoutes) => {
        if (route.path === "/" + slug?.toString()) {
          return (
            <Fragment key={route.id}>
              <>{route.element}</>
            </Fragment>
          );
        }
        return null;
      })}
    </div>
  );
}

export default TabsContainer;
