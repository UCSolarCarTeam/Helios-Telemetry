import { useEffect, useState } from "react";

import { usePacket } from "@/contexts/PacketContext";

function ThrottleIcon() {
  const { currentPacket } = usePacket();
  const gasPos = currentPacket.DriverControls.Acceleration;
  const regenPos = currentPacket.DriverControls.RegenBraking;

  const [throttleStyleString, setThrottleStyleString] = useState<string>("");

  // useEffect(() => {
  //   const nextString = `linear-gradient(
  //           90deg,
  //           rgba(0,0,0,0) 0%, rgba(0,0,0,0) ${50 - regenPos / 2}%,
  //           #96be25 ${50 - regenPos / 2}%, #96be25 50%,
  //           #B94A6C 50%, #B94A6C ${50 + gasPos / 2}%,
  //           rgba(0,0,0,0) ${50 + gasPos / 2}%, rgba(0,0,0,0) 100%
  //           )`;
  //   setThrottleStyleString(nextString);
  // }, [regenPos, gasPos]);

  return (
    <>
      <div className="col-span-7 grid h-10 w-full content-center justify-items-center">
        <span className="z-10 flex h-1 w-full place-self-center transition-all">
          <span
            className={`flex h-1 transition-all`}
            style={{ width: `${100 - regenPos}%` }}
          />
          <span
            className={`bg-green flex h-1 transition-all`}
            style={{ width: `${regenPos}%` }}
          />
          <span
            className={`bg-helios flex h-1 transition-all`}
            style={{ width: `${gasPos}%` }}
          />
          <span
            className={`flex h-1 transition-all`}
            style={{ width: `${100 - gasPos}%` }}
          />
        </span>
        <span className="z-10 m-auto mt-[-9.5px] h-4 w-0.5 bg-[#505050]" />
        <span className="z-0 m-auto mt-[9.5px] h-[0.12rem] w-full bg-[#505050] " />
      </div>
    </>
  );
}

export default ThrottleIcon;
