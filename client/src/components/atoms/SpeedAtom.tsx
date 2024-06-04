import { useAppState } from "@/contexts/AppStateContext";

function SpeedAtom(props: any) {
  const {} = useAppState;
  const speed = 53;

  return (
    <>
      <div className="col-span-2 grid h-10 w-full content-center justify-items-center">
        <div className="flex flex-row">
          <div className="items-center">
            <h1 className="text-4xl">{speedValue.toFixed(0)}</h1>
          </div>
          <div className="items-center">
            <h1 className="text-sm">{speedUnit}</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default SpeedAtom;
