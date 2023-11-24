function DataPrinter(props: any): JSX.Element {
  const { fields } = props
  return (
    <div className="flex flex-col ">
      {fields.map((field, index) => (
        <p className={`text-xxs`} key={index}>
          {field.Name}
        </p>
      ))}
    </div>
  )
}
type PIStransformerProps = {
  root: any
  depth?: number
}

function PIStransformer(props: PIStransformerProps): JSX.Element {
  const { root, depth = 0 } = props
  return (
    <div className="flex w-full gap-4 justify-between ">
      {Object.keys(root).map((key, index) => {
        const value = root[key]
        return (
          <div key={index} className={`flex flex-col `}>
            <div className="flex w-full border-b-2 border-helios items-center justify-evenly">
              <p
                className={`text-helios ${
                  depth >= 2 ? `text-xs` : depth == 1 ? 'text-sm' : 'text-lg'
                }`}
              >
                {key}
              </p>
            </div>
            {Array.isArray(value) ? (
              <DataPrinter fields={value} />
            ) : (
              <PIStransformer root={value} depth={depth + 1} />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default PIStransformer
