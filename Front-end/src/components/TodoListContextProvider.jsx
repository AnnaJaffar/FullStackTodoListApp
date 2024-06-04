import { useEffect, useState} from 'react'
import TaskInputForm from './TaskInputForm';
import TodoListContext from './TodoListContext';
import Tasks from './Tasks';
import todoLogo from '/src/assets/todoLogo.png';

// const LOCAL_STORAGE_KEY = 'todo:tasks';

export default function TodoListContextProvider(){

    const [tasks, setTasks] = useState([]) 

    async function onDelete(taskId) {
        console.log("Id to delete:",taskId)
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

    // function setTasksAndSave(newTasks) {
    //   setTasks(newTasks);
    //   // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));

    //   // console.log("setnSave Result:",tasks)
    // }

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
      // setTasksAndSave([...tasks, {
      //   id: crypto.randomUUID(),
      //   title: taskTitle,
      //   isCompleted: false
      // }]);
    
    async function onComplete(taskId) {
      try {
          const url = `http://localhost:8000/todo/${taskId}`
          const response = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json"},
          });
          if (response.ok) {
            console.log(`Todo item with id ${taskId} marked as complete.`)
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
      console.log("in loadsavedtasks")
      // const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
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
      <header className="flex flex-col items-center gap-4 px-2 py-2 m-1">    
        <img className= "w-40 h-40" src={todoLogo} /> 
        <TodoListContext.Provider value={{tasks, setTasks, addTask, onComplete, onDelete}}>
          <div className="flex flex-col gap-4 justify-center w-full">
            <TaskInputForm/>  
            <Tasks/>           
            
          </div>                     
        </TodoListContext.Provider>
        </header>
    )
}

