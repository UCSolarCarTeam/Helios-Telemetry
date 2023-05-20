import React from "react";

const fakeData = {
  "Discharge Relay": "ON",
  "Charge Relay": "ON",
  "Charger Safety": "OFF",
  "Multipurpose Input Signal Status": "ON",

  "Is Ready": "ON",
  "Is Charging": "ON",
  "Malfunction Indicator Active": "OFF",
  "Always On": "ON",

  Heartbeat: "ON",
  "Strobe BMS": "OFF",
  "Allow Charge": "ON",
  "Allow Discharge": "ON",

  "High Voltage": "ON",
  "Orion CAN Received": "ON",
  "Discharge Should Trip": "OFF",
  "Charge Should Trip": "OFF",

  "Charge Open but Should be Closed": "OFF",
  "Discharge Open but Should be Closed": "OFF",

  "Low Temp": 19,
  "High Temp": 25,
  "Average Temp": 21,
  "High Thermistor": 3,
  "Low Thermistor": 1,
  "Internal Temp": 1,

  "Low Cell Voltage": 3.639,
  "High Cell Voltage": 3.647,
  "Average Cell Voltage": 3.643,
  "Low Cell Voltage (ID)": 28,
  "High Cell Voltage (ID)": 1,
  "Populated Cells": 30,

  "Pack Current": 0.5,
  "Pack Amphours": 64.4,
  "Pack Depth of Discharge": 61,
  "Pack Voltage": 109.3,
  "Pack State of Charge": 38.5,
  "12V Input Voltage": 12.1,

  "Fan Voltage": 0,
  "Fan Speed": 0,
  "Requested Fan Speed": 0,

  "Aux Voltage": 13,
  "Pre-Charge State": "All Engaged",
};

