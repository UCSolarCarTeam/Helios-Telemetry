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
      className="w-full"
      value={value}
      onChange={handleChange}
      variant="scrollable" // make scrollable
      scrollButtons // show scroll buttons
      selectionFollowsFocus // allows use of arrow keys
      allowScrollButtonsMobile // shows scroll buttons on mobile
      aria-label="scrollable tabs"
      TabIndicatorProps={{ style: { backgroundColor: "#B94A6C" } }} // indicate what tab you are on
      sx={{
        minHeight: "4vh",
        display: "flex",
        "& .MuiTabs-flexContainer": {
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "nowrap",
        },
      }}
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
  );
}

export default NavBar;
