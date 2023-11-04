const mppt = {
  Name: 'MPPT',
  //   FString: '%s, %s',
  Data: [
    {
      Name: 'MPPT.Array.Voltage',
      FString: '%s V',
      min: 20,
      max: 100
    },
    {
      Name: 'MPPT.Array.Current',
      FString: '%s A',
      min: 20,
      max: 100
    },
    {
      Name: 'MPPT.Battery.Voltage',
      FString: '%s V',
      min: 20,
      max: 100
    },
    {
      Name: 'MPPT.Battery.Current',
      FString: '%s A',
      min: 20,
      max: 100
    }
  ]
}
export default mppt
