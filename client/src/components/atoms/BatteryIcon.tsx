import { useEffect, useState } from "react";

import { usePacket } from "@/contexts/PacketContext";

function BatteryIconComponent() {
  const { currentPacket } = usePacket();
  const batteryLevel = currentPacket.Battery.PackStateOfCharge;

  return (
    <div className="col-span-3 grid w-full pr-2">
      <div className="flex w-full flex-nowrap">
        <div className="relative flex h-full w-[98%] justify-start rounded-lg ">
          <div className="flex min-h-full min-w-full items-stretch justify-center self-center text-[#FFFFFF]">
            <div className="absolute z-50 min-h-full self-center text-lg">
              {batteryLevel.toString()}%
            </div>
            <div
              className="z-40 flex  rounded-lg bg-[#9C0534] transition-all"
              style={{
                height: "100%",
                width: `${batteryLevel}%`,
              }}
            />
            <div
              className="flex bg-[#BAB8B8] transition-all"
              // style={{
              //   height: "100%",
              //   width: `${100 - batteryLevel}%`,
              // }}
            />
          </div>
        </div>
        <div
          className={`flex h-1/4 w-[2%] self-center rounded-lg ${batteryLevel > 98 ? "bg-[#9C0534] " : "bg-[#BAB8B8]"}`}
        />
      </div>
    </div>
  );
}
export default BatteryIconComponent;
