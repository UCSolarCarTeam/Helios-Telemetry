import { APPUNITS, useAppState } from "@/contexts/AppStateContext";
import { UnitType } from "@/objects/PIS/PIS.interface";

function useUnitsHandler(
  unit: UnitType | undefined,
  value: string | number | boolean,
) {
  const { currentAppState } = useAppState();
  const MI_TO_KM = 0.621371;

  let unitReturn: string | undefined;
  let valueReturn: string | number | boolean;
  unitReturn = unit;
  valueReturn = value;

  switch (unit) {
    case UnitType.TEMP:
      if (
        typeof value === "number" &&
        currentAppState.appUnits === APPUNITS.IMPERIAL
      ) {
        unitReturn = "°F";
        valueReturn = (value * 9) / 5 + 32;
      } else {
        unitReturn = "°C";
        valueReturn = value;
      }
      break;

    case UnitType.SPEED:
      if (
        typeof value === "number" &&
        currentAppState.appUnits === APPUNITS.IMPERIAL
      ) {
        unitReturn = "mph";
        valueReturn = value * MI_TO_KM;
      } else {
        unitReturn = "km/h";
        valueReturn = value;
      }
      break;

    case UnitType.DISTANCE:
      if (
        typeof value === "number" &&
        currentAppState.appUnits === APPUNITS.IMPERIAL
      ) {
        unitReturn = "mi";
        valueReturn = value * MI_TO_KM;
      } else {
        unitReturn = "km";
        valueReturn = value;
      }
      break;

    case undefined:
      unitReturn = "";
      valueReturn = value;
      break;
  }

  const val = valueReturn;
  const units = `${unitReturn}`;

  return { units: units, val: val };
}
export default useUnitsHandler;
