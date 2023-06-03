import { IKeyMotor } from '../../objects/telemetry-data.interface'

export default function MotorKeyDetailsContainer({
  KeyMotorDetails
}: {
  KeyMotorDetails: IKeyMotor
}): JSX.Element {
  return (
    <>
      <div>AAA MotorKeyDetailsContainer</div>
      <div className="">Motor0 Bus Voltage: {KeyMotorDetails.BusVoltage}</div>
    </>
  )
}
