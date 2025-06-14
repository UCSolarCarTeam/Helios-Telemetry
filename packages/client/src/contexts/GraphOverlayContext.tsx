import {
  type ForwardedRef,
  JSX,
  type ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

import { type AnchorElTooltipsRefHandle } from "@/components/molecules/GraphMolecules/FieldGraphTooltip";

interface GraphOverlayContextProps {
  children: ReactNode | ReactNode[];
}
interface GraphElement {
  name: string;
  ref: ForwardedRef<AnchorElTooltipsRefHandle>;
}
interface IGraphOverlayContexttReturn {
  openNewGraph: (
    name: string,
    ref: React.ForwardedRef<AnchorElTooltipsRefHandle>,
  ) => void;
  openGraphs: GraphElement[];
  closeGraph: (field: string) => void;
}

const graphOverlayContext = createContext<IGraphOverlayContexttReturn>(
  {} as IGraphOverlayContexttReturn,
);

export function GraphOverlayContextProvider({
  children,
}: GraphOverlayContextProps): JSX.Element {
  const [openGraphs, setOpenGraphs] = useState<GraphElement[]>([]);

  const openNewGraph = (
    name: string,
    ref: ForwardedRef<AnchorElTooltipsRefHandle>,
  ) => {
    setOpenGraphs([...openGraphs, { name, ref }]);
  };
  const closeGraph = (field: string) => {
    setOpenGraphs((prevGraph) =>
      prevGraph.filter((graph) => graph.name !== field),
    );
  };

  return (
    <graphOverlayContext.Provider
      value={{ closeGraph, openGraphs, openNewGraph }}
    >
      {children}
    </graphOverlayContext.Provider>
  );
}

export function useGraphOverlay(): IGraphOverlayContexttReturn {
  return useContext(graphOverlayContext);
}
