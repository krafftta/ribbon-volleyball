import React, { useRef } from 'react'
import './styles.css'

interface Props{
  participant: string;
  setParticipant: React.Dispatch<React.SetStateAction<string>>;
  handleAdd:(event:React.FormEvent)=> void;
}

const InputField: React.FC<Props> = ({participant, setParticipant, handleAdd}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
   <form className='input' onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur()
    }}>
        <input type='input'  
        ref = {inputRef}
        value={participant} 
        onChange={(event)=>setParticipant(event.target.value)}
        placeholder='Gebe einen Teilnehmernamen an' className='input__box'>
        </input>
        <button className='input_submit' type='submit'> 
            + 
        </button>
   </form>
  )
}

export default InputField