import { useEffect, useState } from "react";

function ThrottleIcon({
  acceleration,
  regenBraking,
}: {
  acceleration: number;
  regenBraking: number;
}) {
  const [regenPos, setRegenPos] = useState(acceleration);
  const [gasPos, setGasPos] = useState(regenBraking);

  const [throttleStyleString, setThrottleStyleString] = useState<string>("");
  useEffect(() => {
    setRegenPos(acceleration);
  }, [acceleration]);
  useEffect(() => {
    setGasPos(regenBraking);
  }, [regenBraking]);
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
      <div className="col-span-7 grid h-10 w-full content-center justify-items-center">
        <span
          className=" z-10 h-1 w-full place-self-center"
          style={{ backgroundImage: throttleStyleString }}
        />
        <span className="z-10 m-auto mt-[9.5px] h-4 w-0.5 bg-[#505050]" />
        <span className="z-0 m-auto mt-[9.5px] h-[0.12rem] w-full bg-[#505050]" />
      </div>
    </>
  );
}

export default ThrottleIcon;
