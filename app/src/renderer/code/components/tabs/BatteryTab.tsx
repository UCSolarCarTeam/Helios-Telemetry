import React from "react";
import {
  AuxBMSInterface,
  BatteryProps,
  BMSRelayStatusFlagsInterface,
} from "../../objects/BatteryProps";

const fakeBMSRelayStatusFlags: BMSRelayStatusFlagsInterface = {
  DischargeRelayEnabled: true,
  ChargeRelayEnabled: true,
  ChargerSafetyEnabled: false,
  MalfunctionIndicatorActive: false,
  MultiPurposeInputSignalStatus: true,
  AlwaysOnSignalStatus: true,
  IsReadySignalStatus: true,
  IsChargingSignalStatus: true,
};

const fakeBatteryData: BatteryProps = {
  BMSRelayStatusFlags: fakeBMSRelayStatusFlags,
  PopulatedCells: 30,
  "12vInputVoltage": 12.1,
  FanVoltage: 0,
  PackCurrent: 0.5,
  PackVoltage: 109.3,
  PackStateofCharge: 38.5,
  PackAmphours: 64.4,
  PackDepthofDischarge: 61,
  HighTemperature: 25,
  HighThermistorId: 3,
  LowTemperature: 19,
  LowThermistorId: 1,
  AverageTemperature: 21,
  InternalTemperature: 1,
  FanSpeed: 0,
  RequestedFanSpeed: 0,
  LowCellVoltage: 3.639,
  LowCellVoltageId: 1,
  HighCellVoltage: 3.647,
  HighCellVoltageId: 28,
  AverageCellVoltage: 3.643,
};

const fakeAuxBMSData: AuxBMSInterface = {
  PrechargeState: "All Engaged",
  AuxVoltage: 13,
  AuxBmsAlive: true,
  StrobeBMSLight: false,
  AllowCharge: true,
  ContactorError: false,
  HighVoltageEnable: true,
  ChargeTripDueToHighCellVoltage: false,
  ChargeTripDueToHighTemperatureAndCurrent: true,
  ChargeTripDueToPackCurrent: false,
  DischargeTripDueToLowCellVoltage: false,
  DischargeTripDueToHighTemperatureAndCurrent: true,
  DischargeTripDueToPackCurrent: false,
  ProtectionTrip: true,
};

