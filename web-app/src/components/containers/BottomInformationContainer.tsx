import React, {useState} from "react";

const fakeData={"Motor Temp":55, "Battery Power":54.35, "Motor":55, "Motor Temp1":55,"Motor Temp2":55,"Motor Temp3":55, "Pack Volatge":55, "MPPT":55, "Battery Current":55, "Bus Voltage":55}

function BottomInformationContainer(props: any) {

    const [variable, setVariable] = useState();

    return (
      <h1  className="bg-pink-300">Bottom Information
      fakeData[Motor Temp]</h1>

    );
}

export default BottomInformationContainer;
import React, {useState} from "react";

const fakeData={"Motor Temp":55, "Battery Power":54.35, "Motor":55, "Motor Temp1":55,"Motor Temp2":55,"Motor Temp3":55, "Pack Volatge":55, "MPPT":55, "Battery Current":55, "Bus Voltage":55}


function BottomInformationContainer(props: any) {

    const [variable, setVariable] = useState();

    return (
      <h1  className="bg-pink-300">


      <div className='text-xl'>{fakeData["Motor Temp"]} {fakeData["Battery Power"]}</div>

      </h1>




    );
}
export default BottomInformationContainer;
