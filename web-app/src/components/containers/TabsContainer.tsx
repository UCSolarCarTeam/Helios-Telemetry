import React, {useState} from "react";
import NavBar from "../tabs/NavBar";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import BatteryTab from "../tabs/BatteryTab";
import FaultsTab from "../tabs/FaultsTab";  
import MotorTab from "../tabs/MotorTab";
import MpptTab from "../tabs/MpptTab";
import PlaybackTab from "../tabs/PlaybackTab";
import RaceTab from "../tabs/RaceTab";

function TabsContainer(props: any) {

    return (
      <div className="grid w-full h-full bg-pink-300 grid-rows-6">
        <div className='row-span-1 bg-green-500'>
          <NavBar/>
        </div>
        <div className='row-span-5 bg-yellow-500'>
          <BrowserRouter>
            <Routes>
              <Route path="/" element= {<RaceTab/>}/>
              <Route path="/battery" element= {<BatteryTab/>}/>
              <Route path="/faults" element= {<FaultsTab/>}/>
              <Route path="/motor" element= {<MotorTab/>}/>
              <Route path="/mppt" element= {<MpptTab/>}/>
              <Route path="/playback" element= {<PlaybackTab/>}/>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    );
  }

  export default TabsContainer;
  