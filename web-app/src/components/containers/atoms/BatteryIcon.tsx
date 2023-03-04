import React, { useEffect, useState } from "react";
function BatteryIconComponent(props: any) {
  const [batteryLevel, setBatteryLevel] = useState<number>(38.5);

  const [batteryStyleString, setBatteryStyleString] = useState<string>("");
  useEffect(() => {
    const nextString = `linear-gradient(
            90deg, 
            #9C0534 0%, #9C0534 ${batteryLevel}%, 
            #BAB8B8 ${batteryLevel}%, #BAB8B8 50%`;
    setBatteryStyleString(nextString);
  }, [batteryLevel]);

  return (
    <div className="rounded" style={{ backgroundImage: batteryStyleString }}>
      <div className="flex justify-center items-stretch text-1xl min-h-full text-[#FFFFFF]">
        <div className="min-h-full self-center">{batteryLevel.toString()}%</div>
      </div>
    </div>
  );
}

export default BatteryIconComponent;
