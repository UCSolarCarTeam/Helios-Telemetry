import { createContext, useContext, useState, ReactNode } from 'react'
import ITelemetryData from '../objects/telemetry-data.interface'

interface Props {
  children: ReactNode | ReactNode[]
}

const packetContext = createContext({})

export function PacketContextProvider({ children }: Props) {
  const [currentPacket, setCurrentPacket] = useState<ITelemetryData>()

  return (
    <packetContext.Provider value={{ currentPacket, setCurrentPacket }}>
      {children}
    </packetContext.Provider>
  )
}

export function usePacket() {
  return useContext(packetContext)
}
