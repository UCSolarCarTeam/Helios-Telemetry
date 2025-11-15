import ParkingBrakeIcon from "@/components/atoms/ParkingBreakIcon";
import { usePacketStore } from "@/stores/usePacket";

function GearParkBrakeComponent() {
  const { currentPacket } = usePacketStore();
  const selectedCSS = "font-bold text-helios";
  const reverse = currentPacket.B3.ReverseDigital;
  const forward = !currentPacket.B3.ReverseDigital;
  const brake = currentPacket.B3.BrakeSwitchDigital;

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center justify-center space-y-1 pt-8 text-xl">
          <h1 className={reverse ? selectedCSS : ""}>R</h1>
          <h1 className={!reverse && !forward ? selectedCSS : ""}>N</h1>
          <h1 className={forward ? selectedCSS : ""}>D</h1>
        </div>

        <div className="grid grid-rows-1 gap-4">
          <div className="row-start-4 row-end-4">
            <ParkingBrakeIcon
              color={brake ? "fill-secondary" : "fill-light dark:fill-dark"}
              height="30px"
              width="30px"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default GearParkBrakeComponent;
