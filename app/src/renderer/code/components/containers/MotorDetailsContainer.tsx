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
        <div className=" font-bold">{direction} Motor Details</div>
        <div className="flex flex-row text-sm justify-between">
          <div className="flex flex-col px-2 w-1/2">
            <div className="flex flex-row  justify-between">
              <h1>Motor Voltage Real:</h1>
              <h2 className="  text-red-700 font-bold">{MotorDetails.MotorVoltageReal} V</h2>
            </div>
            <div className="flex flex-row  justify-between">
              <h1>Motor Current Real:</h1>
              <h2 className="  text-red-700 font-bold">{MotorDetails.MotorCurrentReal} A</h2>
            </div>
            <div className="flex flex-row  justify-between">
              <h1>Back EMF Real:</h1>
              <h2 className="  text-red-700 font-bold">{MotorDetails.BackEmf} V</h2>
            </div>
            <div className="flex flex-row  justify-between">
              <h1>Voltage Rail 3V Supply:</h1>
              <h2 className="  text-red-700 font-bold">{MotorDetails.VoltageRail3VSupply} V</h2>
            </div>
            <div className="flex flex-row  justify-between">
              <h1>Phase B Current:</h1>
              <h2 className="  text-red-700 font-bold">{MotorDetails.PhaseBCurrent} A</h2>
            </div>
            <div className="flex flex-row  justify-between">
              <h1>Heat Sink Temp:</h1>
              <h2 className="  text-red-700 font-bold">{MotorDetails.HeatSinkTemp} C</h2>
            </div>
            <div className="flex flex-row  justify-between">
              <h1>DSP Board Temp:</h1>
              <h2 className="  text-red-700 font-bold">{MotorDetails.DspBoardTemp} C</h2>
            </div>
            <div className="flex flex-row  justify-between">
              <h1>Odometer:</h1>
              <h2 className="  text-red-700 font-bold">{MotorDetails.Odometer} M</h2>
            </div>
          </div>
          <div className="flex flex-col px-2 w-1/2">
            <div className="flex flex-row  justify-between">
              <h1>Motor Voltage Imaginary:</h1>
              <h2 className="  text-red-700 font-bold">{MotorDetails.MotorVoltageImaginary} V</h2>
            </div>
            <div className="flex flex-row  justify-between">
              <h1>Motor Current Imaginary:</h1>
              <h2 className="  text-red-700 font-bold">{MotorDetails.MotorCurrentImaginary} A</h2>
            </div>
            <div className="flex flex-row  justify-between">
              <h1>Voltage Rail 15V Supply:</h1>
              <h2 className="  text-red-700 font-bold">{MotorDetails.VoltageRail15VSupply} V</h2>
            </div>
            <div className="flex flex-row  justify-between">
              <h1>Voltage Rail 1V Supply:</h1>
              <h2 className="  text-red-700 font-bold">{MotorDetails.VoltageRail1VSupply} V</h2>
            </div>
            <div className=" flex flex-row  justify-between">
              <h1>PhaseCCurrent:</h1>
              <h2 className="text-red-700 font-bold">{MotorDetails.PhaseBCurrent} A</h2>
            </div>
            <div className="flex flex-row  justify-between">
              <h1>Motor Temp:</h1>
              <h2 className="  text-red-700 font-bold">{MotorDetails.MotorTemp} C</h2>
            </div>
            <div className="flex flex-row  justify-between">
              <h1>DC Bus Amp Hours:</h1>
              <h2 className="  text-red-700 font-bold">{MotorDetails.DcBusAmpHours} C</h2>
            </div>
            <div className="flex flex-row  justify-between">
              <h1>Slip Speed:</h1>
              <h2 className="  text-red-700 font-bold">{MotorDetails.SlipSpeed} M</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
