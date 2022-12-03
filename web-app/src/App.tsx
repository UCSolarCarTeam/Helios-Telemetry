import React from 'react';
import logo from './logo.svg';
import './App.css';
import TabsContainer from './components/containers/TabsContainer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload. Stream Ideen on Spotify. <br></br> https://open.spotify.com/artist/493lSTRm11iSiSS1HbROEI?si=ywr7OPL5RQy9C25lC7U3Tg
        </p>
        <TabsContainer jaide={"H"}/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