function BatteryTab() {
  return (
    <>
      <div className="flex flex-col space-y-4">
        <div>
          <div className="flex flex-row w-full gap-6">
            <div className="basis-1/2">
              <div>
                <p className="text-s font-bold">BMS Relay Status Flags</p>
              </div>
              <div className="flex gap-x-6">
                <div className="basis-1/2">
                  <p
                    className={`text-xxs ${
                      fakeData["Discharge Relay"] == "ON"
                        ? "text-black"
                        : "text-gray"
                    }`}
                  >
                    Discharge Relay Enabled
                  </p>
                  <p
                    className={`text-xxs ${
                      fakeData["Charge Relay"] == "ON"
                        ? "text-black"
                        : "text-gray"
                    }`}
                  >
                    Charge Relay Enabled
                  </p>
                  <p
                    className={`text-xxs ${
                      fakeData["Charger Safety"] == "ON"
                        ? "text-black"
                        : "text-gray"
                    }`}
                  >
                    Charger Safety Enabled
                  </p>
                  <p
                    className={`text-xxs ${
                      fakeData["Multipurpose Input Signal Status"] == "ON"
                        ? "text-black"
                        : "text-gray"
                    }`}
                  >
                    Multipurpose Input Signal Status
                  </p>
                </div>
                <div className="basis-1/2">
                  <p
                    className={`text-xxs ${
                      fakeData["Is Ready"] == "ON" ? "text-black" : "text-gray"
                    }`}
                  >
                    Is Ready
                  </p>
                  <p
                    className={`text-xxs ${
                      fakeData["Is Charging"] == "ON"
                        ? "text-black"
                        : "text-gray"
                    }`}
                  >
                    Is Charging
                  </p>
                  <p
                    className={`text-xxs ${
                      fakeData["Malfunction Indicator Active"] == "ON"
                        ? "text-black"
                        : "text-gray"
                    }`}
                  >
                    Malfunction Indicator Active
                  </p>
                  <p
                    className={`text-xxs ${
                      fakeData["Always On"] == "ON" ? "text-black" : "text-gray"
                    }`}
                  >
                    Always On
                  </p>
                </div>
              </div>
            </div>

            <div className="basis-1/2">
              <div>
                <p className="text-s font-bold">Aux BMS</p>
              </div>
              <div className="flex gap-x-6">
                <div className="basis-1/3">
                  <p
                    className={`text-xxs ${
                      fakeData["Heartbeat"] == "ON" ? "text-black" : "text-gray"
                    }`}
                  >
                    Heartbeat
                  </p>
                  <p
                    className={`text-xxs ${
                      fakeData["Strobe BMS"] == "ON"
                        ? "text-black"
                        : "text-gray"
                    }`}
                  >
                    Strobe BMS
                  </p>
                  <p
                    className={`text-xxs ${
                      fakeData["Allow Charge"] == "ON"
                        ? "text-black"
                        : "text-gray"
                    }`}
                  >
                    Allow Charge
                  </p>
                  <p
                    className={`text-xxs ${
                      fakeData["Allow Discharge"] == "ON"
                        ? "text-black"
                        : "text-gray"
                    }`}
                  >
                    Allow Discharge
                  </p>
                </div>
                <div className="basis-1/3">
                  <p
                    className={`text-xxs ${
                      fakeData["High Voltage"] == "ON"
                        ? "text-black"
                        : "text-gray"
                    }`}
                  >
                    High Voltage Enable
                  </p>
                  <p
                    className={`text-xxs ${
                      fakeData["Orion CAN Received"] == "ON"
                        ? "text-black"
                        : "text-gray"
                    }`}
                  >
                    Orion CAN Received
                  </p>
                  <p
                    className={`text-xxs ${
                      fakeData["Discharge Should Trip"] == "ON"
                        ? "text-black"
                        : "text-gray"
                    }`}
                  >
                    Discharge Should Trip
                  </p>
                  <p
                    className={`text-xxs ${
                      fakeData["Charge Should Trip"] == "ON"
                        ? "text-black"
                        : "text-gray"
                    }`}
                  >
                    Charge Should Trip
                  </p>
                </div>
                <div className="basis-1/3">
                  <p
                    className={`text-xxs ${
                      fakeData["Charge Open but Should be Closed"] == "ON"
                        ? "text-black"
                        : "text-gray"
                    }`}
                  >
                    Charge Open but Should be Closed
                  </p>
                  <p
                    className={`text-xxs ${
                      fakeData["Discharge Open but Should be Closed"] == "ON"
                        ? "text-black"
                        : "text-gray"
                    }`}
                  >
                    Discharge Open but Should be Closed
                  </p>
                  <div className="flex">
                    <div className="basis-1/2">
                      <p className="text-xxs">Aux Voltage (V)</p>
                      <p className="text-xxs">Pre-Charge State</p>
                    </div>
                    <div className="basis-1/2 text-center text-pink">
                      <p className="text-xxs">{fakeData["Aux Voltage"]}</p>
                      <p className="text-xxs">{fakeData["Pre-Charge State"]}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-row">
            <div className="basis-1/4">
              <div>
                <p className="text-s font-bold">Temperature</p>
              </div>
              <div className="flex">
                <div className="basis-1/2">
                  <p className="text-xxs">Temperature (˚C)</p>
                  <p className="text-xxs">Average Temperature (˚C)</p>
                  <p className="text-xxs">Thermistor</p>
                  <p className="text-xxs">Internal Temperature (˚C)</p>
                </div>
                <div className="text-center basis-1/2 text-pink">
                  <p className="text-xxs">
                    {fakeData["Low Temp"]} - {fakeData["High Temp"]}
                  </p>
                  <p className="text-xxs">{fakeData["Average Temp"]}</p>
                  <p className="text-xxs">
                    {fakeData["Low Thermistor"]} - {fakeData["High Thermistor"]}
                  </p>
                  <p className="text-xxs">{fakeData["Internal Temp"]}</p>
                </div>
              </div>
            </div>

            <div className="basis-1/4">
              <div>
                <p className="text-s font-bold">Cell</p>
              </div>
              <div className="flex">
                <div className="basis-1/2">
                  <p className="text-xxs">Cell Voltage (V)</p>
                  <p className="text-xxs">Average Cell Voltage (V)</p>
                  <p className="text-xxs">Cell Voltage (ID)</p>
                  <p className="text-xxs">Populated Cells</p>
                </div>

                <div className="text-center basis-1/2 text-pink">
                  <p className="text-xxs">
                    {fakeData["Low Cell Voltage"]} -{" "}
                    {fakeData["High Cell Voltage"]}
                  </p>
                  <p className="text-xxs">{fakeData["Average Cell Voltage"]}</p>
                  <p className="text-xxs">
                    {fakeData["Low Cell Voltage (ID)"]} -{" "}
                    {fakeData["High Cell Voltage (ID)"]}
                  </p>
                  <p className="text-xxs">{fakeData["Populated Cells"]}</p>
                </div>
              </div>
            </div>

            <div className="basis-1/4">
              <div>
                <p className="text-s font-bold">Pack</p>
              </div>
              <div className="flex">
                <div className="basis-1/2">
                  <p className="text-xxs">Pack Current (A)</p>
                  <p className="text-xxs">Pack Amphours (Ah)</p>
                  <p className="text-xxs">Pack Depth of Discharge(%)</p>
                  <p className="text-xxs">Pack Voltage (V)</p>
                  <p className="text-xxs">Pack State of Charger (%)</p>
                  <p className="text-xxs">12V Input Voltage (V)</p>
                </div>

                <div className="text-center basis-1/2 text-pink">
                  <p className="text-xxs">{fakeData["Pack Current"]}</p>
                  <p className="text-xxs">{fakeData["Pack Amphours"]}</p>
                  <p className="text-xxs">
                    {fakeData["Pack Depth of Discharge"]}
                  </p>
                  <p className="text-xxs">{fakeData["Pack Voltage"]}</p>
                  <p className="text-xxs">{fakeData["Pack State of Charge"]}</p>
                  <p className="text-xxs">{fakeData["12V Input Voltage"]}</p>
                </div>
              </div>
            </div>

            <div className="basis-1/4">
              <div>
                <p className="text-s font-bold">Fan</p>
              </div>
              <div className="flex">
                <div className="basis-1/2">
                  <p className="text-xxs">Fan Voltage (V)</p>
                  <p className="text-xxs">Fan Speed</p>
                  <p className="text-xxs">Requested Fan Speed</p>
                </div>

                <div className="text-center basis-1/2 text-pink">
                  <p className="text-xxs">{fakeData["Fan Voltage"]}</p>
                  <p className="text-xxs">{fakeData["Fan Speed"]}</p>
                  <p className="text-xxs">{fakeData["Requested Fan Speed"]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BatteryTab;
