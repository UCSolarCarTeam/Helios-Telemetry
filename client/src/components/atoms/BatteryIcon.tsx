import { useEffect, useState } from "react";

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
    <div className="col-span-3 grid w-full pr-2">
      <div className="flex w-full flex-nowrap">
        <div
          className="flex h-full w-[98%] justify-start rounded-lg"
          style={{ backgroundImage: batteryStyleString }}
        >
          <div className="flex min-h-full min-w-full items-stretch justify-center self-center text-[#FFFFFF]">
            <div className="min-h-full self-center text-lg">
              {batteryLevel.toString()}%
            </div>
          </div>
        </div>
        <div
          className="flex h-1/4 w-[2%] self-center rounded-r-sm"
          style={{ backgroundImage: terminalStyleString }}
        ></div>
      </div>
    </div>
  );
}
export default BatteryIconComponent;
