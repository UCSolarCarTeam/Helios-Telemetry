import React, { useEffect, useState } from "react";

function ThrottleIcon(props: any) {
  const [regenPos, setRegenPos] = useState<number>(100);
  const [gasPos, setGasPos] = useState<number>(100);

  const [throttleStyleString, setThrottleStyleString] = useState<string>("");
  useEffect(() => {
    const nextString = `linear-gradient(
            90deg, 
            rgba(0,0,0,0) 0%, rgba(0,0,0,0) ${50 - regenPos / 2}%, 
            #00ff00 ${50 - regenPos / 2}%, #00ff00 50%,
            #ff0000 50%, #ff0000 ${50 + gasPos / 2}%, 
            rgba(0,0,0,0) ${50 + gasPos / 2}%, rgba(0,0,0,0) 100% 
            )`;
    setThrottleStyleString(nextString);
  }, [regenPos, gasPos]);

  return (
    <>
      <div className="grid w-full h-10 justify-items-center col-span-7 content-center">
        <span
          className=" w-full h-1 place-self-center"
          style={{ backgroundImage: throttleStyleString }}
        />
        <span className="m-auto w-0.5 h-4 bg-black -mt-[9.5px]" />
      </div>
    </>
  );
}

export default ThrottleIcon;
