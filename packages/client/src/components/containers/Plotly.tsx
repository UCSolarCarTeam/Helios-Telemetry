import dynamic from "next/dynamic";
import { Config, Layout } from "plotly.js";
import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

interface PlotlyProps {
  id?: string;
  className?: string;
  data: Plotly.Data[];
  layout?: Partial<Layout>;
  config?: Partial<Config>;
}
type PlotlyHTML = Plotly.PlotlyHTMLElement & { align: string };
const Plotly = dynamic(
  () =>
    import("plotly.js-dist-min").then(({ newPlot, purge }) => {
      const Plotly = forwardRef<HTMLDivElement, PlotlyProps>(
        ({ className, config, data, id, layout }, ref) => {
          const originId = useId();
          const realId = id || originId;
          const originRef = useRef(null);
          const [handle, setHandle] = useState<
            Plotly.PlotlyHTMLElement | undefined
          >(undefined);

          useEffect(() => {
            let instance: Plotly.PlotlyHTMLElement | undefined;
            if (originRef.current) {
              newPlot(originRef.current, data, layout, config).then((ref) => {
                setHandle((instance = ref));
              });
            }
            return () => {
              if (instance) {
                purge(instance);
              }
            };
          }, [data, layout, config]);

          useImperativeHandle(ref, () => handle as PlotlyHTML, [handle]);

          return <div className={className} id={realId} ref={originRef} />;
        },
      );
      Plotly.displayName = "Plotly";
      return Plotly;
    }),
  { ssr: false },
);

export default Plotly;
