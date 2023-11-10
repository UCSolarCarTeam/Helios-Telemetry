import React from 'react'
import { Routes } from 'react-router-dom'

import BatteryTab from '../components/tabs/BatteryTab'
import FaultsTab from '../components/tabs/FaultsTab'
import MotorTab from '../components/tabs/MotorTab'
import MpptTab from '../components/tabs/MpptTab'
import PlaybackTab from '../components/tabs/PlaybackTab'
import RaceTab from '../components/tabs/RaceTab'

export interface SolarCarRoutes {
  path: string
  id: String
  element?: React.ReactNode
  Component?: React.ComponentType
  value: String
}

export const routes: SolarCarRoutes[] = [
  { path: '/battery', id: 'Battery', element: <BatteryTab />, value: '1' },
  { path: '/faults', id: 'Faults', element: <FaultsTab />, value: '2' },
  { path: '/motor', id: 'Motor', element: <MotorTab />, value: '3' },
  { path: '/mppt', id: 'MPPT', element: <MpptTab />, value: '4' },
  { path: '/playback', id: 'Playback', element: <PlaybackTab />, value: '5' },
  { path: '/race', id: 'Race', element: <RaceTab />, value: '6' }
]
