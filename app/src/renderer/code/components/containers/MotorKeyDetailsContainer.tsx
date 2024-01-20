import { IKeyMotor } from "../../objects/telemetry-data.interface";

export default function MotorKeyDetailsContainer({
  KeyMotorDetails,
  direction,
}: {
  KeyMotorDetails: IKeyMotor;
  direction: string;
}): JSX.Element {
  return (
    <>
      <div className="flex flex-row ">
        <h1 className="font-bold ">Key {direction} Motor Details</h1>
        <div
          className={`ml-2 mt-2 h-3 w-3 rounded-full ${
            KeyMotorDetails.Alive ? "bg-green" : " bg-red-700"
          }`}
        />

        {/* <div className="h-3 w-3 mt-2 ml-2 rounded-full {KeyMotorDetails.alive ? bg-green : bg-red}" /> */}
      </div>
      <section className="flex flex-row justify-between text-sm">
        <div className="flex w-1/2 flex-col px-2">
          <div className="flex flex-row justify-between">
            <h1> Set Current:</h1>
            <h2 className="font-bold text-red-700">
              {KeyMotorDetails.SetCurrent} %
            </h2>
          </div>
          <div className="flex flex-row justify-between">
            <h1>Set Velocity:</h1>
            <h2 className="font-bold text-red-700">
              {KeyMotorDetails.SetVelocity} %
            </h2>
          </div>
          <div className="flex flex-row justify-between">
            <h1>Vehicle Velocity:</h1>
            <h2 className="font-bold text-red-700">
              {KeyMotorDetails.VehicleVelocity} km/h
            </h2>
          </div>
        </div>
        <div className="flex w-1/2 flex-col px-2">
          <div className="flex flex-row justify-between">
            <h1> Bus Current:</h1>
            <h2 className="font-bold text-red-700">
              {KeyMotorDetails.BusCurrent} A
            </h2>
          </div>
          <div className="flex flex-row justify-between">
            <h1> Bus Voltage:</h1>
            <h2 className="font-bold text-red-700">
              {KeyMotorDetails.BusVoltage} V
            </h2>
          </div>
        </div>
      </section>
    </>
  );
}
