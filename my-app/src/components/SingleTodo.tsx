import React, { useState, useRef, useEffect } from 'react';
import './styles.css';
import { Todo } from '../model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md'

interface Props {
  todo: Todo;
  id: number;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo:React.FC<Props> = ({todo, id, todos, setTodos}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit])

  const inputRef = useRef<HTMLInputElement>(null)

  const handleDone = (id:number) => {
    setTodos(
      todos.map(todo => 
        todo.id === id?{...todo, isDone:!todo.isDone}:todo
      )
    )
  }

  const handleDelete = (id:number) => {
    setTodos(
      todos.filter(todo => 
        todo.id !== id
      )
    )
  }

  const handleEdit = (e:React.FormEvent<EventTarget>, id:number) => {
    e.preventDefault();

    setTodos(todos.map(todo => (
      todo.id === id?{...todo, todo:editTodo}:todo))
    );
    setEdit(false)
  }

  return (
    <form className='todosSingle' onSubmit={e => handleEdit(e, todo.id)}>
      {
        edit ? (
          <input 
            className='todoSingleText'
            ref={inputRef}
            value={editTodo} 
            onChange={e => setEditTodo(e.target.value)}/>
        ) : (
          todo.isDone ? (
            <s className="todosSingleText">
              {todo.todo}
            </s>) : (
            <span className="todosSingleText">
              {todo.todo}
            </span>)
        )
      }
      
      <div>
        <span className="icon">
          <AiFillEdit onClick={(e) => {
            if(!edit && !todo.isDone){
              setEdit(!edit)
            } else if(edit && !todo.isDone) {
              handleEdit(e, todo.id)
            }
          }} />
        </span>
        <span className="icon">
          <AiFillDelete onClick={() => handleDelete(todo.id)} />
        </span>
        <span className="icon">
          <MdDone onClick={() => handleDone(todo.id)}/>
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
