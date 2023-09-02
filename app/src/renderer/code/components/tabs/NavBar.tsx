import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import Tab from '@mui/material/Tab'
import TabList from '@mui/material/Tabs'

import { routes, SolarCarRoutes } from '../../objects/TabRoutes'
import ScrollContainer from 'react-indiana-drag-scroll'

function NavBar(props: any): JSX.Element {
  const location = useLocation()

  return (
    <ScrollContainer className="flex h-full w-full">
      {routes.map((route: SolarCarRoutes, i: number) => (
        <Link to={route.path} key={i} className="w-full min-w-24 justify-center">
          <div
            className={`flex w-36 mb-2 border-helios justify-center transition-all ease-in-out delay-50 ${
              location.pathname === route.path ? 'border-b-2' : ''
            }`}
          >
            <h3 className="dark:text-dark text-light">{route.id}</h3>
          </div>
        </Link>
      ))}
    </ScrollContainer>
  )
}

export default NavBar
