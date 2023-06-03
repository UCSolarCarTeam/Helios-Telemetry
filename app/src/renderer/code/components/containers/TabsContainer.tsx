import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { routes, SolarCarRoutes } from '../../objects/TabRoutes'
import NavBar from '../tabs/NavBar'

function TabsContainer(props: any) {
  return (
    <>
      <NavBar />
      <Routes>
        {routes.map((route: SolarCarRoutes, i: number) => (
          <Route path={route.path} element={route.element} key={i} />
        ))}
      </Routes>
    </>
  )
}

export default TabsContainer
