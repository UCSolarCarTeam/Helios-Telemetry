import React from 'react';
import './App.css';
import TabsContainer from './components/containers/TabsContainer';
import BottomInformationContainer from './components/containers/BottomInformationContainer';
import MapContainer from './components/containers/MapContainer';
import HeroContainer from './components/containers/HeroContainer';
import LogoStatusContainer from './components/containers/LogoStatusContainer';

function App() {
  return (
    <div className='bg-background-gray dark:bg-background-gray-dark w-screen h-screen p-5'>
      <div className='grid w-full h-2/6 grid-cols-6'>
        <div className='grid col-span-1 pr-1'>
          <LogoStatusContainer />
        </div>
        <div className='grid col-span-5 bg-red-500 pl-1'>
          <TabsContainer />
        </div>
      </div>
      <div className='grid w-full h-3/6 bg-blue-500 grid-cols-3 pt-1'>
        <div className='grid col-span-1 bg-purple-500 pr-1'>
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
