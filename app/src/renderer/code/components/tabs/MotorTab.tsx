import React, { PureComponent } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { faker } from "@faker-js/faker";

import { usePacket } from "../../contexts/PacketContext";
import type {
  IKeyMotor,
  IMotorDetail,
} from "../../objects/telemetry-data.interface";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
// TO DO Remove this code
const fakeKeyMotor0Data: IKeyMotor = {
  Alive: faker.datatype.boolean(),
  SetCurrent: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  SetVelocity: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  BusCurrent: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  BusVoltage: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  VehicleVelocity: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
};
const fakeMotor0DetailsData: IMotorDetail = {
  PhaseCCurrent: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  PhaseBCurrent: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  MotorVoltageReal: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  MotorVoltageImaginary: faker.number.float({
    min: 0,
    max: 100,
    precision: 0.01,
  }),
  MotorCurrentReal: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  MotorCurrentImaginary: faker.number.float({
    min: 0,
    max: 100,
    precision: 0.01,
  }),
  BackEmf: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  VoltageRail15VSupply: faker.number.float({
    min: 0,
    max: 100,
    precision: 0.01,
  }),
  VoltageRail3VSupply: faker.number.float({
    min: 0,
    max: 100,
    precision: 0.01,
  }),
  VoltageRail1VSupply: faker.number.float({
    min: 0,
    max: 100,
    precision: 0.01,
  }),
  HeatSinkTemp: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  MotorTemp: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  DspBoardTemp: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  DcBusAmpHours: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  Odometer: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  SlipSpeed: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
};
const fakeKeyMotor1Data: IKeyMotor = {
  Alive: faker.datatype.boolean(),
  SetCurrent: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  SetVelocity: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  BusCurrent: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  BusVoltage: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  VehicleVelocity: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
};
const fakeMotor1DetailsData: IMotorDetail = {
  PhaseCCurrent: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  PhaseBCurrent: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  MotorVoltageReal: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  MotorVoltageImaginary: faker.number.float({
    min: 0,
    max: 100,
    precision: 0.01,
  }),
  MotorCurrentReal: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  MotorCurrentImaginary: faker.number.float({
    min: 0,
    max: 100,
    precision: 0.01,
  }),
  BackEmf: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  VoltageRail15VSupply: faker.number.float({
    min: 0,
    max: 100,
    precision: 0.01,
  }),
  VoltageRail3VSupply: faker.number.float({
    min: 0,
    max: 100,
    precision: 0.01,
  }),
  VoltageRail1VSupply: faker.number.float({
    min: 0,
    max: 100,
    precision: 0.01,
  }),
  HeatSinkTemp: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  MotorTemp: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  DspBoardTemp: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  DcBusAmpHours: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  Odometer: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  SlipSpeed: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
};
const fakeData = {
  Motor0: {
    KeyMotor: fakeKeyMotor0Data,
    MotorDetail: fakeMotor0DetailsData,
  },
  Motor1: {
    KeyMotor: fakeKeyMotor1Data,
    MotorDetail: fakeMotor1DetailsData,
  },
};
// END OF TO DO

function MotorTab(): JSX.Element {
  const { currentPacket } = usePacket();
  return (
    <>
      {/* I see 2 containers  */}
      <div className="flex flex-row justify-between">
        <div className="flex w-1/2 flex-col">
          {/* add 2 columns in each details container instead of justify-between. 
          define the width to be half the parent container.
          Instead of gap-8, use justify-between*/}
          <MotorKeyDetailsContainer
            KeyMotorDetails={currentPacket.KeyMotor[0]}
            direction={"Left"}
          />
          <MotorDetailsContainer
            MotorDetails={currentPacket.MotorDetails[0]}
            direction={"Left"}
          />
        </div>
        <div className="flex w-1/2 flex-col">
          <MotorKeyDetailsContainer
            KeyMotorDetails={currentPacket.KeyMotor[1]}
            direction="Right"
          />
          <MotorDetailsContainer
            MotorDetails={currentPacket.MotorDetails[1]}
            direction={"Right"}
          />
        </div>
      </div>
    </>
  );
}

export default MotorTab;
