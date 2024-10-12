import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { type SolarCarRoutes, routes } from "@/objects/TabRoutes";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

function NavBar(): JSX.Element {
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
    <Tabs
      TabIndicatorProps={{ style: { backgroundColor: "#B94A6C" } }} // indicate what tab you are on
      allowScrollButtonsMobile // shows scroll buttons on mobile
      aria-label="scrollable tabs"
      className="w-full"
      onChange={handleChange}
      scrollButtons // show scroll buttons
      selectionFollowsFocus // allows use of arrow keys
      sx={{
        "& .MuiTabs-flexContainer": {
          alignItems: "center",
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: "space-around",
        },
        display: "flex",
        minHeight: "4vh",
      }}
      value={value}
      variant="scrollable" // make scrollable
    >
      {routes.map((route: SolarCarRoutes, i: number) => (
        <Tab
          disableRipple
          key={i}
          label={<h3 className="text-light dark:text-dark">{route.id}</h3>}
          sx={{ height: "4vh", minHeight: "4vh" }}
          value={route.value}
        ></Tab>
      ))}
    </Tabs>
  );
}

export default NavBar;
