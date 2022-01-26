import React from 'react';
import './styles.css'

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent<EventTarget>) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  return (
  <form className='input' onSubmit={handleAdd}>
    <input 
      type='input' 
      placeholder='Enter a task' 
      className='inputBox'
      value={todo}
      onChange={e => setTodo(e.target.value)}
      />
    <button className='inputSubmit' type='submit'>
      Go
    </button>
  </form>
  )
}

export default InputField;