function BatteryTab() {
  return (
    <>
      <div className="flex flex-col space-y-3">
        <div className="flex flex-row w-full gap-6">
          <div className="basis-1/3">
            <div>
              <p className="text-s font-bold pt-3">BMS Relay Status Flags</p>
            </div>
            <div className="flex gap-x-6">
              <div className="basis-1/2">
                <p
                  className={`text-xxs ${
                    fakeBatteryData["BMSRelayStatusFlags"][
                      "DischargeRelayEnabled"
                    ]
                      ? "text-black"
                      : "text-gray"
                  }`}
                >
                  Discharge Relay Enabled
                </p>
                <p
                  className={`text-xxs ${
                    fakeBatteryData["BMSRelayStatusFlags"]["ChargeRelayEnabled"]
                      ? "text-black"
                      : "text-gray"
                  }`}
                >
                  Charge Relay Enabled
                </p>
                <p
                  className={`text-xxs ${
                    fakeBatteryData["BMSRelayStatusFlags"][
                      "ChargerSafetyEnabled"
                    ]
                      ? "text-black"
                      : "text-gray"
                  }`}
                >
                  Charger Safety Enabled
                </p>
                <p
                  className={`text-xxs ${
                    fakeBatteryData["BMSRelayStatusFlags"][
                      "MultiPurposeInputSignalStatus"
                    ]
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
                    fakeBatteryData["BMSRelayStatusFlags"][
                      "IsReadySignalStatus"
                    ]
                      ? "text-black"
                      : "text-gray"
                  }`}
                >
                  Is Ready
                </p>
                <p
                  className={`text-xxs ${
                    fakeBatteryData["BMSRelayStatusFlags"][
                      "IsChargingSignalStatus"
                    ]
                      ? "text-black"
                      : "text-gray"
                  }`}
                >
                  Is Charging
                </p>
                <p
                  className={`text-xxs ${
                    fakeBatteryData["BMSRelayStatusFlags"][
                      "MalfunctionIndicatorActive"
                    ]
                      ? "text-black"
                      : "text-gray"
                  }`}
                >
                  Malfunction Indicator Active
                </p>
                <p
                  className={`text-xxs ${
                    fakeBatteryData["BMSRelayStatusFlags"][
                      "AlwaysOnSignalStatus"
                    ]
                      ? "text-black"
                      : "text-gray"
                  }`}
                >
                  Always On
                </p>
              </div>
            </div>
          </div>

          <div className="basis-2/3">
            <div>
              <p className="text-s font-bold pt-3">Aux BMS</p>
            </div>
            <div className="flex gap-x-6">
              <div className="basis-1/6">
                <p
                  className={`text-xxs ${
                    fakeAuxBMSData["AuxBmsAlive"] ? "text-black" : "text-gray"
                  }`}
                >
                  Aux BMS Alive
                </p>
                <p
                  className={`text-xxs ${
                    fakeAuxBMSData["StrobeBMSLight"]
                      ? "text-black"
                      : "text-gray"
                  }`}
                >
                  Strobe BMS Light
                </p>
                <p
                  className={`text-xxs ${
                    fakeAuxBMSData["AllowCharge"] ? "text-black" : "text-gray"
                  }`}
                >
                  Allow Charge
                </p>
                <p
                  className={`text-xxs ${
                    fakeAuxBMSData["ContactorError"]
                      ? "text-black"
                      : "text-gray"
                  }`}
                >
                  Contactor Error
                </p>
              </div>
              <div className="basis-2/6">
                <p
                  className={`text-xxs ${
                    fakeAuxBMSData["ChargeTripDueToHighCellVoltage"]
                      ? "text-black"
                      : "text-gray"
                  }`}
                >
                  Charge Trip Due To High Cell Voltage
                </p>
                <p
                  className={`text-xxs ${
                    fakeAuxBMSData["ChargeTripDueToHighTemperatureAndCurrent"]
                      ? "text-black"
                      : "text-gray"
                  }`}
                >
                  Charge Trip Due To High Temp & Current
                </p>
                <p
                  className={`text-xxs ${
                    fakeAuxBMSData["ChargeTripDueToPackCurrent"]
                      ? "text-black"
                      : "text-gray"
                  }`}
                >
                  Charge Trip Due To Pack Current
                </p>
                <p
                  className={`text-xxs ${
                    fakeAuxBMSData["DischargeTripDueToLowCellVoltage"]
                      ? "text-black"
                      : "text-gray"
                  }`}
                >
                  Discharge Trip Due To Low Cell Voltage
                </p>
              </div>
              <div className="basis-2/6">
                <p
                  className={`text-xxs ${
                    fakeAuxBMSData[
                      "DischargeTripDueToHighTemperatureAndCurrent"
                    ]
                      ? "text-black"
                      : "text-gray"
                  }`}
                >
                  Discharge Trip Due To High Temp & Current
                </p>
                <p
                  className={`text-xxs ${
                    fakeAuxBMSData["DischargeTripDueToPackCurrent"]
                      ? "text-black"
                      : "text-gray"
                  }`}
                >
                  Discharge Trip Due To Pack Current
                </p>
                <p
                  className={`text-xxs ${
                    fakeAuxBMSData["ProtectionTrip"]
                      ? "text-black"
                      : "text-gray"
                  }`}
                >
                  Protection Trip
                </p>
                <p
                  className={`text-xxs ${
                    fakeAuxBMSData["HighVoltageEnable"]
                      ? "text-black"
                      : "text-gray"
                  }`}
                >
                  High Voltage Enable
                </p>
              </div>
              <div className="basis-2/6">
                <div className="flex">
                  <div className="basis-1/2">
                    <p className="text-xxs">Aux Voltage</p>
                    <p className="text-xxs">Pre-Charge State</p>
                  </div>
                  <div className="basis-1/2 text-center text-pink">
                    <p className="text-xxs">{fakeAuxBMSData["AuxVoltage"]}V</p>
                    <p className="text-xxs">
                      {fakeAuxBMSData["PrechargeState"]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row">
          <div className="basis-1/4">
            <div>
              <p className="text-s font-bold">Temperature</p>
            </div>
            <div className="flex">
              <div className="basis-1/2">
                <p className="text-xxs">Temperature</p>
                <p className="text-xxs">Average Temperature</p>
                <p className="text-xxs">Thermistor</p>
                <p className="text-xxs">Internal Temperature</p>
              </div>
              <div className="text-center basis-1/2 text-pink">
                <p className="text-xxs">
                  {fakeBatteryData["LowTemperature"]}˚C -{" "}
                  {fakeBatteryData["HighTemperature"]}˚C
                </p>
                <p className="text-xxs">
                  {fakeBatteryData["AverageTemperature"]}˚C
                </p>
                <p className="text-xxs">
                  {fakeBatteryData["LowThermistorId"]} -{" "}
                  {fakeBatteryData["HighThermistorId"]}
                </p>
                <p className="text-xxs">
                  {fakeBatteryData["InternalTemperature"]}˚C
                </p>
              </div>
            </div>
          </div>

          <div className="basis-1/4">
            <div>
              <p className="text-s font-bold">Cell</p>
            </div>
            <div className="flex">
              <div className="basis-1/2">
                <p className="text-xxs">Cell Voltage</p>
                <p className="text-xxs">Average Cell Voltage</p>
                <p className="text-xxs">Cell Voltage (ID)</p>
                <p className="text-xxs">Populated Cells</p>
              </div>

              <div className="text-center basis-1/2 text-pink">
                <p className="text-xxs">
                  {fakeBatteryData["LowCellVoltage"]}V -{" "}
                  {fakeBatteryData["HighCellVoltage"]}V
                </p>
                <p className="text-xxs">
                  {fakeBatteryData["AverageCellVoltage"]}V
                </p>
                <p className="text-xxs">
                  {fakeBatteryData["LowCellVoltageId"]} -{" "}
                  {fakeBatteryData["HighCellVoltageId"]}
                </p>
                <p className="text-xxs">{fakeBatteryData["PopulatedCells"]}</p>
              </div>
            </div>
          </div>

          <div className="basis-1/4">
            <div>
              <p className="text-s font-bold">Pack</p>
            </div>
            <div className="flex">
              <div className="basis-1/2">
                <p className="text-xxs">Pack Current</p>
                <p className="text-xxs">Pack Amphours</p>
                <p className="text-xxs">Pack Depth of Discharge</p>
                <p className="text-xxs">Pack Voltage</p>
                <p className="text-xxs">Pack State of Charger</p>
                <p className="text-xxs">12V Input Voltage</p>
              </div>

              <div className="text-center basis-1/2 text-pink">
                <p className="text-xxs">{fakeBatteryData["PackCurrent"]}A</p>
                <p className="text-xxs">{fakeBatteryData["PackAmphours"]}Ah</p>
                <p className="text-xxs">
                  {fakeBatteryData["PackDepthofDischarge"]}%
                </p>
                <p className="text-xxs">{fakeBatteryData["PackVoltage"]}V</p>
                <p className="text-xxs">
                  {fakeBatteryData["PackStateofCharge"]}%
                </p>
                <p className="text-xxs">
                  {fakeBatteryData["12vInputVoltage"]}V
                </p>
              </div>
            </div>
          </div>

          <div className="basis-1/4">
            <div>
              <p className="text-s font-bold">Fan</p>
            </div>
            <div className="flex">
              <div className="basis-1/2">
                <p className="text-xxs">Fan Voltage</p>
                <p className="text-xxs">Fan Speed</p>
                <p className="text-xxs">Requested Fan Speed</p>
              </div>

              <div className="text-center basis-1/2 text-pink">
                <p className="text-xxs">{fakeBatteryData["FanVoltage"]}V</p>
                <p className="text-xxs">{fakeBatteryData["FanSpeed"]}</p>
                <p className="text-xxs">
                  {fakeBatteryData["RequestedFanSpeed"]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BatteryTab;