import React, { useState, useReducer } from 'react';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from './model'

import './App.css';

export type Actions =
  | {type: 'add'; payload: string}
  | {type: 'delete'; payload: number}
  | {type: 'done'; payload: number}
  | {type: 'edit'; payload: {id: number, editTodo: string}}

const TodoReducer = (state: Todo[], action: Actions) => {
  switch(action.type){
    case 'add':
      return [...state, {
        id: Date.now(),
        todo: action.payload,
        isDone: false
      }]
    case 'delete':
      return state.filter(todo => 
        todo.id !== action.payload
      )
    case 'done':
      return state.map(todo => 
        todo.id === action.payload?{...todo, isDone:!todo.isDone}:todo
      )
    case 'edit':
      return state.map(todo =>
        todo.id === action.payload.id?{...todo, todo:action.payload.editTodo}:todo
      )
    default:
      return state;
  }
}

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");

  const [state, dispatch] = useReducer(TodoReducer, [])

  const handleAdd = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    if(todo){
      dispatch({ type: 'add', payload: todo})
      setTodo("");
    }
  }

  return ( 
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
      <TodoList todos={state} dispatch={dispatch}/>
    </div>
  );
}

export default App;
