import { useEffect, useMemo, useState } from "react";

import FaultCard from "@/components/atoms/FaultCard";
import { ISeverity } from "@/components/molecules/HeroMolecules/HeroTypes";
import Faults from "@/objects/PIS/PIS.faults";
import type I_PIS from "@/objects/PIS/PIS.interface";
import {
  type IAuxBms,
  type IBatteryFault,
  type IMotorFault,
} from "@/objects/telemetry-data.interface";

type TestFaultType = {
  [key: string]: boolean;
};

type CurrentFaultsType = {
  [key in keyof TestFaultType]: number;
};

function FaultsComponent(props: any) {
  const faults = Faults();
  const [currentFaultTimers, setCurrentFaultTimers] =
    useState<CurrentFaultsType>({} as CurrentFaultsType);

  function flattenNestedJson(
    obj:
      | {
          Battery: I_PIS;
          MotorFaults: I_PIS;
          BMSFaults: I_PIS;
        }
      | IBatteryFault
      | IMotorFault[]
      | IAuxBms
      | I_PIS,
    prefix = "",
  ): TestFaultType {
    return Object.keys(obj).reduce((acc, key) => {
      const prefixedKey = prefix ? `${prefix}.${key}` : key;
      if (
        typeof obj[key as keyof typeof obj] === "object" &&
        obj[key as keyof typeof obj] !== null
      ) {
        // If the value is an object (nested JSON), call the function recursively
        Object.assign(
          acc,
          flattenNestedJson(obj[key as keyof typeof obj], prefixedKey),
        );
      } else {
        // If the value is not an object, it's a leaf node, so assign it to the flattened object
        acc[prefixedKey] = obj[key as keyof typeof obj];
      }
      return acc;
    }, {} as TestFaultType); // Add return type annotation
  }

  const flattenedFaults = useMemo(() => {
    return flattenNestedJson({
      Battery: faults.BatteryFaults,
      MotorFaults: faults.MotorFaults,
      BMSFaults: faults.AuxBms,
      // TODO: we need to add auxBMS faults, we'll ask embedded to restructure the packet.
    });
  }, [faults.BatteryFaults, faults.MotorFaults, faults.AuxBms]);

  useEffect(() => {
    const newFaultTimers: CurrentFaultsType = { ...currentFaultTimers };

    Object.keys(flattenedFaults).forEach((fault) => {
      if (flattenedFaults[fault as keyof TestFaultType]) {
        newFaultTimers[fault] = 0;
      } else {
        if (currentFaultTimers[fault] !== undefined) {
          if (currentFaultTimers[fault] + 1 >= 10) {
            delete newFaultTimers[fault];
          } else {
            newFaultTimers[fault] = currentFaultTimers[fault] + 1;
          }
        }
      }
    });

    if (JSON.stringify(newFaultTimers) !== JSON.stringify(currentFaultTimers)) {
      setCurrentFaultTimers(newFaultTimers);
    }
  }, [flattenedFaults]);

  return (
    <div className="flex h-full flex-col overflow-y-scroll">
      {Object.keys(currentFaultTimers).map((fault, index) => {
        const split = fault.split(".");
        const faultName = split[split.length - 1];
        return (
          <FaultCard
            key={index}
            severity={ISeverity.WARNING}
            faultName={faultName
              .replace(/([A-Z]+)/g, " $1")
              .replace(/([A-Z][a-z])/g, " $1")}
          />
        );
      })}
      {Object.keys(currentFaultTimers).length === 0 && (
        <FaultCard severity={ISeverity.CLEAR} faultName={"No Faults"} />
      )}
    </div>
  );
}

export default FaultsComponent;
