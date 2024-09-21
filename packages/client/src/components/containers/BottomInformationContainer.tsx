import { useAppState } from "@/contexts/AppStateContext";
import usePIS from "@/hooks/PIS/usePIS";

const fakeData = {
  "Battery Current": 55,
  "Battery Power": 54.35,
  "Bus Voltage": 55,
  MPPT: 55,
  Motor: 55,
  "Motor Temp": 55,
  "Motor Temp1": 55,
  "Motor Temp2": 55,
  "Motor Temp3": 55,
  "Pack Voltage": 55,
};

function BottomInformationContainer(props: any) {
  const { battery, motor, MPPT, Faults } = usePIS();
  const { currentAppState } = useAppState();
  const favourites = currentAppState.favourites;

  const findValue = (favourite: string) => {
    //implement this lookup logic
    return 0;
  };

  return (
    <div className="align-middle">
      <div className="flex h-full flex-row flex-wrap justify-evenly gap-4 pt-4 text-center text-base md:gap-2 2xl:text-xl">
        {favourites.map((favourite: string, index: number) => (
          <div key={index} className="min-w-32 p-3">
            <div className="text-xs 2xl:text-sm">{favourite.toUpperCase()}</div>
            <div className="text-helios">
              {
                /*Search for the value associated with the favourite name string */
                findValue(favourite)
              }
            </div>
          </div>
        ))}
        {/* <div className="min-w-32">
          <div className="text-xs 2xl:text-sm"> MOTOR TEMPERATURE </div>
          <div className="text-helios">{fakeData["Motor Temp"]}</div>
        </div> */}
        {/* <div className="min-w-32">
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
        </div> */}
      </div>
    </div>
  );
}
export default BottomInformationContainer;
