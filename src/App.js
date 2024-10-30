import './App.css';
import CompareJson from './components/CompareJson';
import React, { useState } from 'react';
import SingleJson from './components/SingleJson';
import { NavBar } from './components/NavBar';
import ReducedResponse from './components/ReducedResponse';
import PathSearch from './components/PathSearch';

function App() {
  const [tab, setTab] = useState('singleApiResponse');
  
  return (
    <div className="App">
      <h1 style={{marginBottom: '36px'}}>
        API Response Parser
      </h1>
      <NavBar setTab={setTab} tab={tab}/>
      {tab === 'singleApiResponse' &&
        <SingleJson />
      }
      {tab === 'compareApiResponses' &&
        <CompareJson />
      }
      {tab === 'getReducedResponse' &&
        <ReducedResponse />
      }
      {tab === 'findPathOfKey' &&
        <PathSearch />
      }
    </div>
  );
}

export default App;
