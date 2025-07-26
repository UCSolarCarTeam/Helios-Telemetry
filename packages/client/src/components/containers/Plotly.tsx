import dynamic from "next/dynamic";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { PlotParams } from "react-plotly.js";

type PlotlyHTML = Plotly.PlotlyHTMLElement & { align: string };
const Plotly = dynamic(
  () =>
    import("plotly.js-dist-min").then(({ newPlot, purge }) => {
      const Plotly = forwardRef<HTMLDivElement, PlotParams>(
        ({ className, config, data, layout }, ref) => {
          const originRef = useRef(null);
          const [handle, setHandle] = useState<Plotly.PlotlyHTMLElement>();

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

          return <div className={className} ref={originRef} />;
        },
      );
      Plotly.displayName = "Plotly";
      return Plotly;
    }),
  { ssr: false },
);

export default Plotly;
