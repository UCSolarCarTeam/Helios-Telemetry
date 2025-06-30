import { useMemo } from "react";

import I_PIS, { I_PISField } from "@/objects/PIS/PIS.interface";

export const useFavouriteLookupTable = (
  dataArray: I_PIS[],
): Record<string, () => string | number | undefined> => {
  return useMemo(() => {
    const table: Record<string, () => string | number | undefined> = {};

    const extractFields = (node: unknown) => {
      if (!node || typeof node !== "object") return;

      // If the current level is an array of I_PISField
      if (
        Array.isArray(node) &&
        node.length &&
        "name" in node[0] &&
        "data" in node[0]
      ) {
        for (const field of node as I_PISField[]) {
          if (!field?.name) continue;
          table[field.name] = () => {
            const value = field.data?.[0]?.value;
            if (typeof value === "boolean") return value ? "T" : "F";
            return value;
          };
        }
        return;
      }

      // Traverse object properties recursively if not an array of I_PISField (meaning it's a nested object)
      for (const key of Object.keys(node)) {
        extractFields((node as Record<string, unknown>)[key]);
      }
    };

    for (const data of dataArray) {
      extractFields(data);
    }

    return table;
  }, [dataArray]);
};
