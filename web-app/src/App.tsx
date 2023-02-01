import React from 'react';
import logo from './logo.svg';
import './App.css';
import TabsContainer from './components/containers/TabsContainer';
import BottomInformationContainer from './components/containers/BottomInformationContainer';
import MapContainer from './components/containers/MapContainer';
import HeroContainer from './components/containers/HeroContainer';
import LogoStatusContainer from './components/containers/LogoStatusContainer';

function App() {
  return (
    <div className='w-screen h-screen p-3'>
      <div className='grid w-full h-2/6 bg-green-500 grid-cols-6 pt-1'>
        <div className='grid col-span-1 bg-pink-500 pr-1'>
          <LogoStatusContainer />
        </div>
        <div className='grid col-span-5 bg-red-500 pl-1'>
          <TabsContainer />
        </div>
      </div>
      <div className='grid w-full h-3/6 bg-blue-500 grid-cols-3 pt-1'>
        <div className='grid pr-1'>
          <MapContainer />
        </div>
        <div className='grid col-span-2 bg-blue-500 pl-1'>
          <HeroContainer />
        </div>
      </div>
      <div className='grid w-full h-1/6 bg-orange-500 pt-1'>
        <BottomInformationContainer />
      </div>
    </div>
  );
}

export default App;
