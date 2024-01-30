import { useAppState } from "../../contexts/AppStateContext";

function SpeedAtom(props: any) {
  const {} = useAppState;
  const speed = 53;

  return (
    <>
      <div className="col-span-2 grid h-10 w-full content-center justify-items-center">
        <div className="grid grid-cols-2">
          <div className="col-span-1 grid">
            <h1 className="text-4xl">{speed}</h1>
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
