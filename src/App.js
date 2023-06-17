import React from 'react'
import { UseState } from './UseState.js'
import { UseReducer } from './useReducer.js'


import './App.css';

function App() {
  return (
    <div className="App p-5">
      <UseState name="UseState"/>
      <UseReducer name="UseReducer"/>
    </div>
  );
}

export default App;
