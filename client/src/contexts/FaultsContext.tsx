import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// type TestType = I_PISFieldData & { faultTimer: number | undefined };
import type {
  FaultLocations,
  ISeverity,
} from "@/components/molecules/HeroMolecules/HeroTypes";
import Faults from "@/objects/PIS/PIS.faults";
import type I_PIS from "@/objects/PIS/PIS.interface";

interface Props {
  children: ReactNode | ReactNode[];
}

export interface IFaults {
  value: boolean;
  indicationLocation: FaultLocations;
  severity: ISeverity;
  name: string;
  faultTimer: number;
}
interface IFaultsReturn {
  currentFaults: IFaults[];
}

type TestFaultType = {
  [key: string]: boolean;
};

const faultsContext = createContext<IFaultsReturn>({} as IFaultsReturn);

export function FaultsContextProvider({ children }: Props) {
  const [currentFaults, setCurrentFaults] = useState<IFaults[]>([]);

  const faults = Faults();

  useEffect(() => {
    const processFaultSection = (section: I_PIS) => {
      Object.keys(section).forEach((key) => {
        const value = section[key];

        if (Array.isArray(value)) {
          value.map((fault) => {
            const faultName = fault.name;
            fault.data.map((data) => {
              setCurrentFaults((prevFaults) => {
                const newFaults = [...prevFaults];

                const faultIndex = newFaults.findIndex(
                  (f) => f.name === faultName, // Find the fault index
                );

                if (faultIndex !== -1) {
                  const existingFault = newFaults[faultIndex];
                  if (data.value === false) {
                    if (existingFault.faultTimer === 10) {
                      newFaults.splice(faultIndex, 1); // remove the fault
                    } else {
                      existingFault.faultTimer += 1; // Or any other necessary update
                      newFaults[faultIndex] = existingFault;
                    }
                  }
                } else {
                  // if its true and its the first time seeing this fault, add it and start timer
                  // console.log(data);
                  if (data.value === true) {
                    newFaults.push({
                      value: data.value,
                      indicationLocation: data.indiciationLocation,
                      severity: data.severity,
                      name: faultName,
                      faultTimer: 1,
                    });
                  }
                }

                return newFaults;
              });
            });
          });
        } else {
          // Recursive call for nested objects
          processFaultSection(value);
        }
      });
    };

    processFaultSection(faults);
  }, [faults]);

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
