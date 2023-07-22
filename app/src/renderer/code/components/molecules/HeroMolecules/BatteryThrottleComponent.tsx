import SpeedAtom from '../../atoms/SpeedAtom'
import ThrottleIcon from '../../atoms/ThrottleIcon'
import BatteryIconComponent from '../../atoms/BatteryIcon'

function BatteryThrottleComponent(props: any) {
  return (
    <>
      <div className="grid w-full grid-cols-12 justify-items-center content-center">
        <BatteryIconComponent />
        <ThrottleIcon />
        <SpeedAtom />
      </div>
    </>
  )
}

export default BatteryThrottleComponent
