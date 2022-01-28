import React, { useState, useRef, useEffect } from 'react';
import './styles.css';
import { Todo } from '../model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md'
import { Actions } from '../App'

interface Props {
  todo: Todo;
  id: number;
  dispatch: React.Dispatch<Actions>
}

const SingleTodo:React.FC<Props> = ({todo, id, dispatch}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit])

  const inputRef = useRef<HTMLInputElement>(null)

  const handleDone = (id:number) => {
    dispatch({ type: 'done', payload: id})
  }

  const handleDelete = (id:number) => {
    dispatch({ type: 'delete', payload: id})
  }

  const handleEdit = (e:React.FormEvent<EventTarget>, id:number) => {
    e.preventDefault();

    dispatch({ type: 'edit', payload: {id: id, editTodo: editTodo}})
    setEdit(false)
  }

  return (
    <form className='todosSingle' onSubmit={e => handleEdit(e, id)}>
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
              handleEdit(e, id)
            }
          }} />
        </span>
        <span className="icon">
          <AiFillDelete onClick={() => handleDelete(id)} />
        </span>
        <span className="icon">
          <MdDone onClick={() => handleDone(id)}/>
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
