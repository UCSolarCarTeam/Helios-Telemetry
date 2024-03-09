import BatteryIconComponent from "@/components/atoms/BatteryIcon";
import SpeedAtom from "@/components/atoms/SpeedAtom";
import ThrottleIcon from "@/components/atoms/ThrottleIcon";
import type ITelemetryData from "@/objects/telemetry-data.interface";

function BatteryThrottleComponent({
  packetBattery,
  packetDriverControls,
  packetKeyMotor,
}: {
  packetBattery: ITelemetryData["Battery"];
  packetDriverControls: ITelemetryData["DriverControls"];
  packetKeyMotor: ITelemetryData["KeyMotor"];
}) {
  return (
    <>
      <div className="grid w-full grid-cols-12 content-center justify-items-center">
        <BatteryIconComponent
          packetBatteryLevel={packetBattery.PackStateOfCharge}
        />
        <ThrottleIcon
          acceleration={packetDriverControls.Acceleration}
          regenBraking={packetDriverControls.RegenBraking}
        />
        <SpeedAtom speed={packetKeyMotor[0].VehicleVelocity} />
      </div>
    </>
  );
}

export default BatteryThrottleComponent;
