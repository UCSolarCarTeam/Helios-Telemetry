import {
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from "react";

import {
  type FaultLocations,
  type ISeverity,
} from "@/components/molecules/HeroMolecules/HeroTypes";
import usePIS from "@/hooks/PIS/usePIS";
import type I_PIS from "@/objects/PIS/PIS.interface";
import { type I_PISFieldData } from "@/objects/PIS/PIS.interface";

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

export function FaultsContextProvider({ children }: PropsWithChildren) {
  const { faults } = usePIS();
  const trueFaultsRef = useRef(new Map<string, IFaults>());

  const processFaultSection = useCallback((section: I_PIS) => {
    Object.keys(section).forEach((key) => {
      const value = section[key];
      if (Array.isArray(value)) {
        value.forEach((fault) => {
          if (fault?.data[0]?.value === false) {
            const existingFault = trueFaultsRef.current.get(fault.name);
            if (existingFault) {
              trueFaultsRef.current.set(fault.name, {
                ...existingFault,
                value: false,
              });
            }
            return;
          }
          const existingFault = trueFaultsRef.current.get(fault.name);
          if (existingFault) {
            trueFaultsRef.current.set(fault.name, {
              ...existingFault,
              faultTimer: 0,
              value: true,
            });
            return;
          }
          const newFault: IFaults = {
            faultTimer: 0,
            indicationLocation: fault?.data[0]
              ?.indicationLocation as FaultLocations,
            name: fault.name,
            severity: fault?.data[0]?.severity as ISeverity,
            value: !!fault?.data[0]?.value,
          };
          trueFaultsRef.current.set(fault.name, newFault);
        });
      } else {
        processFaultSection(value as I_PIS);
      }
    });
  }, []);

  const currentFaults = useMemo(() => {
    processFaultSection(faults as I_PIS);
    incrementOrDropFaultTimer(trueFaultsRef.current);
    return trueFaultsRef.current;
  }, [faults, processFaultSection]);

  return (
    <faultsContext.Provider value={{ currentFaults }}>
      {children}
    </faultsContext.Provider>
  );
}

export function useFaults(): IFaultsReturn {
  return useContext(faultsContext);
}
