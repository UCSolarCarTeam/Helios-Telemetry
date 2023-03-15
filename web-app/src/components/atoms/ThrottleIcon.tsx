import React, { useEffect, useState } from "react";

function ThrottleIcon(props: any) {
  const [regenPos, setRegenPos] = useState<number>(0);
  const [gasPos, setGasPos] = useState<number>(62);

  const [throttleStyleString, setThrottleStyleString] = useState<string>("");
  useEffect(() => {
    const nextString = `linear-gradient(
            90deg, 
            rgba(0,0,0,0) 0%, rgba(0,0,0,0) ${50 - regenPos / 2}%, 
            #96be25 ${50 - regenPos / 2}%, #96be25 50%,
            #B94A6C 50%, #B94A6C ${50 + gasPos / 2}%, 
            rgba(0,0,0,0) ${50 + gasPos / 2}%, rgba(0,0,0,0) 100% 
            )`;
    setThrottleStyleString(nextString);
  }, [regenPos, gasPos]);

  return (
    <>
      <div className="grid w-full h-10 justify-items-center col-span-7 content-center">
        <span
          className=" w-full h-1 place-self-center z-10"
          style={{ backgroundImage: throttleStyleString }}
        />
        <span className="m-auto w-0.5 h-4 bg-[#505050] -mt-[9.5px] z-10" />
        <span className="m-auto w-full h-[0.12rem] bg-[#505050] -mt-[9.5px] z-0" />
      </div>
    </>
  );
}

export default ThrottleIcon;
