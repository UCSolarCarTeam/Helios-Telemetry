import React from "react";

const fakeData = {
  "Motor Temp": 55,
  "Battery Power": 54.35,
  Motor: 55,
  "Motor Temp1": 55,
  "Motor Temp2": 55,
  "Motor Temp3": 55,
  "Pack Voltage": 55,
  MPPT: 55,
  "Battery Current": 55,
  "Bus Voltage": 55,
};

function BottomInformationContainer(props: any) {
  return (
    <div className="align-middle	">
      <div className="pt-2 text-base 2xl:text-xl flex flex-nowrap justify-evenly text-center h-full">
        <div>
          <div className="text-xs 2xl:text-base"> MOTOR TEMPERATURE </div>
          <div className="text-zesty">{fakeData["Motor Temp"]}</div>
        </div>
        <div>
          <div className="text-xs 2xl:text-sm"> BATTERY POWER </div>
          <div className="text-zesty">{fakeData["Battery Power"]}</div>
        </div>
        <div>
          <div className="text-xs 2xl:text-sm"> MOTOR </div>
          <div className="text-zesty">{fakeData["Motor"]}</div>
        </div>
        <div>
          <div className="text-xs 2xl:text-sm"> MOTOR TEMPERATURE</div>
          <div className="text-zesty">{fakeData["Motor Temp1"]}</div>
        </div>
        <div>
          <div className="text-xs 2xl:text-sm"> MOTOR TEMPERATURE </div>
          <div className="text-zesty">{fakeData["Motor Temp2"]}</div>
        </div>
        <div>
          <div className="text-xs 2xl:text-sm"> MOTOR TEMPERATURE </div>
          <div className="text-zesty">{fakeData["Motor Temp3"]}</div>
        </div>
        <div>
          <div className="text-xs 2xl:text-sm"> PACK VOLTAGE </div>
          <div className="text-zesty">{fakeData["Pack Voltage"]}</div>
        </div>
        <div>
          <div className="text-xs 2xl:text-sm"> MPPT </div>
          <div className="text-zesty">{fakeData["MPPT"]}</div>
        </div>
        <div>
          <div className="text-xs 2xl:text-sm"> BATTERY CURRENT </div>
          <div className="text-zesty">{fakeData["Battery Current"]}</div>
        </div>
        <div>
          <div className="text-xs 2xl:text-sm"> BUS VOLTAGE </div>
          <div className="text-zesty">{fakeData["Bus Voltage"]}</div>
        </div>
      </div>
    </div>
  );
}
export default BottomInformationContainer;
