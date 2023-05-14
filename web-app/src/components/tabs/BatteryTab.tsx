import React from "react";

function BatteryTab() {
  return (
    <>
      <div className="flex flex-col space-y-4">
        <div>
          <div className="flex flex-row w-full gap-6">
            <div className="basis-1/2">
              <div>
                <p className="text-s">
                  <strong>BMS Relay Status Flags</strong>
                </p>
              </div>
              <div className="flex gap-x-6">
                <div className="basis-1/2">
                  <p className="text-xs">
                    <small>Discharge Relay Enabled</small>
                  </p>
                  <p className="text-xs">
                    <small>Charge Relay Enabled</small>
                  </p>
                  <p className="text-xs text-gray">
                    <small>Charger Safety Enabled</small>
                  </p>
                  <p className="text-xs">
                    <small>Multipurpose Input Signal Status</small>
                  </p>
                </div>
                <div className="basis-1/2">
                  <p className="text-xs">
                    <small>Is Ready</small>
                  </p>
                  <p className="text-xs">
                    <small>Is Charging</small>
                  </p>
                  <p className="text-xs text-gray">
                    <small>Malfunction Indicator Active</small>
                  </p>
                  <p className="text-xs">
                    <small>Always On</small>
                  </p>
                </div>
              </div>
            </div>

            <div className="basis-1/2">
              <div>
                <p className="text-s">
                  <strong>Aux BMS</strong>
                </p>
              </div>
              <div className="flex gap-x-6">
                <div className="basis-1/3">
                  <p className="text-xs">
                    <small>Heartbeat</small>
                  </p>
                  <p className="text-xs text-gray">
                    <small>Strobe BMS</small>
                  </p>
                  <p className="text-xs">
                    <small>Allow Charge</small>
                  </p>
                  <p className="text-xs">
                    <small>Allow Discharge</small>
                  </p>
                </div>
                <div className="basis-1/3">
                  <p className="text-xs">
                    <small>High Voltage Enable</small>
                  </p>
                  <p className="text-xs">
                    <small>Orion CAN Received</small>
                  </p>
                  <p className="text-xs text-gray">
                    <small>Discharge Should Trip</small>
                  </p>
                  <p className="text-xs text-gray">
                    <small>Charge Should Trip</small>
                  </p>
                </div>
                <div className="basis-1/3">
                  <p className="text-xs text-gray">
                    <small>Charge Open but Should be Closed</small>
                  </p>
                  <p className="text-xs text-gray">
                    <small>Discharge Open but Should be Closed</small>
                  </p>
                  <div className="flex">
                    <div className="basis-1/2">
                      <p className="text-xs">
                        <small>Aux Voltage (V)</small>
                      </p>
                      <p className="text-xs">
                        <small>Pre-Charge State</small>
                      </p>
                    </div>
                    <div className="basis-1/2 text-center text-pink">
                      <p className="text-xs">
                        <small>13</small>
                      </p>
                      <p className="text-xs">
                        <small>All Engaged</small>
                      </p>
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
                <p className="text-s">
                  <strong>Temperature</strong>
                </p>
              </div>
              <div className="flex">
                <div className="basis-1/2">
                  <p className="text-xs">
                    <small>Temperature (˚C)</small>
                  </p>
                  <p className="text-xs">
                    <small>Average Temperature (˚C)</small>
                  </p>
                  <p className="text-xs">
                    <small>Thermistor</small>
                  </p>
                  <p className="text-xs">
                    <small>Internal Temperature (˚C)</small>
                  </p>
                </div>
                <div className="text-center basis-1/2 text-pink">
                  <p className="text-xs">
                    <small>25 - 19</small>
                  </p>
                  <p className="text-xs">
                    <small>21</small>
                  </p>
                  <p className="text-xs">
                    <small>3 - 1</small>
                  </p>
                  <p className="text-xs">
                    <small>25</small>
                  </p>
                </div>
              </div>
            </div>

            <div className="basis-1/4">
              <div>
                <p className="text-s">
                  <strong>Cell</strong>
                </p>
              </div>
              <div className="flex">
                <div className="basis-1/2">
                  <p className="text-xs">
                    <small>Cell Voltage (V) </small>
                  </p>
                  <p className="text-xs">
                    <small>Average Cell Voltage (V)</small>
                  </p>
                  <p className="text-xs">
                    <small>Cell Voltage (ID)</small>
                  </p>
                  <p className="text-xs">
                    <small>Populated Cells</small>
                  </p>
                </div>

                <div className="text-center basis-1/2 text-pink">
                  <p className="text-xs">
                    <small>3.639 - 3.647</small>
                  </p>
                  <p className="text-xs">
                    <small>3.643</small>
                  </p>
                  <p className="text-xs">
                    <small>28 - 1</small>
                  </p>
                  <p className="text-xs">
                    <small>30</small>
                  </p>
                </div>
              </div>
            </div>

            <div className="basis-1/4">
              <div>
                <p className="text-s">
                  <strong>Pack</strong>
                </p>
              </div>
              <div className="flex">
                <div className="basis-1/2">
                  <p className="text-xs">
                    <small>Pack Current (A) </small>
                  </p>
                  <p className="text-xs">
                    <small>Pack Amphours (Ah) </small>
                  </p>
                  <p className="text-xs">
                    <small>Pack Depth of Discharge(%)</small>
                  </p>
                  <p className="text-xs">
                    <small>Pack Voltage (V)</small>
                  </p>
                  <p className="text-xs">
                    <small>Pack State of Charger (%)</small>
                  </p>
                  <p className="text-xs">
                    <small>12V Input Voltage (V)</small>
                  </p>
                </div>

                <div className="text-center basis-1/2 text-pink">
                  <p className="text-xs">
                    <small>0.5</small>
                  </p>
                  <p className="text-xs">
                    <small>64.4</small>
                  </p>
                  <p className="text-xs">
                    <small>61</small>
                  </p>
                  <p className="text-xs">
                    <small>109.3</small>
                  </p>
                  <p className="text-xs">
                    <small>38.5</small>
                  </p>
                  <p className="text-xs">
                    <small>12.1</small>
                  </p>
                </div>
              </div>
            </div>

            <div className="basis-1/4">
              <div>
                <p className="text-s">
                  <strong>Fan</strong>
                </p>
              </div>
              <div className="flex">
                <div className="basis-1/2">
                  <p className="text-xs">
                    <small>Fan Voltage (V) </small>
                  </p>
                  <p className="text-xs">
                    <small>Fan Speed</small>
                  </p>
                  <p className="text-xs">
                    <small>Requested Fan Speed</small>
                  </p>
                </div>

                <div className="text-center basis-1/2 text-pink">
                  <p className="text-xs">
                    <small>0</small>
                  </p>
                  <p className="text-xs">
                    <small>0</small>
                  </p>
                  <p className="text-xs">
                    <small>0</small>
                  </p>
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
