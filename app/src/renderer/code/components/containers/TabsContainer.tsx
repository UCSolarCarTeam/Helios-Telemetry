import React from "react";
import { Route, Routes } from "react-router-dom";

import { SolarCarRoutes, routes } from "../../objects/TabRoutes";
import NavBar from "../tabs/NavBar";

function TabsContainer(props: any) {
  return (
    <div className="">
      <NavBar />
      <Routes>
        {routes.map((route: SolarCarRoutes, i: number) => (
          <Route path={route.path} element={route.element} key={i} />
        ))}
      </Routes>
    </div>
  );
}

export default TabsContainer;
