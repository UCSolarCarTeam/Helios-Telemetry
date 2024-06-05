import AWSIcon from "@/components/atoms/AWSIcon";
import CarIcon from "@/components/atoms/CarIcon";
import LatencyDotsIcon from "@/components/atoms/LatencyDotsIcon";
import UserComputerIcon from "@/components/atoms/UserComputerIcon";

function StatusComponent() {
  const carLatency = 23;
  const userLatency = 78;

  const userConnection = true;
  const carConnection = false;

  return (
    <div className="grid">
      <div>
        <div className="flex flex-row items-end justify-start pb-1 pt-2">
          {" "}
          <UserComputerIcon color={"#000000"} width="25px" height="25px" />
          <LatencyDotsIcon
            color={"#000000"}
            width="15px"
            height="20px"
            latency={userLatency}
            isConnected={userConnection}
          />
          <AWSIcon color={"#000000"} width="25px" height="25px" />
          <LatencyDotsIcon
            color={"#000000"}
            width="15px"
            height="20px"
            latency={carLatency}
            isConnected={carConnection}
          />
          <CarIcon color={"#000000"} width="25px" height="25px" />
        </div>
        <h5 className="text-text-gray dark:text-text-gray-dark pb-1 text-sm ">
          PACKET TIMESTAMP
        </h5>
        <h5 className="text-text-gray dark:text-text-gray-dark decoration-primary pb-2 text-xs underline decoration-1 underline-offset-4">
          Oct. 15 2022, 4:18.16pm
        </h5>
      </div>
    </div>
  );
}

export default StatusComponent;
