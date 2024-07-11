import { useState } from "react";

import { type ChannelData } from "@/objects/MpptProps";

export default function MpptComponent({
  channelData,
}: {
  channelData: ChannelData;
}) {
  const myString = [
    "Array Voltage",
    "Array Current",
    "Battery Voltage",
    "Temperature",
  ];
  const [U0C0, setU0C0] = useState(myString[0]);

  return (
    <div className="flex justify-around text-xs">
      <button id="ArrayVoltage" onClick={() => setU0C0(myString[0])}>
        {U0C0 === myString[0] ? (
          <button className="underline decoration-red-500">
            Array Voltage
          </button>
        ) : (
          <button className="hover:underline">Array Voltage</button>
        )}
        <div className="flex justify-center text-primary">
          <div>{channelData.arrayVoltage}</div>
          <div className="ml-2 mt-1 size-2 rounded-full bg-green dark:bg-green-dark"></div>
        </div>
      </button>
      <button id="ArrayCurrent" onClick={() => setU0C0(myString[1])}>
        {U0C0 === myString[1] ? (
          <button className="underline decoration-red-500">
            Array Current
          </button>
        ) : (
          <button className="hover:underline">Array Current</button>
        )}
        <div className="flex justify-center text-primary">
          <div>{channelData.arrayCurrent}</div>
          <div className="ml-2 mt-1 size-2 rounded-full bg-green dark:bg-green-dark"></div>
        </div>
      </button>
      <button id="BatteryVoltage" onClick={() => setU0C0(myString[2])}>
        {U0C0 === myString[2] ? (
          <button className="underline decoration-red-500">
            Battery Voltage
          </button>
        ) : (
          <button className="hover:underline">Battery Voltage</button>
        )}
        <div className="flex justify-center text-primary">
          <div>{channelData.batteryVoltage}</div>
          <div className="ml-2 mt-1 size-2 rounded-full bg-green dark:bg-green-dark"></div>
        </div>
      </button>
      <button id="Temperature" onClick={() => setU0C0(myString[3])}>
        {U0C0 === myString[3] ? (
          <button className="underline decoration-red-500">
            Array Current
          </button>
        ) : (
          <button className="hover:underline">Array Current</button>
        )}
        <div className="flex justify-center text-primary">
          <div>{channelData.temperature}</div>
          <div className="ml-2 mt-1 size-2 rounded-full bg-green dark:bg-green-dark"></div>
        </div>
      </button>
    </div>
  );
}
