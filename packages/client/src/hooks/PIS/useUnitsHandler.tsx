import { UnitType } from "@/objects/PIS/PIS.interface";
import { APPUNITS, useAppState } from "@/stores/useAppState";

const MI_TO_KM = 0.621371;

export default function useUnitsHandler(
  unit: UnitType | undefined,
  value: string | number | boolean,
) {
  const { currentAppState } = useAppState();

  let unitReturn: string | undefined = unit;
  let valueReturn: string | number | boolean = value;

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

  return { units: `${unitReturn}`, val: valueReturn };
}
