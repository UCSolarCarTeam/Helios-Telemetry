import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { faker } from '@faker-js/faker'
import { useState } from 'react'
import { MdClose } from 'react-icons/md'
import { FiMenu } from 'react-icons/fi'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

function generateTableData(): any[] {
  var tableData = []
  for (var i = 0; i < 100; i++) {
    tableData.push({
      dataPoint: faker.datatype.number({ min: 0, max: 100 }),
      time: faker.datatype.number({ min: 1553236613, max: 1711089413 }),
      powerIn: faker.datatype.number({ min: 0, max: 100 }),
      powerOut: faker.datatype.number({ min: 0, max: 100 }),
      netPowerOut: faker.datatype.number({ min: 0, max: 100 }),
      speed: faker.datatype.number({ min: 0, max: 100 }),
      distance: faker.datatype.number({ min: 0, max: 100 }),
      energy: faker.datatype.number({ min: 0, max: 100 }),
      efficiency: faker.datatype.number({ min: 0, max: 100 })
    })
  }
  return tableData
}

const tableData = generateTableData()

const GraphOptions = [
  { id: 'time', name: 'TIME' },
  { id: 'power', name: 'POWER' },
  { id: 'distance', name: 'DISTANCE' },
  { id: 'amp_hours', name: 'AMP HOURS' },
  { id: 'current', name: 'CURRENT' },
  { id: 'battery', name: 'BATTERY' }
]

const timeGraphOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      title: {
        display: true,
        text: 'Lap Time (minutes)'
      }
    }
  },
  plugins: {
    legend: {
      display: false
    }
  },
  animation: {
    duration: 0
  }
}

const powerGraphOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      title: {
        display: true,
        text: 'Power (W)'
      }
    }
  },
  plugins: {
    legend: {
      position: 'bottom' as const
    }
  },
  animation: {
    duration: 0
  }
}

const distanceGraphOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      title: {
        display: true,
        text: 'Distance Remaining (km)'
      }
    }
  },
  plugins: {
    legend: {
      display: false
    }
  },
  animation: {
    duration: 0
  }
}

const ampHoursGraphOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      title: {
        display: true,
        text: 'Amp Hours (Ah)'
      }
    }
  },
  plugins: {
    legend: {
      display: false
    }
  },
  animation: {
    duration: 0
  }
}

const currentGraphOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      title: {
        display: true,
        text: 'Average Pack Current (A)'
      }
    }
  },
  plugins: {
    legend: {
      display: false
    }
  },
  animation: {
    duration: 0
  }
}

const batteryGraphOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      title: {
        display: true,
        text: 'Battery Seconds Remaining (s)'
      }
    }
  },
  plugins: {
    legend: {
      display: false
    }
  },
  animation: {
    duration: 0
  }
}

const labels = [0, 5, 10, 15, 20, 25, 30, 35]

const timeGraphData = {
  labels,
  datasets: [
    {
      data: labels.map(() => faker.datatype.number({ min: 0, max: 3000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)'
    }
  ]
}

const powerGraphData = {
  labels,
  datasets: [
    {
      label: 'Total Power In',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 3000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)'
    },
    {
      label: 'Total Power Out',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 3000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)'
    },
    {
      label: 'Net Power Out',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 3000 })),
      borderColor: 'rgb(66, 204, 45)',
      backgroundColor: 'rgba(66, 204, 45, 0.5)'
    }
  ]
}

