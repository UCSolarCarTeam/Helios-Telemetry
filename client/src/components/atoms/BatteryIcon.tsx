import { useEffect, useState } from "react";

import { usePacket } from "@/contexts/PacketContext";

function BatteryIconComponent() {
  const { currentPacket } = usePacket();
  const batteryLevel = currentPacket.Battery.PackStateOfCharge;

  return (
    <div className="col-span-3 grid w-full pr-2">
      <div className="flex w-full flex-nowrap">
        <div className="relative flex h-full min-h-full w-[98%] items-stretch justify-center self-center rounded-lg bg-[#BAB8B8]">
          <div className="absolute z-50 flex min-h-full items-center justify-center text-center text-lg text-[#FFFFFF]">
            {batteryLevel.toString()}%
          </div>
          <div className="w-full">
            <div
              className="z-40 flex rounded-lg bg-[#9C0534] transition-all"
              style={{
                height: "100%",
                width: `${(batteryLevel * 100) / 98 <= 100 ? (batteryLevel * 100) / 98 : 100}%`,
              }}
            />
          </div>
        </div>
        <div
          className={`flex h-1/4 w-[2%] self-center rounded-r-lg transition-all ${batteryLevel > 98 ? "bg-[#9C0534] " : "bg-[#BAB8B8]"}`}
        />
      </div>
    </div>
  );
}
export default BatteryIconComponent;
