import React from 'react'
import { IKeyMotor, IMotorDetail } from '../../objects/telemetry-data.interface'

const fakeKeyMotor0Data: IKeyMotor = {
  Alive: false,
  SetCurrent: 0,
  SetVelocity: 0,
  BusCurrent: 0,
  BusVoltage: 0,
  VehicleVelocity: 0
}
const fakeMotor0DetailsData: IMotorDetail = {
  PhaseCCurrent: 0,
  PhaseBCurrent: 0,
  MotorVoltageReal: 0,
  MotorVoltageImaginary: 0,
  MotorCurrentReal: 0,
  MotorCurrentImaginary: 0,
  BackEmf: 0,
  VoltageRail15VSupply: 0,
  VoltageRail3VSupply: 0,
  VoltageRail1VSupply: 0,
  HeatSinkTemp: 0,
  MotorTemp: 0,
  DspBoardTemp: 0,
  DcBusAmpHours: 0,
  Odometer: 0,
  SlipSpeed: 0
}
const fakeKeyMotor1Data: IKeyMotor = {
  Alive: false,
  SetCurrent: 0,
  SetVelocity: 0,
  BusCurrent: 0,
  BusVoltage: 0,
  VehicleVelocity: 0
}
const fakeMotor1DetailsData: IMotorDetail = {
  PhaseCCurrent: 0,
  PhaseBCurrent: 0,
  MotorVoltageReal: 0,
  MotorVoltageImaginary: 0,
  MotorCurrentReal: 0,
  MotorCurrentImaginary: 0,
  BackEmf: 0,
  VoltageRail15VSupply: 0,
  VoltageRail3VSupply: 0,
  VoltageRail1VSupply: 0,
  HeatSinkTemp: 0,
  MotorTemp: 0,
  DspBoardTemp: 0,
  DcBusAmpHours: 0,
  Odometer: 0,
  SlipSpeed: 0
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
        Motor0 SetCurrent:{fakeData.Motor0.KeyMotor.SetCurrent}
      </div>
    </>
  )
}

export default MotorTab
