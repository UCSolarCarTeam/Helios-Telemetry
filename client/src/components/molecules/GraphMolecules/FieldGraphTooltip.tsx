import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

// Random build issue and prettier
import { useGraphOverlay } from "@/contexts/GraphOverlayContext";
import {
  type I_PISField,
  type I_PISFieldData,
} from "@/objects/PIS/PIS.interface";
import { Tooltip } from "@mui/material";
import type { Instance } from "@popperjs/core";

export type AnchorElTooltipsRefHandle = {
  getData: () => I_PISFieldData[];
};

type AnchorElTooltipsProps = {
  children: React.ReactNode;
  field: I_PISField;
};

const AnchorElTooltips = forwardRef<
  AnchorElTooltipsRefHandle,
  AnchorElTooltipsProps
>(function AnchorElTooltips(props: AnchorElTooltipsProps, ref) {
  const { children, field } = props;
  const positionRef = useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const popperRef = useRef<Instance>(null);
  const areaRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent) => {
    positionRef.current = { x: event.clientX, y: event.clientY };

    if (popperRef.current != null) {
      void popperRef.current.update();
    }
  };
  const { openNewGraph } = useGraphOverlay();

  const getData = useCallback(() => {
    return field.data;
  }, [field.data]);

  useImperativeHandle(
    ref,
    () => {
      return {
        getData,
      };
    },
    [getData],
  );

  return (
    <Tooltip
      arrow
      title={
        <button onClick={() => openNewGraph(field.name, ref)}>
          Open Graph
        </button>
      }
      slotProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 14],
              },
            },
          ],
        },
      }}
      PopperProps={{
        popperRef,
        anchorEl: {
          getBoundingClientRect: () => {
            return new DOMRect(
              positionRef.current.x,
              areaRef.current!.getBoundingClientRect().y,
              0,
              0,
            );
          },
        },
      }}
    >
      <div ref={areaRef} onMouseMove={handleMouseMove}>
        {children}
      </div>
    </Tooltip>
  );
});

export default AnchorElTooltips;
