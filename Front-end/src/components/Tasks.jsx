import Task from '/src/components/Task.jsx';
import TodoListContext from './TodoListContext';
import { useContext } from 'react';

export default function Tasks() {

  const {tasks}=useContext(TodoListContext)
  const tasksQuantity = tasks.length
  const completedTasks = tasks.filter(tasks => tasks.is_complete).length;

  return(
  <section className="flex flex-col gap-4 items-center">
        <header className="inline-flex justify-between w-full gap-6 text-blue-800">
          <div className="inline-flex items-center flex-grow gap-2 p-2 bg-blue-100 rounded-md">
            <p  className="text-slate-500 flex items-center font-bold text-md">Created tasks</p>
          <span className="flex justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-center">{tasksQuantity}</span>
        </div>

        <div className="inline-flex items-center flex-grow gap-2 p-2 bg-blue-100 rounded-md">
          <p className="text-slate-500 flex items-center font-bold text-md" >Completed tasks</p>
          <span className="flex flex-grow justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-center">{completedTasks}</span>
        </div>
        
      </header>            
        {
          tasksQuantity==0 ? <></>: (tasks.map((task) => (
            <Task  key={task.id} id={task.id} isCompleted={task.is_complete} title={task.task}/>
            )))         
          
        }  
    </section>
  )
}