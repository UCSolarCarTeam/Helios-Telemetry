import { useEffect, useState } from "react";

import { usePacket } from "../../../contexts/PacketContext";
import FaultCard from "../../atoms/FaultCard";
import { ISeverity } from "../../atoms/FaultCard";

type TestFaultType = {
  fault1: boolean;
  fault2: boolean;
  fault3: boolean;
  fault4: boolean;
};

type CurrentFaultsType = {
  [key in keyof TestFaultType]: number;
};

function FaultsComponent(props: any) {
  const [demoPacketFaults, setDemoPacketFaults] = useState<TestFaultType>({
    fault1: false,
    fault2: false,
    fault3: false,
    fault4: false,
  });

  const [currentFaultTimers, setCurrentFaultTimers] =
    useState<CurrentFaultsType>({} as CurrentFaultsType);

  useEffect(() => {
    const fakeFaultInterval = setInterval(() => {
      setDemoPacketFaults({
        ...demoPacketFaults,
        fault1: Math.random() > 0.9,
        fault2: Math.random() > 0.9,
        fault3: Math.random() > 0.9,
        fault4: Math.random() > 0.9,
      });
    }, 250);

    return () => {
      clearInterval(fakeFaultInterval);
    };
  }, []);

  useEffect(() => {
    Object.keys(demoPacketFaults).map((fault) => {
      demoPacketFaults[fault as keyof TestFaultType]
        ? // Packet Fault is true
          setCurrentFaultTimers({ ...currentFaultTimers, [fault]: 0 })
        : // Packet Fault is false
          currentFaultTimers[fault as keyof TestFaultType] !== undefined
          ? // Fault is currently timed
            currentFaultTimers[fault as keyof TestFaultType] + 1 >= 10
            ? setCurrentFaultTimers((prev) => {
                const {
                  [fault as keyof TestFaultType]: _,
                  ...currentFaultTimers
                } = prev;

                return currentFaultTimers;
              })
            : setCurrentFaultTimers({
                ...currentFaultTimers,
                [fault]: currentFaultTimers[fault as keyof TestFaultType] + 1,
              })
          : // Fault is not timed
            null;
    });
  }, [demoPacketFaults]);

  return (
    <div className="flex flex-col gap-4">
      {Object.keys(currentFaultTimers).map((fault, index) => (
        <FaultCard key={index} severity={ISeverity.WARNING} faultName={fault} />
      ))}
      {Object.keys(currentFaultTimers).length === 0 && (
        <FaultCard severity={ISeverity.CLEAR} faultName={"No Faults"} />
      )}
    </div>
  );
}

export default FaultsComponent;
