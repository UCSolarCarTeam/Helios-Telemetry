import React from 'react'
import PIStransformers from '../transformers/PIStransformer'
const battery = {
  Temperature: [
    {
      Name: 'Battery Temperature',
      FString: '%s °C(%s) - %s °C(%s)',
      data: [
        {
          IName: 'Battery.Temp.LowTemp',
          min: 10,
          max: 25,
          hover: 'Low Cell Temperature'
        },
        {
          IName: 'Battery.Temp.LowCell',
          hover: 'Low Cell ID'
        },
        {
          IName: 'Battery.Temp.HighTemp',
          min: 50,
          max: 75,
          hover: 'High Cell Temperature'
        },
        {
          IName: 'Battery.Temp.HighCell',
          hover: 'High Cell ID'
        }
      ]
    },
    {
      Name: 'Average Temperature',
      FString: '%s °C',
      data: [{ IName: 'Battery.Temp.Average', min: 0, max: 100 }]
    },
    {
      Name: 'Internal Temperature',
      FString: '%s ˚C',
      data: [{ Iname: 'Battery.Temp.Internal', min: 0, max: 100 }]
    }
  ],
  MPPT: {
    MPPT1: [
      {
        Name: 'Battery Temperature',
        FString: '%s °C(%s) - %s °C(%s)',
        data: [
          {
            IName: 'Battery.Temp.LowTemp',
            min: 10,
            max: 25,
            hover: 'Low Cell Temperature'
          },
          {
            IName: 'Battery.Temp.LowCell',
            hover: 'Low Cell ID'
          },
          {
            IName: 'Battery.Temp.HighTemp',
            min: 50,
            max: 75,
            hover: 'High Cell Temperature'
          },
          {
            IName: 'Battery.Temp.HighCell',
            hover: 'High Cell ID'
          }
        ]
      }
    ],
    MPPT2: [
      {
        Name: 'Battery Temperature',
        FString: '%s °C(%s) - %s °C(%s)',
        data: [
          {
            IName: 'Battery.Temp.LowTemp',
            min: 10,
            max: 25,
            hover: 'Low Cell Temperature'
          },
          {
            IName: 'Battery.Temp.LowCell',
            hover: 'Low Cell ID'
          },
          {
            IName: 'Battery.Temp.HighTemp',
            min: 50,
            max: 75,
            hover: 'High Cell Temperature'
          },
          {
            IName: 'Battery.Temp.HighCell',
            hover: 'High Cell ID'
          }
        ]
      }
    ]
  },

  Cell: [
    {
      Name: 'Battery Cell Voltage',
      FString: '%s V(%s) - %s V(%s)',
      data: [
        { IName: 'Battery.Cell.Low', min: 0, max: 100 },
        { IName: 'Battery.Cell.Low.ID' },
        { IName: 'Battery.Cell.High', min: 0, max: 100 },
        { IName: 'Battery.Cell.High.ID' }
      ]
    },
    {
      Name: 'Battery Average Voltage',
      FString: '%s V',
      data: [{ IName: 'Bettery.Cell.Average', min: 0, max: 100 }]
    },
    {
      Name: 'Battery Populated Cells',
      FString: '%s',
      data: [{ IName: 'Battery.Cell.Populated', min: 0, max: 100 }]
    }
  ],

  Pack: [
    {
      Name: 'Pack',
      FString: '%s V(%s) - %s V(%s)',
      data: [
        { IName: 'Pack.Current', min: 0, max: 100 },
        { IName: 'Pack.Voltage' },
        { IName: 'Battery.Cell.High', min: 0, max: 100 },
        { IName: 'Battery.Cell.High.ID' }
      ]
    }
  ]
}

function FaultsTab(): JSX.Element {
  return (
    <div>
      {' '}
      <p>Faults Tab</p>
      <PIStransformers root={battery} />
    </div>
  )
}

export default FaultsTab
