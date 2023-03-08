import React, { useEffect, useState } from "react";
function BatteryIconComponent(props: any) {
  const [batteryLevel, setBatteryLevel] = useState<number>(0);

  const [batteryStyleString, setBatteryStyleString] = useState<string>("");
  useEffect(() => {
    const nextString = `linear-gradient(
            90deg, 
            #9C0534 0%, #9C0534 ${batteryLevel}%, 
            #BAB8B8 ${batteryLevel}%, #BAB8B8 50%`;
    setBatteryStyleString(nextString);
  }, [batteryLevel]);

  const [terminalStyleString, setTerminalStyleString] = useState<string>("");
  useEffect(() => {
    const nextString = `linear-gradient(
            90deg, 
            #9C0534 98%, #9C0534 ${batteryLevel}%, 
            #BAB8B8 ${batteryLevel}%, #BAB8B8 99%`;
    setTerminalStyleString(nextString);
  }, [batteryLevel]);

  return (
    <div>
      <div
        className="rounded-lg w-full h-full"
        style={{ backgroundImage: terminalStyleString }}
      >
        <div
          className="rounded-lg w-battery h-full"
          style={{ backgroundImage: batteryStyleString }}
        >
          <div className="flex justify-center items-stretch text-2xl min-h-full text-[#FFFFFF]">
            <div className="min-h-full self-center">
              {batteryLevel.toString()}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BatteryIconComponent;
