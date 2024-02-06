import { useEffect, useState } from "react";

import { usePacket } from "../../../contexts/PacketContext";
import faults from "../../../objects/PIS/PIS.faults";
import FaultCard from "../../atoms/FaultCard";
import { ISeverity } from "../../atoms/FaultCard";

type TestFaultType = {
  [key: string]: boolean;
};

type CurrentFaultsType = {
  [key in keyof TestFaultType]: number;
};

function FaultsComponent(props: any) {
  const { currentPacket } = usePacket();

  function flattenNestedJson(obj, prefix = ""): TestFaultType {
    return Object.keys(obj).reduce((acc, key) => {
      const prefixedKey = prefix ? `${prefix}.${key}` : key;
      if (typeof obj[key] === "object" && obj[key] !== null) {
        // If the value is an object (nested JSON), call the function recursively
        Object.assign(acc, flattenNestedJson(obj[key], prefixedKey));
      } else {
        // If the value is not an object, it's a leaf node, so assign it to the flattened object
        acc[prefixedKey] = obj[key];
      }
      return acc;
    }, {});
  }

  // const [demoPacketFaults, setDemoPacketFaults] = useState<TestFaultType>({
  //   fault1: false,
  //   fault2: false,
  //   fault3: false,
  //   fault4: false,
  // });

  const [currentFaultTimers, setCurrentFaultTimers] =
    useState<CurrentFaultsType>({} as CurrentFaultsType);

  // useEffect(() => {
  //   const fakeFaultInterval = setInterval(() => {
  //     setDemoPacketFaults({
  //       ...demoPacketFaults,
  //       fault1: Math.random() > 0.9,
  //       fault2: Math.random() > 0.9,
  //       fault3: Math.random() > 0.9,
  //       fault4: Math.random() > 0.9,
  //     });
  //   }, 250);

  //   return () => {
  //     clearInterval(fakeFaultInterval);
  //   };
  // }, []);

  useEffect(() => {
    const flattenedFaults = flattenNestedJson({
      // Battery: currentPacket.BatteryFaults,
      // MotorFaults: currentPacket.MotorFaults,
      BMSFaults: currentPacket.AuxBms,
      // TODO: we need to add auxBMS faults, we'll ask embedded to restructure the packet.
    });

    Object.keys(flattenedFaults).map((fault) => {
      console.log(typeof fault);
      flattenedFaults[fault as keyof TestFaultType]
        ? // Packet Fault is true
          setCurrentFaultTimers({ ...currentFaultTimers, [fault]: 0 })
        : // Packet Fault is false
          console.log(fault);
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
  }, [currentPacket]);

  useEffect(() => {
    console.log(currentFaultTimers);
  }, [currentFaultTimers]);

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
