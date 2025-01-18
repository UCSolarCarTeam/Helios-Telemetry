import { useMemo } from "react";

import I_PIS, { I_PISField } from "@/objects/PIS/PIS.interface";

export const useFavouriteLookupTable = (
  dataArray: I_PIS[],
): Record<string, () => string | number | undefined> => {
  return useMemo(() => {
    const table: Record<string, () => string | number | undefined> = {};

    for (const data of dataArray) {
      if (!data) continue;

      if (data.Unit0 || data.Unit1) {
        // Handle MPPT
        for (const unitKey of Object.keys(data)) {
          const unit = data[unitKey] as Record<string, I_PISField[]>;
          if (!unit) continue;

          for (const channelKey of Object.keys(unit)) {
            const channel = unit[channelKey];
            if (!channel) continue;
            for (const field of channel) {
              table[field.name] = () => {
                const value = field.data[0]?.value;
                if (typeof value === "boolean") return value ? "T" : "F";
                return value;
              };
            }
          }
        }
      } else {
        // Handle non-MPPT structures
        for (const sectionKey of Object.keys(data)) {
          const section = data[sectionKey] as I_PISField[];
          if (!section) continue;

          for (const field of section) {
            table[field.name] = () => {
              const value = field.data[0]?.value;
              if (typeof value === "boolean") return value ? "T" : "F";
              return value;
            };
          }
        }
      }
    }

    return table;
  }, [dataArray]);
};