const distanceGraphData = {
  labels,
  datasets: [
    {
      data: labels.map(() => faker.datatype.number({ min: 0, max: 3000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)'
    }
  ]
}

const ampHoursGraphData = {
  labels,
  datasets: [
    {
      data: labels.map(() => faker.datatype.number({ min: 0, max: 3000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)'
    }
  ]
}

const currentGraphData = {
  labels,
  datasets: [
    {
      data: labels.map(() => faker.datatype.number({ min: 0, max: 3000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)'
    }
  ]
}

const batteryGraphData = {
  labels,
  datasets: [
    {
      data: labels.map(() => faker.datatype.number({ min: 0, max: 3000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)'
    }
  ]
}

function RaceTab() {
  const [currentGraph, setCurrentGraph] = useState('time')
  const [menuOpen, setMenuOpen] = useState(false)
  function handleGraphChange(id: string) {
    setCurrentGraph(id)
    setMenuOpen(false)
  }
  function GraphMenu() {
    return (
      <>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="float-right bg-light dark:bg-dark
            border-2 rounded border-light dark:border-dark p-1"
        >
          {menuOpen ? (
            <MdClose style={{ width: '16px', height: '16px' }} />
          ) : (
            <FiMenu style={{ width: '16px', height: '16px' }} />
          )}
        </button>
        <ul className={menuOpen ? 'block pt-7' : 'hidden'}>
          {GraphOptions.map((option) => (
            <li
              key={option.id}
              className="text-right dark:text-dark text-light bg-light
              dark:bg-dark p-2 pl-4 hover:bg-primary hover:text-dark hover:dark:bg-primary"
              onClick={() => handleGraphChange(option.id)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      </>
    )
  }
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-2">
        <div className="block max-h-96 overflow-y-auto">
          <table className="border-collapse h-full">
            <thead className="top-0 sticky">
              <tr>
                <th key="lap" className="uppercase text-xs w-1/12 dark:text-dark text-light">
                  Lap Number
                </th>
                <th key="time" className="uppercase text-xs w-1/12 dark:text-dark text-light">
                  Time
                </th>
                <th key="power_in" className="uppercase text-xs w-1/12 dark:text-dark text-light">
                  Power In
                </th>
                <th key="power_out" className="uppercase text-xs w-1/12 dark:text-dark text-light">
                  Power Out
                </th>
                <th key="net_power" className="uppercase text-xs w-1/12 dark:text-dark text-light">
                  Net Power Out
                </th>
                <th key="speed" className="uppercase text-xs w-1/12 dark:text-dark text-light">
                  Avg Speed
                </th>
                <th key="distance" className="uppercase text-xs w-1/12 dark:text-dark text-light">
                  Distance
                </th>
                <th key="amphours" className="uppercase text-xs w-1/12 dark:text-dark text-light">
                  AmpHours
                </th>
                <th key="current" className="uppercase text-xs w-1/12 dark:text-dark text-light">
                  Avg Pack Current
                </th>
              </tr>
            </thead>
            <tbody className="">
              {tableData.map((data) => (
                <tr>
                  <td
                    key={data.id}
                    className="border-t border-light dark:border-dark text-center text-xs dark:text-dark text-light"
                  >
                    {data.dataPoint}
                  </td>
                  <td
                    key={data.id}
                    className="border-t border-light dark:border-dark text-center text-xs dark:text-dark text-light"
                  >
                    {data.time}
                  </td>
                  <td
                    key={data.id}
                    className="border-t border-light dark:border-dark text-center text-xs dark:text-dark text-light"
                  >
                    {data.powerIn} W
                  </td>
                  <td
                    key={data.id}
                    className="border-t border-light dark:border-dark text-center text-xs dark:text-dark text-light"
                  >
                    {data.powerOut} W
                  </td>
                  <td
                    key={data.id}
                    className="border-t border-light dark:border-dark text-center text-xs dark:text-dark text-light"
                  >
                    {data.netPowerOut} W
                  </td>
                  <td
                    key={data.id}
                    className="border-t border-light dark:border-dark text-center text-xs dark:text-dark text-light"
                  >
                    {data.speed} km/h
                  </td>
                  <td
                    key={data.id}
                    className="border-t border-light dark:border-dark text-center text-xs dark:text-dark text-light"
                  >
                    {data.distance} km
                  </td>
                  <td
                    key={data.id}
                    className="border-t border-light dark:border-dark text-center text-xs dark:text-dark text-light"
                  >
                    {data.energy} Ah
                  </td>
                  <td
                    key={data.id}
                    className="border-t border-light dark:border-dark text-center text-xs dark:text-dark text-light"
                  >
                    {data.efficiency} %
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="h-full w-full relative">
          <div className={currentGraph === 'time' ? 'block h-full' : 'hidden'}>
            <Line height={'100%'} options={timeGraphOptions} data={timeGraphData} />
          </div>
          <div className={currentGraph === 'power' ? 'block h-full' : 'hidden'}>
            <Line height={'100%'} options={powerGraphOptions} data={powerGraphData} />
          </div>
          <div className={currentGraph === 'distance' ? 'block h-full' : 'hidden'}>
            <Line height={'100%'} options={distanceGraphOptions} data={distanceGraphData} />
          </div>
          <div className={currentGraph === 'amp_hours' ? 'block h-full' : 'hidden'}>
            <Line height={'100%'} options={ampHoursGraphOptions} data={ampHoursGraphData} />
          </div>
          <div className={currentGraph === 'current' ? 'block h-full' : 'hidden'}>
            <Line height={'100%'} options={currentGraphOptions} data={currentGraphData} />
          </div>
          <div className={currentGraph === 'battery' ? 'block h-full' : 'hidden'}>
            <Line height={'100%'} options={batteryGraphOptions} data={batteryGraphData} />
          </div>
          <div className="absolute top-1 right-0">
            <GraphMenu />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RaceTab
