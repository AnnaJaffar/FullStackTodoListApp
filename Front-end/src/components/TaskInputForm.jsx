
import {useContext, useState} from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import TodoListContext from './TodoListContext';

export default function TaskInputForm() {

    const [title, setTitle]=useState('')
    const {tasks,addTask}= useContext(TodoListContext)  
    
    function handleSubmit(event) { 

      event.preventDefault()  
      console.log("title entered:",title)         
      addTask(title)
      setTitle('')
      console.log("todo entered:",tasks)
    }

    function onChangeTitle(event) {
      setTitle(event.target.value);
    }  
    
    return (      
                    
        <form onSubmit={handleSubmit} className="flex flex-grow gap-2 justify-center w-full">
          <input placeholder="Add a new task" type="text" onChange={onChangeTitle} value={title} className="border border-gray-300 rounded p-2 flex flex-grow h-10"/>
          <div><button className="flex flex-grow items-center bg-blue-500 text-white px-5 py-2 rounded-lg h-10">Create<AiOutlinePlusCircle className="ml-2" size={20}/></button></div>
          
        </form>
        
      
    )
  }