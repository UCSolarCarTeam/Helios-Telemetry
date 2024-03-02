import { type ReactNode, createContext, useContext, useState } from "react";

interface GraphOverlayContextProps {
  children: ReactNode | ReactNode[];
}

interface IGraphOverlayContexttReturn {
  openNewGraph: (field: string) => void;
  openGraphs: string[];
  closeGraph: (field: string) => void;
}

const graphOverlayContext = createContext<IGraphOverlayContexttReturn>(
  {} as IGraphOverlayContexttReturn,
);

export function GraphOverlayContextProvider({
  children,
}: GraphOverlayContextProps): JSX.Element {
  const [openGraphs, setOpenGraphs] = useState<string[]>([]);

  const openNewGraph = (field: string) => {
    setOpenGraphs([...openGraphs, field]);
  };
  const closeGraph = (field: string) => {
    setOpenGraphs(openGraphs.filter((graph) => graph !== field));
  };

  return (
    <graphOverlayContext.Provider
      value={{ openNewGraph, openGraphs, closeGraph }}
    >
      {children}
    </graphOverlayContext.Provider>
  );
}

export function useGraphOverlay(): IGraphOverlayContexttReturn {
  return useContext(graphOverlayContext);
}
