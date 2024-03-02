import { useRouter } from "next/router";
import { Fragment } from "react";

import NavBar from "@/components/tabs/NavBar";
import { type SolarCarRoutes, routes } from "@/objects/TabRoutes";

function TabsContainer(props: any) {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className="">
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
