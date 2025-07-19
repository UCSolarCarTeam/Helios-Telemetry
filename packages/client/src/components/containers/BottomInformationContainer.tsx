import { useCallback } from "react";

import { useAppState } from "@/contexts/AppStateContext";
import usePIS from "@/hooks/PIS/usePIS";
import { useFavouriteLookupTable } from "@/hooks/favouriteLookupTable";
import type I_PIS from "@/objects/PIS/PIS.interface";

function BottomInformationContainer() {
  const { currentAppState, setCurrentAppState } = useAppState();
  const { battery, mbms, motor, mppt } = usePIS();
  const dataArray = [battery, motor, mppt, mbms].filter(
    (data) => data !== undefined,
  ) as I_PIS[];
  const lookupTable = useFavouriteLookupTable(dataArray);

  const favourites = currentAppState.favourites;

  const handleRemoveFavourite = useCallback(
    (favourite: string) => {
      const newFavourites = favourites.filter((item) => item !== favourite);
      setCurrentAppState((prev) => ({
        ...prev,
        favourites: newFavourites,
      }));
      localStorage.setItem("favourites", JSON.stringify(newFavourites));
      return;
    },
    [currentAppState, favourites],
  );

  const formatPathLabel = (path: string) =>
    path
      .split(".")
      .map(
        (segment) =>
          segment
            .replace(/([a-z])([A-Z])/g, "$1 $2") // lowerUpper → lower Upper
            .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2") // ABCDef → ABC Def
            .replace(/([a-zA-Z])(\d)/g, "$1 $2"), // Unit3 → Unit 3
      )
      .join(" "); // use " " or " →" or " / " if preferred

  return (
    <div className="align-middle">
      <div className="flex h-full flex-row flex-wrap justify-evenly gap-4 pt-1 text-center text-base md:gap-2 2xl:text-xl">
        {favourites.map((favourite: string, index: number) => (
          <div className="min-w-32 p-3" key={index}>
            <div
              className="text-xs hover:cursor-pointer 2xl:text-sm"
              onClick={() => handleRemoveFavourite(favourite)}
            >
              {formatPathLabel(favourite)}
            </div>
            <div className="text-helios">
              {/*Search for the value associated with the favourite name string in the lookupTable */
              lookupTable[favourite]?.()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default BottomInformationContainer;
