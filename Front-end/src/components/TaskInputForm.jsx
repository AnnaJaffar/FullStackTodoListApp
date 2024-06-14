
import {useContext, useState} from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import TodoListContext from './TodoListContext';

export default function TaskInputForm() {

    const [title, setTitle]=useState('')
    const {addTask}= useContext(TodoListContext)  
    const [error, setError] = useState('')
    
    function handleSubmit(event) { 
      event.preventDefault()  
      if (!title.trim()) {
        // If the title is empty or contains only whitespace, set an error message
        setError('Please enter a task then press Create.');
      } else {
        // If the title is not empty, call addTask and reset the title and error message
        addTask(title);
        setTitle('');
        setError(''); // Clear the error message
      }
    }
         
    function onChangeTitle(event) {
      setTitle(event.target.value)
      if (error) {
        setError('');
      }
    }  
    
    return ( 
      
      <div className="flex flex-col px-2 sm:px-4 md:px-6 lg:px-8 w-full">    
        <form onSubmit={handleSubmit} className="flex flex-grow items-center gap-4">          
          <input placeholder="Add a new task" type="text" onChange={onChangeTitle} value={title} className="border border-gray-300 rounded p-2 w-full h-10"/>
          <div><button className="flex flex-grow items-center bg-blue-500 text-white px-5 rounded-lg h-10 w-auto">Create<AiOutlinePlusCircle className="ml-2 text-base sm:text-lg lg:text-xl"/></button></div>
                 
        </form>
        {error && <p className="error-message text-red-600 text-left">{error}</p>}
        </div>
 
    )
  }