import { IMotorDetail } from '../../objects/telemetry-data.interface'

export default function MotorDetailsContainer({
  MotorDetails
}: {
  MotorDetails: IMotorDetail
}): JSX.Element {
  return (
    <>
      <div>BBBB MotorDetailsContainer</div>
      <div className="">PhaseCCurrent: {MotorDetails.PhaseBCurrent}</div>
    </>
  )
}
