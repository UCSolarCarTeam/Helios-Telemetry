import { faker } from "@faker-js/faker";

import { type MpptData } from "../../objects/MpptProps";
import MpptComponent from "../molecules/HeroMolecules/MpptTabMolecules/MpptComponent";

const fakeData: MpptData = {
  Unit0: {
    Channel0: {
      arrayVoltage: faker.number.int({ min: 0.0, max: 100.0 }).toString() + "V",
      arrayCurrent: faker.number.int({ min: 0.0, max: 100.0 }).toString() + "C",
      batteryVoltage:
        faker.number.int({ min: 0.0, max: 100.0 }).toString() + "V",
      temperature: faker.number.int({ min: 22.0, max: 100.0 }).toString() + "C",
    },
    Channel1: {
      arrayVoltage: faker.number.int({ min: 0.0, max: 100.0 }).toString() + "V",
      arrayCurrent: faker.number.int({ min: 0.0, max: 100.0 }).toString() + "C",
      batteryVoltage:
        faker.number.int({ min: 0.0, max: 100.0 }).toString() + "V",
      temperature: faker.number.int({ min: 22.0, max: 100.0 }).toString() + "C",
    },
  },
  Unit1: {
    Channel0: {
      arrayVoltage: faker.number.int({ min: 0.0, max: 100.0 }).toString() + "V",
      arrayCurrent: faker.number.int({ min: 0.0, max: 100.0 }).toString() + "C",
      batteryVoltage:
        faker.number.int({ min: 0.0, max: 100.0 }).toString() + "V",
      temperature: faker.number.int({ min: 22.0, max: 100.0 }).toString() + "C",
    },
    Channel1: {
      arrayVoltage: faker.number.int({ min: 0.0, max: 100.0 }).toString() + "V",
      arrayCurrent: faker.number.int({ min: 0.0, max: 100.0 }).toString() + "C",
      batteryVoltage:
        faker.number.int({ min: 0.0, max: 100.0 }).toString() + "V",
      temperature: faker.number.int({ min: 22.0, max: 100.0 }).toString() + "C",
    },
  },
};

function MpptTab() {
  return (
    <>
      <div className="flex h-full flex-nowrap justify-evenly text-center">
        <div id="Unit 0" className="w-full ">
          <h1 className="text-lg font-medium">Unit 0</h1>
          <div id="channels" className="flex justify-center">
            <div id="Channel 0" className=" w-full pr-2">
              <div className="flex justify-center">
                <h2 className="font-medium">Channel 0</h2>
                <div className="ml-2 mt-1.5 size-3 rounded-full bg-green dark:bg-green-dark"></div>
              </div>
              <MpptComponent channelData={fakeData.Unit0.Channel0} />
              <div className="h-36 rounded-lg bg-slate-300">
                Placeholder Graph
              </div>
            </div>
            <div id="Channel 1" className=" w-full pr-2">
              <div className="flex justify-center">
                <h2 className="font-medium">Channel 1</h2>
                <div className="ml-2 mt-1.5 size-3 rounded-full bg-green dark:bg-green-dark"></div>
              </div>
              <MpptComponent channelData={fakeData.Unit0.Channel1} />
              <div className="h-36 rounded-lg bg-slate-200">
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
                <div className="ml-2 mt-1.5 size-3 rounded-full bg-green dark:bg-green-dark"></div>
              </div>
              <MpptComponent channelData={fakeData.Unit1.Channel0} />
              <div className="h-36 rounded-lg bg-slate-300">
                Placeholder Graph
              </div>
            </div>
            <div id="Channel 1" className=" w-full">
              <div className="flex justify-center">
                <h2 className="font-medium">Channel 1</h2>
                <div className="ml-2 mt-1.5 size-3 rounded-full bg-green dark:bg-green-dark"></div>
              </div>
              <MpptComponent channelData={fakeData.Unit1.Channel1} />
              <div className="h-36 rounded-lg bg-slate-200">
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
