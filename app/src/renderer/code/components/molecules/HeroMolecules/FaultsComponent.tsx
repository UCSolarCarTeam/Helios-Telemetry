import { useEffect, useState } from "react";

import { ISeverity } from "@/components//atoms/FaultCard";
import FaultCard from "@/components/atoms/FaultCard";
import { usePacket } from "@/contexts/PacketContext";
import { type IAuxBms } from "@/objects/telemetry-data.interface";

type TestFaultType = {
  [key: string]: boolean;
};

type CurrentFaultsType = {
  [key in keyof TestFaultType]: number;
};

function FaultsComponent(props: any) {
  const { currentPacket } = usePacket();
  const [currentFaultTimers, setCurrentFaultTimers] =
    useState<CurrentFaultsType>({} as CurrentFaultsType);

  function flattenNestedJson(
    obj: { BMSFaults: IAuxBms },
    prefix = "",
  ): TestFaultType {
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

  useEffect(() => {
    const flattenedFaults = flattenNestedJson({
      // Battery: currentPacket.BatteryFaults,
      // MotorFaults: currentPacket.MotorFaults,
      BMSFaults: currentPacket.AuxBms,
      // TODO: we need to add auxBMS faults, we'll ask embedded to restructure the packet.
    });

    Object.keys(flattenedFaults).map((fault) => {
      typeof fault;
      if (flattenedFaults[fault as keyof TestFaultType] === true) {
        setCurrentFaultTimers((prev) => ({ ...prev, [fault]: 0 }));
      } else {
        if (currentFaultTimers[fault as keyof TestFaultType] !== undefined) {
          if (currentFaultTimers[fault as keyof TestFaultType] + 1 >= 10) {
            setCurrentFaultTimers((prev) => {
              const {
                [fault as keyof TestFaultType]: _,
                ...currentFaultTimers
              } = prev;
              return currentFaultTimers;
            });
          } else {
            setCurrentFaultTimers((prev) => ({
              ...prev,
              [fault]: currentFaultTimers[fault as keyof TestFaultType] + 1,
            }));
          }
        }
      }
    });
  }, [currentPacket]);

  return (
    <div className="flex h-full flex-col gap-4 overflow-y-scroll">
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
