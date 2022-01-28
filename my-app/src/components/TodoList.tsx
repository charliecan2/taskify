import React from 'react';
import './styles.css'
import { Todo } from '../model'
import SingleTodo from './SingleTodo';
import { Actions } from '../App'

interface Props {
  todos: Todo[];
  dispatch: React.Dispatch<Actions>;
}

const TodoList:React.FC<Props> = ({ todos, dispatch }) => {
  return(
    <div className='todos'>
      {todos.map(todo => (
        <SingleTodo
        todo={todo} 
        id={todo.id}
        dispatch={dispatch}
        />
      ))}
    </div>
  );
};

export default TodoList;
