import SpeedAtom from "../../atoms/SpeedAtom";
import ThrottleIcon from "../../atoms/ThrottleIcon";

function BatteryThrottleComponent(props: any) {
  return (
    <>
      <div className="grid w-full grid-cols-12 justify-items-center content-center">
        <div className="grid col-span-3" />
        <ThrottleIcon />
        <SpeedAtom />
      </div>
    </>
  );
}

export default BatteryThrottleComponent;
