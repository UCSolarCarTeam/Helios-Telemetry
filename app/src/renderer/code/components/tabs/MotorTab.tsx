import { faker } from '@faker-js/faker'
import { IKeyMotor, IMotorDetail } from '../../objects/telemetry-data.interface'

const fakeKeyMotor0Data: IKeyMotor = {
  Alive: faker.datatype.boolean(),
  SetCurrent: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  SetVelocity: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  BusCurrent: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  BusVoltage: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  VehicleVelocity: faker.number.float({ min: 0, max: 100, precision: 0.01 })
}
const fakeMotor0DetailsData: IMotorDetail = {
  PhaseCCurrent: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  PhaseBCurrent: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  MotorVoltageReal: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  MotorVoltageImaginary: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  MotorCurrentReal: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  MotorCurrentImaginary: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  BackEmf: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  VoltageRail15VSupply: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  VoltageRail3VSupply: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  VoltageRail1VSupply: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  HeatSinkTemp: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  MotorTemp: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  DspBoardTemp: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  DcBusAmpHours: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  Odometer: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  SlipSpeed: faker.number.float({ min: 0, max: 100, precision: 0.01 })
}
const fakeKeyMotor1Data: IKeyMotor = {
  Alive: faker.datatype.boolean(),
  SetCurrent: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  SetVelocity: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  BusCurrent: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  BusVoltage: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  VehicleVelocity: faker.number.float({ min: 0, max: 100, precision: 0.01 })
}
const fakeMotor1DetailsData: IMotorDetail = {
  PhaseCCurrent: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  PhaseBCurrent: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  MotorVoltageReal: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  MotorVoltageImaginary: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  MotorCurrentReal: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  MotorCurrentImaginary: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  BackEmf: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  VoltageRail15VSupply: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  VoltageRail3VSupply: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  VoltageRail1VSupply: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  HeatSinkTemp: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  MotorTemp: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  DspBoardTemp: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  DcBusAmpHours: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  Odometer: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
  SlipSpeed: faker.number.float({ min: 0, max: 100, precision: 0.01 })
}
const fakeData = {
  Motor0: {
    KeyMotor: fakeKeyMotor0Data,
    MotorDetail: fakeMotor0DetailsData
  },
  Motor1: {
    KeyMotor: fakeKeyMotor1Data,
    MotorDetail: fakeMotor1DetailsData
  }
}
function MotorTab() {
  return (
    <>
      <p>Motor Tab </p>
      <div className="flex flex-nowrap justify-evenly text-center h-full">
        Motor0 SetCurrent: {fakeData.Motor0.KeyMotor.SetCurrent}
        <br />
        Motor1 PhaseCCurrent: {fakeData.Motor1.MotorDetail.PhaseCCurrent}
      </div>
    </>
  )
}

export default MotorTab
