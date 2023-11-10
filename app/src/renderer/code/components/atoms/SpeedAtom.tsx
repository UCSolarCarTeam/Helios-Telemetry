import React, { useEffect, useState } from 'react'
import { useAppState } from '../../contexts/AppStateContext'

function SpeedAtom(props: any) {
  const {} = useAppState
  let speed = 53

  return (
    <>
      <div className="grid w-full h-10 justify-items-center content-center col-span-2">
        <div className="grid grid-cols-2">
          <div className="grid col-span-1">
            <h1 className="text-4xl">{speed}</h1>
          </div>
          <div className="grid col-span-1">
            <h1 className="text-sm">km/h</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default SpeedAtom
