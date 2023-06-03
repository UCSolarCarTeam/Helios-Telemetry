import { IMotorDetail } from '../../objects/telemetry-data.interface'

export default function MotorDetailsContainer({
  MotorDetails,
  direction
}: {
  MotorDetails: IMotorDetail
  direction: string
}): JSX.Element {
  return (
    <>
      <div className="flex flex-col">
        <div className=" text-lg font-bold">{direction} Motor Details</div>
        <div className="flex flex-row  justify-between">
          <div className="flex flex-col px-2">
            <div className="flex flex-row gap-8">
              <h1>Motor Voltage Real:</h1>
              <h2 className="  text-red-700 font-bold">{MotorDetails.MotorVoltageReal}</h2>
            </div>
          </div>
          <div className="flex flex-col px-2">
            <div className=" flex flex-row gap-8">
              <h1>PhaseCCurrent:</h1>
              <h2 className="text-red-700 font-bold">{MotorDetails.PhaseBCurrent}</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
