import isEqual from "lodash/isEqual";

import { useAppState } from "@/contexts/AppStateContext";
import usePIS from "@/hooks/PIS/usePIS";
import type { I_PISField } from "@/objects/PIS/PIS.interface";
import type I_PIS from "@/objects/PIS/PIS.interface";

// const fakeData = {
//   "Motor Temp": 55,
//   "Battery Power": 54.35,
//   Motor: 55,
//   "Motor Temp1": 55,
//   "Motor Temp2": 55,
//   "Motor Temp3": 55,
//   "Pack Voltage": 55,
//   MPPT: 55,
//   "Battery Current": 55,
//   "Bus Voltage": 55,
// };

function BottomInformationContainer() {
  const { currentAppState } = useAppState();
  const { battery, motor, mppt } = usePIS();
  const favourites = currentAppState.favourites;

  const findValueByNameInData = (
    dataArray: I_PIS[],
    providedName: string,
  ): string | number | undefined => {
    //Loop through each object in the dataArray
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
  };

  return (
    <div className="align-middle">
      <div className="flex h-full flex-row flex-wrap justify-evenly gap-4 pt-1 text-center text-base md:gap-2 2xl:text-xl">
        {favourites.map((favourite: string, index: number) => (
          <div className="min-w-32 p-3" key={index}>
            <div className="text-xs 2xl:text-sm">{favourite.toUpperCase()}</div>
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

  {
    /* <div className="min-w-32">
          <div className="text-xs 2xl:text-sm"> MOTOR TEMPERATURE </div>
          <div className="text-helios">{fakeData["Motor Temp"]}</div>
        </div> */
  }
  {
    /* <div className="min-w-32">
          <div className="text-xs 2xl:text-sm"> BATTERY POWER </div>
          <div className="text-helios">{fakeData["Battery Power"]}</div>
        </div>
        <div className="min-w-32">
          <div className="text-xs 2xl:text-sm"> MOTOR </div>
          <div className="text-helios">{fakeData["Motor"]}</div>
        </div>
        <div className="min-w-32">
          <div className="text-xs 2xl:text-sm"> MOTOR TEMPERATURE</div>
          <div className="text-helios">{fakeData["Motor Temp1"]}</div>
        </div>
        <div className="min-w-32">
          <div className="text-xs 2xl:text-sm"> MOTOR TEMPERATURE </div>
          <div className="text-helios">{fakeData["Motor Temp2"]}</div>
        </div>
        <div className="min-w-32">
          <div className="text-xs 2xl:text-sm"> MOTOR TEMPERATURE </div>
          <div className="text-helios">{fakeData["Motor Temp3"]}</div>
        </div>
        <div className="min-w-32">
          <div className="text-xs 2xl:text-sm"> PACK VOLTAGE </div>
          <div className="text-helios">{fakeData["Pack Voltage"]}</div>
        </div>
        <div className="min-w-32">
          <div className="text-xs 2xl:text-sm"> MPPT </div>
          <div className="text-helios">{fakeData["MPPT"]}</div>
        </div>
        <div className="min-w-32">
          <div className="text-xs 2xl:text-sm"> BATTERY CURRENT </div>
          <div className="text-helios">{fakeData["Battery Current"]}</div>
        </div>
        <div className="min-w-32">
          <div className="text-xs 2xl:text-sm"> BUS VOLTAGE </div>
          <div className="text-helios">{fakeData["Bus Voltage"]}</div>
        </div> */
    //   </div>
    // </div>
    //);
  }
}
export default BottomInformationContainer;
