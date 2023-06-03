import { faker } from '@faker-js/faker'
import { IKeyMotor, IMotorDetail } from '../../objects/telemetry-data.interface'
import MotorKeyDetailsContainer from '../containers/MotorKeyDetailsContainer'
import MotorDetailsContainer from '../containers/MotorDetailsContainer'

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
function MotorTab(): JSX.Element {
  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col w-1/2">
          <MotorKeyDetailsContainer KeyMotorDetails={fakeData.Motor0.KeyMotor} direction={'Left'} />
          <MotorDetailsContainer MotorDetails={fakeData.Motor0.MotorDetail} direction={'Left'} />
        </div>
        <div className="flex flex-col w-1/2">
          <MotorKeyDetailsContainer KeyMotorDetails={fakeData.Motor1.KeyMotor} direction="Right" />
          <MotorDetailsContainer MotorDetails={fakeData.Motor0.MotorDetail} direction={'Right'} />
        </div>
      </div>
    </>
  )
}

export default MotorTab
