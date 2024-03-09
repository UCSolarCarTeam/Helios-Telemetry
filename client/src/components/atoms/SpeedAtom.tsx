import { useEffect, useState } from "react";

import { useAppState } from "@/contexts/AppStateContext";

function SpeedAtom({ speed }: { speed: number }) {
  const [speedLevel, setSpeed] = useState(speed);
  const {} = useAppState;
  useEffect(() => {
    setSpeed(speed);
  }, [speed]);
  return (
    <>
      <div className="col-span-2 grid h-10 w-full content-center justify-items-center">
        <div className="grid grid-cols-2">
          <div className="col-span-1 grid">
            <h1 className="text-4xl">{speedLevel}</h1>
          </div>
          <div className="col-span-1 grid">
            <h1 className="text-sm">km/h</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default SpeedAtom;
