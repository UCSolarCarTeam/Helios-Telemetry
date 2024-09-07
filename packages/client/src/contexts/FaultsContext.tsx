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
    if (!fault.value) {
      faults.set(index, { ...fault, faultTimer: fault.faultTimer + 1 });
      if (fault.faultTimer >= 10) {
        faults.delete(fault.name);
      }
    }
  });
}

export function FaultsContextProvider({ children }: Props) {
  const faults = Faults();
  const trueFaultsRef = useRef(new Map<string, IFaults>());

  function processFaultSection(section: I_PIS) {
    Object.keys(section).forEach((key) => {
      const value = section[key];
      if (!Array.isArray(value)) {
        processFaultSection(value as I_PIS);
        return;
      }
      value.forEach((fault) => {
        const existingFault = trueFaultsRef.current.get(fault.name);
        const faultDataExists = !!fault?.data[0]?.value;
        const updatedFault = {
          ...existingFault,
          value: faultDataExists,
        };
        if (!faultDataExists) {
          if (existingFault) {
            trueFaultsRef.current.set(fault.name, updatedFault as IFaults);
          }
          return;
        }
        if (existingFault) {
          updatedFault.faultTimer = 0;
          trueFaultsRef.current.set(fault.name, updatedFault as IFaults);
          return;
        }
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
    });
  }

  const currentFaults = useMemo(() => {
    processFaultSection(faults);
    incrementOrDropFaultTimer(trueFaultsRef.current);
    // console.log(Array.from(trueFaultsRef.current.entries()));
    return trueFaultsRef.current;
  }, [faults]);

  return (
    <faultsContext.Provider value={{ currentFaults }}>
      {children}
    </faultsContext.Provider>
  );
}

export function useFaults(): IFaultsReturn {
  return useContext(faultsContext);
}
