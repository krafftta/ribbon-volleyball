import React from 'react';
import './App.css';
import { Match, Team, Participant } from '../../ribbonUtils'
import { Scheduler } from '../../scheduler'
import InputField from './components/InputField';

const App: React.FC = () => {
  return (
    <div className="App">
      <span className='heading'> Schleifchenturnier </span>
      <InputField />
    </div>
  );
}

export default App;
