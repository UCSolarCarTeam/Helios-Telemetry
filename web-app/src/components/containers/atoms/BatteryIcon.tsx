import React, { useEffect, useState } from "react";
function BatteryIconComponent(props: any) {
    const [batteryLevel, setBatteryLevel] = useState<number>(50);

    const [batteryStyleString, setBatteryStyleString] = useState<string>('');
    useEffect(() => {

        const nextString = `linear-gradient(
            90deg, 
            #9C0534 0%, #9C0534 ${batteryLevel}%, 
            #BAB8B8 ${batteryLevel}%, #BAB8B8 50%`
        setBatteryStyleString(nextString);
    }, [batteryLevel]);

  return ( 
    <div className="rounded" style={{backgroundImage: batteryStyleString}}>
        <div className="text-6xl text-center text-[#FFFFFF] ">{batteryLevel.toString()}%</div>
     </div>
  );
}

export default BatteryIconComponent;
