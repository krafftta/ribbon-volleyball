import React from 'react'
import './styles.css'

const InputField = () => {
  return (
   <form className='input'>
        <input type='input' placeholder='Gebe einen Teilnehmernamen an' className='input__box'></input>
        <button className='input_submit' type='submit'> 
            + 
        </button>
   </form>
  )
}

export default InputField