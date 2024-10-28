import './App.css';
import CompareJson from './components/CompareJson';
import React, { useState } from 'react';
import SingleJson from './components/SingleJson';
import { NavBar } from './components/NavBar';
import ReducedResponse from './components/ReducedResponse';

function App() {
  const [tab, setTab] = useState('singleApiResponse');
  
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
