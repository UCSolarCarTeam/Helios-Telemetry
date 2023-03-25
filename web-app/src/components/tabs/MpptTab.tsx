import React from "react";

const fakeData = {
  Unit0: {
    Channel0: {
      arrayVoltage: 42.0,
      arrayCurrent: 69.0,
      batteryVoltage: 42.0,
      temperature: 23.0,
    },
    Channel1: {
      arrayVoltage: 42.0,
      arrayCurrent: 69.0,
      batteryVoltage: 42.0,
      temperature: 23.0,
    },
  },
  Unit1: {
    Channel0: {
      arrayVoltage: 42.0,
      arrayCurrent: 69.0,
      batteryVoltage: 42.0,
      temperature: 23.0,
    },
    Channel1: {
      arrayVoltage: 42.0,
      arrayCurrent: 69.0,
      batteryVoltage: 42.0,
      temperature: 23.0,
    },
  },
};

function MpptTab() {
  return (
    <>
      <div className="flex flex-nowrap justify-evenly text-center h-full">
        <div id="Unit 0">
          Unit 0<div id="Channel 0">Channel 0</div>
          <div className="flex">
            <div>
              <div>Array Voltage</div>
              <div className="text-[#9C0534]">
                {fakeData.Unit1.Channel0.arrayVoltage}
              </div>
            </div>
            <div>
              <div>Array Current</div>
              <div className="text-[#9C0534]">
                {fakeData.Unit1.Channel1.arrayCurrent}
              </div>
            </div>
            <div>
              <div>Battery Voltage</div>
              <div className="text-[#9C0534]">
                {fakeData.Unit1.Channel1.batteryVoltage}
              </div>
            </div>
            <div>
              <div>Temperature</div>
              <div className="text-[#9C0534]">
                {fakeData.Unit1.Channel1.temperature}
              </div>
            </div>
          </div>
          <div>Channel 1</div>
          <div className="flex">
            <div>
              <div>Array Voltage</div>
              <div className="text-[#9C0534]">
                {fakeData.Unit1.Channel0.arrayVoltage}
              </div>
            </div>
            <div>
              <div>Array Current</div>
              <div className="text-[#9C0534]">
                {fakeData.Unit1.Channel1.arrayCurrent}
              </div>
            </div>
            <div>
              <div>Battery Voltage</div>
              <div className="text-[#9C0534]">
                {fakeData.Unit1.Channel1.batteryVoltage}
              </div>
            </div>
            <div>
              <div>Temperature</div>
              <div className="text-[#9C0534]">
                {fakeData.Unit1.Channel1.temperature}
              </div>
            </div>
          </div>
        </div>

        <div id="Unit 1">
          Unit 1
          <div id="Channel 0">
            <div>Channel 0</div>
            <div id="ArrayVoltage">
              <div>Array Voltage</div>
              <div className="text-[#9C0534]">
                {fakeData.Unit1.Channel0.arrayVoltage}
              </div>
            </div>
            <div id="ArrayCurrent">
              <div>Array Current</div>
              <div className="text-[#9C0534]">
                {fakeData.Unit1.Channel1.arrayCurrent}
              </div>
            </div>
            <div id="BatteryVoltage">
              <div>Battery Voltage</div>
              <div className="text-[#9C0534]">
                {fakeData.Unit1.Channel1.batteryVoltage}
              </div>
            </div>
            <div id="Temperature">
              <div>Temperature</div>
              <div className="text-[#9C0534]">
                {fakeData.Unit1.Channel1.temperature}
              </div>
            </div>
          </div>
          <div id="Channel 1">
            <div>Channel 1</div>
            <div className="flex">
              <div>
                <div>Array Voltage</div>
                <div className="text-[#9C0534]">
                  {fakeData.Unit1.Channel0.arrayVoltage}
                </div>
              </div>
              <div>
                <div>Array Current</div>
                <div className="text-[#9C0534]">
                  {fakeData.Unit1.Channel1.arrayCurrent}
                </div>
              </div>
              <div>
                <div>Battery Voltage</div>
                <div className="text-[#9C0534]">
                  {fakeData.Unit1.Channel1.batteryVoltage}
                </div>
              </div>
              <div>
                <div>Temperature</div>
                <div className="text-[#9C0534]">
                  {fakeData.Unit1.Channel1.temperature}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MpptTab;
