type MapTextProps = {
  setFollowMap: (value: boolean) => void
  followMap: boolean
}
function MapText(props: MapTextProps): JSX.Element {
  const { setFollowMap, followMap } = props
  const lapsLeft = 0
  const timeLeft = 0
  return (
    <>
      <div className="w-full text-center mt-1">
        <div className="flex justify-between w-full">
          <div className="flex">
            <p>Follow </p>
            <input
              type="checkbox"
              name="follow"
              id="follow"
              checked={followMap}
              onClick={(): void => setFollowMap(!followMap)}
            />
          </div>
          <div className="flex">
            <p>Laps Left: {lapsLeft}</p>
          </div>
          <div className="flex">
            <p>Time Left: {timeLeft}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default MapText
