import {
  type ReactNode,
  createContext,
  useContext,
  useMemo,
  useRef,
} from "react";

import {
  type FaultLocations,
  type ISeverity,
} from "@/components/molecules/HeroMolecules/HeroTypes";
import Faults from "@/objects/PIS/PIS.faults";
import type I_PIS from "@/objects/PIS/PIS.interface";
import { type I_PISFieldData } from "@/objects/PIS/PIS.interface";

interface Props {
  children: ReactNode | ReactNode[];
}

type IFaults = I_PISFieldData & { faultTimer: number; name: string };

interface IFaultsReturn {
  currentFaults: Map<string, IFaults>;
}

const faultsContext = createContext<IFaultsReturn>({} as IFaultsReturn);
function incrementOrDropFaultTimer(faults: Map<string, IFaults>) {
  faults.forEach((fault, index) => {
    faults.set(index, { ...fault, faultTimer: fault.faultTimer + 1 });
    if (fault.faultTimer >= 3) {
      faults.delete(fault.name);
    }
  });
}
export function FaultsContextProvider({ children }: Props) {
  const faults = Faults();
  const trueFaultsRef = useRef(new Map<string, IFaults>());
  function processFaultSection(section: I_PIS) {
    Object.keys(section).forEach((key) => {
      const value = section[key];
      if (Array.isArray(value)) {
        value.forEach((fault) => {
          if (fault?.data[0]?.value === false) {
            return;
          }
          const existingFault = trueFaultsRef.current.get(fault.name);
          // reset fault timer
          if (existingFault) {
            trueFaultsRef.current.set(fault.name, {
              ...existingFault,
              faultTimer: 0,
            });
            return;
          }
          // add to trueFaults
          const newFault: IFaults = {
            faultTimer: 0,
            severity: fault?.data[0]?.severity as ISeverity,
            indicationLocation: fault?.data[0]
              ?.indicationLocation as FaultLocations,
            value: !!fault?.data[0]?.value,
            name: fault.name,
          };
          trueFaultsRef.current.set(fault.name, newFault);
        });
      } else {
        processFaultSection(value as I_PIS);
      }
    });
  }
  const currentFaults = useMemo(() => {
    processFaultSection(faults);
    incrementOrDropFaultTimer(trueFaultsRef.current);
    console.log(trueFaultsRef.current);
    return trueFaultsRef.current;
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