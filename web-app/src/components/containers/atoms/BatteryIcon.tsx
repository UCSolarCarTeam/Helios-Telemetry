import React, { useEffect, useState } from "react";
function BatteryIconComponent(props: any) {
  const [batteryLevel, setBatteryLevel] = useState<number>(38.5);

  const [batteryStyleString, setBatteryStyleString] = useState<string>("");
  useEffect(() => {
    const nextString = `linear-gradient(
            90deg,
            #9C0534 0%, #9C0534 ${(batteryLevel / 98) * 100}%, 
            #BAB8B8 ${(batteryLevel / 98) * 100}%, #BAB8B8 50%`;
    setBatteryStyleString(nextString);
  }, [batteryLevel]);

  const [terminalStyleString, setTerminalStyleString] = useState<string>("");
  useEffect(() => {
    const nextString = `linear-gradient(
            90deg, 
            #9C0534 0%, #9C0534 ${((batteryLevel - 98) / 2) * 100}%, 
            #BAB8B8 ${batteryLevel - 98 - 2 * 100}%, #BAB8B8 50%`;
    setTerminalStyleString(nextString);
  }, [batteryLevel]);

  return (
    <div className="flex flex-nowrap">
      <div
        className="flex justify-start rounded-lg w-battery h-full"
        style={{ backgroundImage: batteryStyleString }}
      >
        <div className="flex justify-center self-center items-stretch text-3xl min-h-full min-w-full text-[#FFFFFF]">
          <div className="min-h-full self-center">
            {batteryLevel.toString()}%
          </div>
        </div>
      </div>
      <div
        className="flex self-center rounded-r-md w-terminal h-1/3"
        style={{ backgroundImage: terminalStyleString }}
      ></div>
    </div>
  );
}

export default BatteryIconComponent;
