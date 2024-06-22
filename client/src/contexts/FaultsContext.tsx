import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaultLocations,
  ISeverity,
} from "@/components/molecules/HeroMolecules/HeroTypes";
import Faults from "@/objects/PIS/PIS.faults";
import type I_PIS from "@/objects/PIS/PIS.interface";
import {
  type IAuxBms,
  type IBatteryFault,
  type IMotorFault,
} from "@/objects/telemetry-data.interface";

interface Props {
  children: ReactNode | ReactNode[];
}

export interface IFaults {
  value: boolean;
  indicationLocation: FaultLocations;
  severity: ISeverity;
  name: string;
  faultTimer: number | undefined;
}
interface IFaultsReturn {
  currentFaults: IFaults[];
}

type TestFaultType = {
  [key: string]: boolean;
};

const faultsContext = createContext<IFaultsReturn>({} as IFaultsReturn);

export function FaultsContextProvider({ children }: Props) {
  const [currentFaults, setCurrentFaults] = useState<IFaults[]>([
    {
      value: false,
      indicationLocation: FaultLocations.OTHER,
      severity: ISeverity.CLEAR,
      name: "",
      faultTimer: undefined,
    },
  ]);

  const faults = Faults();
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

  function mapFlattenedToJsonObjects(flattenedJson: TestFaultType): IFaults[] {
    const resultArray: IFaults[] = [];
    let tempObject: { [key: string]: any } = {};
    let entryCounter = 0;

    Object.entries(flattenedJson).forEach(([key, value], index) => {
      const match = key.match(
        /(.*?)(name|indiciationLocation|severity|value)$/,
      );
      if (match) {
        const propertyName = match[2];
        tempObject[propertyName] = value;
        entryCounter++;

        // Every 4 entries or last entry, push the tempObject to resultArray and reset tempObject
        if (
          entryCounter === 4 ||
          index === Object.entries(flattenedJson).length - 1
        ) {
          resultArray.push(tempObject as IFaults);
          tempObject = {}; // Reset for the next group
          entryCounter = 0; // Reset counter
        }
      }
    });

    return resultArray;
  }

  // Usage with useMemo
  const groupedFaults = useMemo(() => {
    const flattenedFaults = flattenNestedJson({
      Battery: faults.BatteryFaults,
      MotorFaults: faults.MotorFaults,
      BMSFaults: faults.AuxBms,
    });

    return mapFlattenedToJsonObjects(flattenedFaults);
  }, [faults.BatteryFaults, faults.MotorFaults, faults.AuxBms]);

  useEffect(() => {
    const newGroupedFaults = groupedFaults.map((faultObj) => ({ ...faultObj }));

    if (Array.isArray(newGroupedFaults)) {
      newGroupedFaults.forEach((faultObj: IFaults) => {
        if (faultObj.value === true) {
          if (faultObj.faultTimer === undefined) {
            faultObj.faultTimer = 1; // the fault is new, so the timer should now be 1
          } else {
            faultObj.faultTimer += 1; // increment the timer if the fault is still true
          }
        } else {
          faultObj.faultTimer = undefined; // the fault doesnt exist anymore if its false
        }
      });
    } else {
      console.error("newGroupedFaults is not an array", newGroupedFaults);
    }

    // Update the state only if there were changes
    setCurrentFaults((prevFaults) => {
      if (JSON.stringify(prevFaults) !== JSON.stringify(newGroupedFaults)) {
        return newGroupedFaults;
      }
      //   console.log(prevFaults);
      return prevFaults;
    }); // Assuming setGroupedFaults is the state updater function
  }, [groupedFaults]);

  return (
    <faultsContext.Provider
      value={{
        currentFaults,
      }}
    >
      {children}
    </faultsContext.Provider>
  );
}

export function useFaults(): IFaultsReturn {
  return useContext(faultsContext);
}
