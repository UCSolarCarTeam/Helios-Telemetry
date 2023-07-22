import React, { useEffect, useState } from 'react'

function BatteryIconComponent(props: any) {
  const [batteryLevel, setBatteryLevel] = useState<number>(38.5)

  const [batteryStyleString, setBatteryStyleString] = useState<string>('')
  useEffect(() => {
    const nextString = `linear-gradient(
            90deg,
            #9C0534 0%, #9C0534 ${(batteryLevel / 98) * 100}%, 
            #BAB8B8 ${(batteryLevel / 98) * 100}%, #BAB8B8 50%`
    setBatteryStyleString(nextString)
  }, [batteryLevel])

  const [terminalStyleString, setTerminalStyleString] = useState<string>('')
  useEffect(() => {
    const nextString = `linear-gradient(
            90deg, 
            #9C0534 0%, #9C0534 ${((batteryLevel - 98) / 2) * 100}%, 
            #BAB8B8 ${batteryLevel - 98 - 2 * 100}%, #BAB8B8 50%`
    setTerminalStyleString(nextString)
  }, [batteryLevel])

  return (
    <div className="grid col-span-3 w-full pr-2">
      <div className="flex flex-nowrap w-full">
        <div
          className="flex justify-start rounded-lg w-[98%] h-full"
          style={{ backgroundImage: batteryStyleString }}
        >
          <div className="flex justify-center self-center items-stretch min-h-full min-w-full text-[#FFFFFF]">
            <div className="text-lg min-h-full self-center">{batteryLevel.toString()}%</div>
          </div>
        </div>
        <div
          className="flex self-center rounded-r-sm w-[2%] h-1/4"
          style={{ backgroundImage: terminalStyleString }}
        ></div>
      </div>
    </div>
  )
}

export default BatteryIconComponent
