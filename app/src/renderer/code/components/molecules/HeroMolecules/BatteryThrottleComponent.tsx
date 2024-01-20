import BatteryIconComponent from "../../atoms/BatteryIcon";
import SpeedAtom from "../../atoms/SpeedAtom";
import ThrottleIcon from "../../atoms/ThrottleIcon";

function BatteryThrottleComponent(props: any) {
  return (
    <>
      <div className="grid w-full grid-cols-12 content-center justify-items-center">
        <BatteryIconComponent />
        <ThrottleIcon />
        <SpeedAtom />
      </div>
    </>
  );
}

export default BatteryThrottleComponent;
