import { useContext,useState } from 'react';
import { TbTrash } from 'react-icons/tb';
import TodoListContext from './TodoListContext';


export default function Task({id, title, isCompleted}) {
  
  const {onComplete,onDelete}=useContext(TodoListContext)
  const [tick,setTick]= useState(isCompleted)
   
 function handleCheck()
  {
    if(isCompleted)
      {
        setTick(false)
      }
      else
      {
        setTick(true)
      }
   onComplete(id)
  }  
  return (   
      
    <div className="bg-gray-200 p-2 sm:p-2 md:p-1 lg:p-0.5 gap-2 md:gap-4 lg:gap-6 rounded-md text-blue-800 flex items-center justify-between border-blue-300 w-full">
      <input className="flex-none p-2 sm:p-1 md:p-2 lg:p-2 m-1 sm:m-2 md:m-3 lg:m-4" type="checkbox" checked={tick} onChange={() => handleCheck()}/>
        <p className={`flex-grow text-sm sm:text-base md:text-lg lg:text-xl ${tick ? "line-through" : ""}`}>
          {title}
        </p>
        <button className="flex-none p-1 lg:p-2" onClick={() => onDelete(id)}>
          <TbTrash className="text-base lg:text-xl" />
        </button>
    </div>
    
  )
}
