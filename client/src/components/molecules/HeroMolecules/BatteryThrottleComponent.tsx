import BatteryIconComponent from "@/components/atoms/BatteryIcon";
import SpeedAtom from "@/components/atoms/SpeedAtom";
import ThrottleIcon from "@/components/atoms/ThrottleIcon";

function BatteryThrottleComponent() {
  return (
    <div className="grid w-full grid-cols-12 content-center justify-items-center">
      <BatteryIconComponent />
      <ThrottleIcon />
      <SpeedAtom />
    </div>
  );
}

export default BatteryThrottleComponent;
