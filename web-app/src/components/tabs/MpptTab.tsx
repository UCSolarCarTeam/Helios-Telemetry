import React, { useState } from "react";
import { faker } from "@faker-js/faker";
import MpptComponent from "../molecules/HeroMolecules/MpptTabMolecules/MpptComponent";
import { MpptData } from "../../objects/MpptProps";

const fakeData: MpptData = {
  Unit0: {
    Channel0: {
      arrayVoltage:
        faker.datatype.number({ min: 0.0, max: 100.0, precision: 0.01 }) + "V",
      arrayCurrent:
        faker.datatype.number({ min: 0.0, max: 100.0, precision: 0.01 }) + "C",
      batteryVoltage:
        faker.datatype.number({ min: 0.0, max: 100.0, precision: 0.01 }) + "V",
      temperature:
        faker.datatype.number({ min: 22.0, max: 100.0, precision: 0.01 }) + "C",
    },
    Channel1: {
      arrayVoltage:
        faker.datatype.number({ min: 0.0, max: 100.0, precision: 0.01 }) + "V",
      arrayCurrent:
        faker.datatype.number({ min: 0.0, max: 100.0, precision: 0.01 }) + "C",
      batteryVoltage:
        faker.datatype.number({ min: 0.0, max: 100.0, precision: 0.01 }) + "V",
      temperature:
        faker.datatype.number({ min: 22.0, max: 100.0, precision: 0.01 }) + "C",
    },
  },
  Unit1: {
    Channel0: {
      arrayVoltage:
        faker.datatype.number({ min: 0.0, max: 100.0, precision: 0.01 }) + "V",
      arrayCurrent:
        faker.datatype.number({ min: 0.0, max: 100.0, precision: 0.01 }) + "C",
      batteryVoltage:
        faker.datatype.number({ min: 0.0, max: 100.0, precision: 0.01 }) + "V",
      temperature:
        faker.datatype.number({ min: 22.0, max: 100.0, precision: 0.01 }) + "C",
    },
    Channel1: {
      arrayVoltage:
        faker.datatype.number({ min: 0.0, max: 100.0, precision: 0.01 }) + "V",
      arrayCurrent:
        faker.datatype.number({ min: 0.0, max: 100.0, precision: 0.01 }) + "C",
      batteryVoltage:
        faker.datatype.number({ min: 0.0, max: 100.0, precision: 0.01 }) + "V",
      temperature:
        faker.datatype.number({ min: 22.0, max: 100.0, precision: 0.01 }) + "C",
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
            <div id="Channel 0" className=" w-full pr-2">
              <div className="flex justify-center">
                <h2 className="font-medium">Channel 0</h2>
                <div className="h-3 w-3 mt-1.5 ml-2 rounded-full bg-green dark:bg-green-dark"></div>
              </div>
              <MpptComponent channelData={fakeData.Unit0.Channel0} />
              <div className="h-36 bg-slate-300 rounded-lg">
                Placeholder Graph
              </div>
            </div>
            <div id="Channel 1" className=" w-full pr-2">
              <div className="flex justify-center">
                <h2 className="font-medium">Channel 1</h2>
                <div className="h-3 w-3 mt-1.5 ml-2 rounded-full bg-green dark:bg-green-dark"></div>
              </div>
              <MpptComponent channelData={fakeData.Unit0.Channel1} />
              <div className="h-36 bg-slate-200 rounded-lg">
                Placeholder Graph
              </div>
            </div>
          </div>
        </div>
        <div id="Unit 1" className="w-full">
          <h1 className="text-lg font-medium">Unit 1</h1>
          <div id="channels" className="flex justify-center">
            <div id="Channel 0" className=" w-full pr-2">
              <div className="flex justify-center">
                <h2 className="font-medium">Channel 0</h2>
                <div className="h-3 w-3 mt-1.5 ml-2 rounded-full bg-green dark:bg-green-dark"></div>
              </div>
              <MpptComponent channelData={fakeData.Unit1.Channel0} />
              <div className="h-36 bg-slate-300 rounded-lg">
                Placeholder Graph
              </div>
            </div>
            <div id="Channel 1" className=" w-full">
              <div className="flex justify-center">
                <h2 className="font-medium">Channel 1</h2>
                <div className="h-3 w-3 mt-1.5 ml-2 rounded-full bg-green dark:bg-green-dark"></div>
              </div>
              <MpptComponent channelData={fakeData.Unit1.Channel1} />
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
