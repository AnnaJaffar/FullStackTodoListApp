import {useEffect, useState} from 'react';
import TaskInputForm from './TaskInputForm';
import TodoListContext from './TodoListContext';
import Tasks from './Tasks';
import todoLogo from '/src/assets/todoLogo.png';

export default function TodoListContextProvider(){

    const [tasks, setTasks] = useState([]) 

    async function onDelete(taskId) {

        try {
          const url = `http://localhost:8000/todo/${taskId}`      
          const response = await fetch(url, {
            method: "DELETE",
          });      
          if (response.ok) {
            console.log(response)
            await loadSavedTasks()
          } else {
            console.error(`Error deleting task with ID ${taskId}.`)
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
          
    }

    async function addTask(taskTitle) {
      let task={
        id:0,
        task:taskTitle,
        is_complete:false
      }      
        await fetch("http://localhost:8000/todo/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)
      }).then(loadSavedTasks)
    }
        
    async function onComplete(taskId) {
      try {
          const url = `http://localhost:8000/todo/${taskId}`
          const response = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json"},
          });
          if (response.ok) {
            console.log(`Todo item with id ${taskId} is updated`)
          } else {
            console.error(`Error updating todo item with id ${taskId}.`)
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
        await loadSavedTasks()
    }   


    useEffect(() => {
      loadSavedTasks()
    }, []) 


   async function loadSavedTasks() {
      const response = await fetch("http://localhost:8000/allToDoList/")
      const todos = await response.json()
        if(todos) {
          console.log("loaded tasks:",todos)
           setTasks(todos);
          }
          else
          console.log("data not recieved yet")
        }


    return (
      <header className="flex flex-col items-center gap-4 px-2 py-2 m-1 sm:px-4 md:px-6 lg:px-8">    
        <img className= "w-40 h-40" src={todoLogo} /> 
        <TodoListContext.Provider value={{tasks, setTasks, addTask, onComplete, onDelete}}>
          
            <TaskInputForm/>  
            <Tasks/>           
                            
        </TodoListContext.Provider>
        </header>
    )
}

