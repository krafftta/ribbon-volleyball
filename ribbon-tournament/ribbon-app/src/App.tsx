import React from 'react';
import './App.css';
import { Match, Team, Participant } from './models/ribbonUtils'
import { Scheduler } from './models/scheduler'
import InputField from './components/InputField';
import { useState } from 'react';
import { scheduler } from 'timers/promises';

const App: React.FC = () => {

  const [participant,setParticipant] = useState<string>("");
  const [participants, setParticipants] = useState<Participant[]>([]);
  let scheduler = new Scheduler(participants)

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (participant) {
      setParticipants([...participants, new Participant(participant, [2])])
      let p = new Participant(participant, [2])
      scheduler.addParticipant(p)
      setParticipant("")
    }

  };

  return (
    <div className="App">
      <span className='heading'> Schleifchenturnier </span>
      <InputField participant={participant} setParticipant={setParticipant} handleAdd={handleAdd}/>
      {participants.map((p) => (
        <li> {p.name}</li>))
        }
    </div>

  );
}

export default App;

// timestamp: 40:49, https://www.youtube.com/watch?v=FJDVKeh7RJI