import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import { routes, SolarCarRoutes } from "../../objects/TabRoutes";
import { styled } from "@mui/material";

function NavBar(props: any) {
  const location = useLocation();
  const navigate = useNavigate();

  const getCurrentPath = () => {
    let currIndex: String = "1";
    routes.map((route: SolarCarRoutes, i: number) => {
      if (route.path === location.pathname) {
        currIndex = route.value;
      }
    });
    return currIndex;
  };

  const redirect = () => {
    routes.map((route: SolarCarRoutes) => {
      if (route.value === value) {
        navigate(route.path.toString());
      }
    });
  };

  const [value, setValue] = React.useState<String>(getCurrentPath());
  useEffect(() => {
    redirect();
  }, [value]);

  useEffect(() => {
    getCurrentPath();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: String) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
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
            label={<h3 className="dark:text-dark text-light">{route.id}</h3>}
          ></Tab>
        ))}
      </Tabs>
    </>
  );
}

export default NavBar;
