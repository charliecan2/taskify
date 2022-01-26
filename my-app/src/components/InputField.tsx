import React from 'react';
import './styles.css'

const InputField: React.FC = () => {
  return (
  <form className='input'>
    <input type='input' placeholder='Enter a task' className='inputBox'/>
    <button className='inputSubmit' type='submit'>
      Go
    </button>
  </form>
  )
}

export default InputField;