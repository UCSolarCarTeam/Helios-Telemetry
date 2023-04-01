import React from "react";

const fakeData = {
  Unit0: {
    Channel0: {
      arrayVoltage: "42.00V",
      arrayCurrent: "69.00C",
      batteryVoltage: "42.00V",
      temperature: "23.00C",
    },
    Channel1: {
      arrayVoltage: "42.00V",
      arrayCurrent: "69.00C",
      batteryVoltage: "42.00V",
      temperature: "23.00C",
    },
  },
  Unit1: {
    Channel0: {
      arrayVoltage: "42.00V",
      arrayCurrent: "69.00C",
      batteryVoltage: "42.00V",
      temperature: "23.00C",
    },
    Channel1: {
      arrayVoltage: "42.00V",
      arrayCurrent: "69.00C",
      batteryVoltage: "42.00V",
      temperature: "23.00C",
    },
  },
};

function MpptTab() {
  return (
    <>
      <div className="flex flex-nowrap justify-evenly text-center h-full">
        <div id="Unit 0" className="w-full ">
          <h1 className="text-lg font-medium">Unit 0</h1>
          <div id="channels" className="flex justify-center">
            <div id="Channel 0" className=" w-full -mt-5 pr-2">
              <div className="flex justify-center">
                <h2 className="font-medium">Channel 0</h2>
                <div className="h-3 w-3 mt-1.5 ml-2 rounded-full bg-green dark:bg-green-dark"></div>
              </div>
              <div className="flex text-xs justify-around ">
                <div id="ArrayVoltage">
                  <div>Array Voltage</div>
                  <div className="flex justify-center text-[#9C0534]">
                    <div>{fakeData.Unit1.Channel0.arrayVoltage}</div>
                    <div className="h-2 w-2 mt-1 ml-2 rounded-full bg-green dark:bg-green-dark"></div>
                  </div>
                </div>
                <div id="ArrayCurrent">
                  <div>Array Current</div>
                  <div className="flex justify-center text-[#9C0534]">
                    <div>{fakeData.Unit1.Channel1.arrayCurrent}</div>
                    <div className="h-2 w-2 mt-1 ml-2 rounded-full bg-green dark:bg-green-dark"></div>
                  </div>
                </div>
                <div id="BatteryVoltage">
                  <div>Battery Voltage</div>
                  <div className="flex justify-center text-[#9C0534]">
                    <div>{fakeData.Unit1.Channel0.batteryVoltage}</div>
                    <div className="h-2 w-2 mt-1 ml-2 rounded-full bg-green dark:bg-green-dark"></div>
                  </div>
                </div>
                <div id="Temperature">
                  <div>Temperature</div>
                  <div className="flex justify-center text-[#9C0534]">
                    <div>{fakeData.Unit1.Channel0.temperature}</div>
                    <div className="h-2 w-2 mt-1 ml-2 rounded-full bg-green dark:bg-green-dark"></div>
                  </div>
                </div>
              </div>
              <div className="h-36 bg-slate-300 rounded-lg">
                Placeholder Graph
              </div>
            </div>
            <div id="Channel 1" className=" w-full -mt-5 pr-2">
              <div className="flex justify-center">
                <h2 className="font-medium">Channel 1</h2>
                <div className="h-3 w-3 mt-1.5 ml-2 rounded-full bg-green dark:bg-green-dark"></div>
              </div>
              <div className="flex text-xs justify-around ">
                <div id="ArrayVoltage">
                  <div>Array Voltage</div>
                  <div className="flex justify-center text-[#9C0534]">
                    <div>{fakeData.Unit1.Channel0.arrayVoltage}</div>
                    <div className="h-2 w-2 mt-1 ml-2 rounded-full bg-green dark:bg-green-dark"></div>
                  </div>
                </div>
                <div id="ArrayCurrent">
                  <div>Array Current</div>
                  <div className="flex justify-center text-[#9C0534]">
                    <div>{fakeData.Unit1.Channel1.arrayCurrent}</div>
                    <div className="h-2 w-2 mt-1 ml-2 rounded-full bg-green dark:bg-green-dark"></div>
                  </div>
                </div>
                <div id="BatteryVoltage">
                  <div>Battery Voltage</div>
                  <div className="flex justify-center text-[#9C0534]">
                    <div>{fakeData.Unit1.Channel0.batteryVoltage}</div>
                    <div className="h-2 w-2 mt-1 ml-2 rounded-full bg-green dark:bg-green-dark"></div>
                  </div>
                </div>
                <div id="Temperature">
                  <div>Temperature</div>
                  <div className="flex justify-center text-[#9C0534]">
                    <div>{fakeData.Unit1.Channel0.temperature}</div>
                    <div className="h-2 w-2 mt-1 ml-2 rounded-full bg-green dark:bg-green-dark"></div>
                  </div>
                </div>
              </div>
              <div className="h-36 bg-slate-200 rounded-lg">
                Placeholder Graph
              </div>
            </div>
          </div>
        </div>
        <div id="Unit 1" className="w-full">
          <h1 className="text-lg font-medium">Unit 1</h1>
          <div id="channels" className="flex justify-center">
            <div id="Channel 0" className=" w-full -mt-5 pr-2">
              <div className="flex justify-center">
                <h2 className="font-medium">Channel 0</h2>
                <div className="h-3 w-3 mt-1.5 ml-2 rounded-full bg-green dark:bg-green-dark"></div>
              </div>
              <div className="flex text-xs justify-around ">
                <div id="ArrayVoltage">
                  <div>Array Voltage</div>
                  <div className="flex justify-center text-[#9C0534]">
                    <div>{fakeData.Unit1.Channel0.arrayVoltage}</div>
                    <div className="h-2 w-2 mt-1 ml-2 rounded-full bg-green dark:bg-green-dark"></div>
                  </div>
                </div>
                <div id="ArrayCurrent">
                  <div>Array Current</div>
                  <div className="flex justify-center text-[#9C0534]">
                    <div>{fakeData.Unit1.Channel1.arrayCurrent}</div>
                    <div className="h-2 w-2 mt-1 ml-2 rounded-full bg-green dark:bg-green-dark"></div>
                  </div>
                </div>
                <div id="BatteryVoltage">
                  <div>Battery Voltage</div>
                  <div className="flex justify-center text-[#9C0534]">
                    <div>{fakeData.Unit1.Channel0.batteryVoltage}</div>
                    <div className="h-2 w-2 mt-1 ml-2 rounded-full bg-green dark:bg-green-dark"></div>
                  </div>
                </div>
                <div id="Temperature">
                  <div>Temperature</div>
                  <div className="flex justify-center text-[#9C0534]">
                    <div>{fakeData.Unit1.Channel0.temperature}</div>
                    <div className="h-2 w-2 mt-1 ml-2 rounded-full bg-green dark:bg-green-dark"></div>
                  </div>
                </div>
              </div>
              <div className="h-36 bg-slate-300 rounded-lg">
                Placeholder Graph
              </div>
            </div>
            <div id="Channel 1" className=" w-full -mt-5">
              <div className="flex justify-center">
                <h2 className="font-medium">Channel 1</h2>
                <div className="h-3 w-3 mt-1.5 ml-2 rounded-full bg-green dark:bg-green-dark"></div>
              </div>
              <div className="flex text-xs justify-around ">
                <div id="ArrayVoltage">
                  <div>Array Voltage</div>
                  <div className="flex justify-center text-[#9C0534]">
                    <div>{fakeData.Unit1.Channel0.arrayVoltage}</div>
                    <div className="h-2 w-2 mt-1 ml-2 rounded-full bg-green dark:bg-green-dark"></div>
                  </div>
                </div>
                <div id="ArrayCurrent">
                  <div>Array Current</div>
                  <div className="flex justify-center text-[#9C0534]">
                    <div>{fakeData.Unit1.Channel1.arrayCurrent}</div>
                    <div className="h-2 w-2 mt-1 ml-2 rounded-full bg-green dark:bg-green-dark"></div>
                  </div>
                </div>
                <div id="BatteryVoltage">
                  <div>Battery Voltage</div>
                  <div className="flex justify-center text-[#9C0534]">
                    <div>{fakeData.Unit1.Channel0.batteryVoltage}</div>
                    <div className="h-2 w-2 mt-1 ml-2 rounded-full bg-green dark:bg-green-dark"></div>
                  </div>
                </div>
                <div id="Temperature">
                  <div>Temperature</div>
                  <div className="flex justify-center text-[#9C0534]">
                    <div>{fakeData.Unit1.Channel0.temperature}</div>
                    <div className="h-2 w-2 mt-1 ml-2 rounded-full bg-green dark:bg-green-dark"></div>
                  </div>
                </div>
              </div>
              <div className="h-36 bg-slate-200 rounded-lg">
                Placeholder Graph
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MpptTab;
