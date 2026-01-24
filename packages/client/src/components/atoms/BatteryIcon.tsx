import { usePacketStore } from "@/stores/usePacket";

function BatteryIconComponent() {
  const { currentPacket } = usePacketStore();
  const batteryLevel = currentPacket.Battery.PackStateOfCharge;

  return (
    <div className="col-span-3 grid w-full pr-2">
      <div className="flex w-full flex-nowrap">
        <div className="relative flex h-full min-h-full w-[98%] items-stretch justify-center self-center rounded-lg bg-sand dark:bg-arsenic">
          <div className="absolute z-40 flex min-h-full items-center justify-center text-center text-lg text-white">
            {batteryLevel.toString()}%
          </div>
          <div className="w-full">
            <div
              className="z-40 flex rounded-lg bg-primary transition-all"
              style={{
                height: "100%",
                width: `${(batteryLevel * 100) / 98 <= 100 ? (batteryLevel * 100) / 98 : 100}%`,
              }}
            />
          </div>
        </div>
        <div
          className={`flex h-1/4 w-[2%] self-center rounded-r-lg transition-all ${batteryLevel > 98 ? "bg-primary" : "bg-sand"}`}
        />
      </div>
    </div>
  );
}
export default BatteryIconComponent;
