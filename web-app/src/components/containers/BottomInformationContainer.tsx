import React from 'react'

const fakeData = { 'Motor Temp': 55, 'Battery Power': 54.35, 'Motor': 55, 'Motor Temp1': 55, 'Motor Temp2': 55, 'Motor Temp3': 55, 'Pack Voltage': 55, MPPT: 55, 'Battery Current': 55, 'Bus Voltage': 55 }

function BottomInformationContainer (props: any) {
  return (
    <div className="">
      <div className='text-xl align-center flex flex-nowrap justify-between'>
        <div className='col-span-1'>
          <div className='text-xs'> Motor Temperature </div>
          <div>{fakeData['Motor Temp']}</div>
        </div>
        <div>
          <div className="text-xs"> Battery Power </div>
          <div>{fakeData['Battery Power']}</div>
        </div>
        <div>
          <div className="text-xs"> Motor </div>
          <div>{fakeData['Motor']}</div>
        </div>
        <div>
          <div className="text-xs"> Motor Temperature </div>
          <div>{fakeData['Motor Temp1']}</div>
        </div>
        <div>
          <div className="text-xs"> Motor Temperature </div>
          <div>{fakeData['Motor Temp2']}</div>
        </div>
        <div>
          <div className="text-xs"> Motor Temperature </div>
          <div>{fakeData['Motor Temp3']}</div>
        </div>
        <div>
          <div className="text-xs"> Pack Voltage </div>
          <div>{fakeData['Pack Voltage']}</div>
        </div>
        <div>
          <div className="text-xs"> MPPT </div>
          <div>{fakeData['MPPT']}</div>
        </div>
        <div>
          <div className="text-xs"> Battery Current </div>
          <div>{fakeData['Battery Current']}</div>
        </div>
        <div>
          <div className="text-xs"> Bus Voltage </div>
          <div>{fakeData['Bus Voltage']}</div>
        </div>
      </div>
    </div>



  )
}
export default BottomInformationContainer
