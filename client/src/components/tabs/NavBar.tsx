import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ScrollContainer from "react-indiana-drag-scroll";

import { type SolarCarRoutes, routes } from "@/objects/TabRoutes";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

function NavBar(props: any): JSX.Element {
  const router = useRouter();

  const getCurrentPath = () => {
    let currIndex = "1";
    routes.map((route: SolarCarRoutes, i: number) => {
      if (route.path === router.pathname) {
        currIndex = route.value.toString();
      }
    });
    return currIndex;
  };

  const redirect = () => {
    routes.map((route: SolarCarRoutes) => {
      if (route.value === value) {
        void router.push(route.path.toString());
      }
    });
  };

  const [value, setValue] = React.useState<string>(getCurrentPath());
  useEffect(() => {
    redirect();
  }, [value]);

  useEffect(() => {
    getCurrentPath();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <ScrollContainer className="w-full">
      <Tabs
        className="w-full"
        value={value}
        variant="fullWidth"
        onChange={handleChange}
        TabIndicatorProps={{ style: { backgroundColor: "#B94A6C" } }}
        sx={{ minHeight: "4vh" }}
      >
        {routes.map((route: SolarCarRoutes, i: number) => (
          <Tab
            sx={{ minHeight: "4vh", height: "4vh" }}
            disableRipple
            key={i}
            value={route.value}
            label={<h3 className="text-light dark:text-dark">{route.id}</h3>}
          ></Tab>
        ))}
      </Tabs>
    </ScrollContainer>
  );
}

export default NavBar;
