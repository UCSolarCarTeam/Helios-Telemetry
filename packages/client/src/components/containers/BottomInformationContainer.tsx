import isEqual from "lodash/isEqual";
import { useCallback } from "react";

import { useAppState } from "@/contexts/AppStateContext";
import usePIS from "@/hooks/PIS/usePIS";
import type { I_PISField } from "@/objects/PIS/PIS.interface";
import type I_PIS from "@/objects/PIS/PIS.interface";

interface HandleRemoveFavourite {
  (favourite: string): void;
}

function BottomInformationContainer() {
  const { currentAppState, setCurrentAppState } = useAppState();
  const { battery, motor, mppt } = usePIS();
  const favourites = currentAppState?.favourites ?? [];

  const findValueByNameInData = useCallback(
    (dataArray: I_PIS[], providedName: string): string | number | undefined => {
      // Loop through each object in the dataArray
      dataArray = dataArray.filter((data) => data !== undefined);
      for (const data of dataArray) {
        if (isEqual(data, mppt)) {
          // Loop through each Unit key (like Unit0, Unit1, etc.)
          for (const unitKey of Object.keys(data)) {
            const unit = data[unitKey] as Record<string, I_PISField[]>; // Get the object under each Unit key
            // Loop through each Channel key within the Unit (like Channel0, Channel1, etc.)
            if (unit === undefined) continue;
            for (const channelKey of Object.keys(unit)) {
              const channel = unit[channelKey] as I_PISField[];
              // Loop through each object in the array
              for (const item of channel) {
                // Check if the name matches the providedName
                if (item.name === providedName) {
                  // Return the value inside the `data` array of the matching object
                  if (typeof item.data[0]?.value === "boolean") {
                    return item.data[0]?.value ? "T" : "F";
                  }
                  return item.data[0]?.value;
                }
              }
            }
          }
          return undefined; // Return undefined if no matching name is found
        } else {
          for (const sectionKey of Object.keys(data)) {
            const section = data[sectionKey] as I_PISField[]; // Get the array of items under each key
            // Loop through each object in the array
            for (const item of section) {
              // Check if the name matches the providedName
              if (item.name === providedName) {
                // Return the value inside the `data` array of the matching object
                if (typeof item.data[0]?.value === "boolean") {
                  return item.data[0]?.value ? "T" : "F";
                }
                return item.data[0]?.value;
              }
            }
          }
        }
      }
      return undefined; // Return undefined if no matching name is found
    },
    [],
  );

  const handleRemoveFavourite: HandleRemoveFavourite = useCallback(
    (favourite: string) => {
      const newFavourites = favourites.filter((item) => item !== favourite);
      if (newFavourites.length === 0) {
        setCurrentAppState((prev) => ({
          ...prev,
          favourites: [
            "Motor Temp",
            "Battery Cell Voltage",
            "Vehicle Velocity",
            "Pack Voltage",
            "Pack Current",
            "Battery Average Voltage",
          ],
        }));
        localStorage.removeItem("favourites");
        return;
      } else {
        setCurrentAppState((prev) => ({
          ...prev,
          favourites: newFavourites,
        }));
        localStorage.setItem("favourites", JSON.stringify(newFavourites));
        return;
      }
    },
    [currentAppState, favourites],
  );

  return (
    <div className="align-middle">
      <div className="flex h-full flex-row flex-wrap justify-evenly gap-4 pt-1 text-center text-base md:gap-2 2xl:text-xl">
        {favourites.map((favourite: string, index: number) => (
          <div className="min-w-32 p-3" key={index}>
            <div
              className="text-xs hover:cursor-pointer 2xl:text-sm"
              onClick={() => handleRemoveFavourite(favourite)}
            >
              {favourite.toUpperCase()}
            </div>
            <div className="text-helios">
              {
                /*Search for the value associated with the favourite name string */
                findValueByNameInData(
                  [battery, motor, mppt].filter(
                    (data): data is I_PIS => data !== undefined,
                  ),
                  favourite,
                )
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default BottomInformationContainer;
