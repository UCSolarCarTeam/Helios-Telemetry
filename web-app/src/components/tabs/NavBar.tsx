import React, { useEffect } from "react"
import { Routes, RouteObject, Link, useLocation, useNavigate } from "react-router-dom"

import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"

import { routes, SolarCarRoutes } from "../../objects/TabRoutes"
import path from "path"
 

function NavBar(props:any) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const getCurrentPath = () => {
    routes.map((route:SolarCarRoutes, i:number) => {
      if (route.path === location.pathname){
        return route.value;
      }
    })
    return "1"
  }

  const redirect = () => {
    routes.map((route:SolarCarRoutes) => {
      if (route.value === value){
        navigate(route.path.toString());
      }
    })
  }
  
  const [value, setValue] = React.useState<String>(getCurrentPath());
  
  useEffect(() => {
    redirect();
  }, [value])

  const handleChange = (event: React.SyntheticEvent, newValue: String) => {
    setValue(newValue);
  };  

  return (
    <>
    <Tabs 
    value={value}
    variant="fullWidth"
    onChange={handleChange}
    >
      {routes.map((route:SolarCarRoutes, i:number) => (
        <Tab 
        key={i}
        value={route.value}
        label={<span 
        style={{color: "3A3A3A"}}
        >
            {route.id}
          </span>}></Tab>
      ))}
    </Tabs>
    </>
  );

}

export default NavBar
