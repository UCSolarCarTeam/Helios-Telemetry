import { IKeyMotor } from '../../objects/telemetry-data.interface'

export default function MotorKeyDetailsContainer({
  KeyMotorDetails,
  direction
}: {
  KeyMotorDetails: IKeyMotor
  direction: string
}): JSX.Element {
  return (
    <>
      <div className="flex flex-row ">
        <h1 className="font-bold text-lg">Key {direction} Motor Details</h1>
        <div className="h-3 w-3 mt-2 ml-2 rounded-full bg-green dark:bg-green-dark"></div>
      </div>
      <section className="flex flex-row  justify-between">
        <div className="flex flex-col px-2">
          <div className="flex flex-row gap-8">
            <h1> Set Current:</h1>
            <h2 className="text-red-700 font-bold">{KeyMotorDetails.SetCurrent}</h2>
          </div>
          <div className="flex flex-row gap-8">
            <h1>Set Velocity:</h1>
            <h2 className="text-red-700 font-bold">{KeyMotorDetails.SetVelocity}</h2>
          </div>
          <div className="flex flex-row gap-8">
            <h1>Vehicle Velocity:</h1>
            <h2 className="text-red-700 font-bold">{KeyMotorDetails.VehicleVelocity}</h2>
          </div>
        </div>
        <div className="flex flex-col px-2">
          <div className="flex flex-row gap-8">
            <h1> Bus Current:</h1>
            <h2 className="text-red-700 font-bold">{KeyMotorDetails.BusCurrent}</h2>
          </div>
          <div className="flex flex-row gap-8">
            <h1> Bus Voltage:</h1>
            <h2 className="text-red-700 font-bold">{KeyMotorDetails.BusVoltage}</h2>
          </div>
        </div>
      </section>
    </>
  )
}
