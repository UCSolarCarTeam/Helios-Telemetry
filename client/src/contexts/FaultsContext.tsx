import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// type TestType = I_PISFieldData & { faultTimer: number | undefined };
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
    }, {} as TestFaultType);
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

        if (
          entryCounter === 4 ||
          index === Object.entries(flattenedJson).length - 1
        ) {
          resultArray.push(tempObject as IFaults);
          tempObject = {};
          entryCounter = 0;
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
      //   console.log(newGroupedFaults);
      newGroupedFaults.forEach((faultObj: IFaults) => {
        if (faultObj.value === true) {
          if (faultObj.faultTimer !== undefined) {
            faultObj.faultTimer += 1; // increment
          } else {
            faultObj.faultTimer = 1; // fault is new so timer is 1
          }
        } else {
          faultObj.faultTimer = undefined; // the fault doesnt exist anymore if its false
        }
      });
    }

    setCurrentFaults((prevFaults) => {
      if (JSON.stringify(prevFaults) !== JSON.stringify(newGroupedFaults)) {
        return newGroupedFaults;
      }
      return prevFaults;
    });
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
