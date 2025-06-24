import { useMemo } from "react";

import I_PIS from "@/objects/PIS/PIS.interface";

export const useFavouriteLookupTable = (
  dataArray: I_PIS[],
): Record<string, () => string | number | undefined> => {
  return useMemo(() => {
    const table: Record<string, () => string | number | undefined> = {};

    for (const data of dataArray) {
      if (!data) continue;

      const flatten = (obj: I_PIS, prefix = "") => {
        for (const key in obj) {
          const value = obj[key];
          const path = prefix ? `${prefix}.${key}` : key;

          if (
            value !== null &&
            typeof value === "object" &&
            !Array.isArray(value)
          ) {
            flatten(value, path);
          } else {
            table[path] = () => {
              if (Array.isArray(value)) return undefined;
              if (typeof value === "boolean") return value ? "T" : "F";
              if (
                typeof value === "string" ||
                typeof value === "number" ||
                typeof value === "undefined"
              )
                return value;
              return undefined;
            };
          }
        }
      };

      flatten(data);
    }

    return table;
  }, [dataArray]);
};
