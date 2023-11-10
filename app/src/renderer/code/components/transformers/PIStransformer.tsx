function DataPrinter(props: any): JSX.Element {
  const { fields } = props
  return (
    <>
      {fields.map((field, index) => (
        <p className={`text-xxs`} key={index}>
          {' '}
          {field.Name}{' '}
        </p>
      ))}
    </>
  )
}

function PIStransformers(props: any): JSX.Element {
  const { root } = props
  return (
    <div>
      {Object.keys(root).map((key, index) => {
        const value = root[key]
        return (
          <div key={index}>
            <h1>{key}</h1>
            {Array.isArray(value) ? (
              <DataPrinter fields={value} />
            ) : (
              <PIStransformers root={value} />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default PIStransformers
