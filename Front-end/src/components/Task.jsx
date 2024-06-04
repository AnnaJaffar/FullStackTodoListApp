import { useContext } from 'react';
import { TbTrash } from 'react-icons/tb';
import TodoListContext from './TodoListContext';

export default function Task({id, title, isCompleted}) {
  const {onComplete,onDelete}=useContext(TodoListContext)
  return (
    
      
       <div className="bg-gray-200 p-2 gap-4 rounded-md text-blue-800 flex flex-grow items-center justify-between border-blue-300 w-full">
        <input className="flex-none" type="checkbox" checked={isCompleted}
        onChange={() => onComplete(id)}/>      

        <p className={isCompleted ? "line-through" : ""}>
          {title}
        </p>

        <button className="flex-none" onClick={() => onDelete(id)}>
          <TbTrash size={20} />
        </button>
      </div>   
    
    
  )
}
