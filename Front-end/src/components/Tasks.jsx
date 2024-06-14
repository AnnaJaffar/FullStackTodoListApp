import Task from '/src/components/Task.jsx';
import TodoListContext from './TodoListContext';
import { useContext } from 'react';

export default function Tasks() {

  const {tasks}=useContext(TodoListContext)
  const tasksQuantity = tasks.length
  const completedTasks = tasks.filter(tasks => tasks.is_complete).length;

  return(
  <section className="flex flex-col gap-2 items-center px-2 sm:px-4 md:px-6 lg:px-8 w-full">
        
        <header className="flex flex-wrap items-center justify-between w-full gap-2 text-blue-800">
          <div className="flex justify-between gap-2 sm:gap-3 md:gap-4 lg:gap-6 p-2 sm:p-1 md:p-2 lg:p-3
                          px-4 sm:px-1 md:px-2 lg:px-4 bg-blue-100 rounded-md w-full sm:w-auto">
            <p className="text-slate-500 font-bold text-md sm:text-base">Created tasks</p>
            <span className="flex justify-center items-center w-6 h-6 rounded-full bg-blue-500 text-white">{tasksQuantity}</span>
          </div>

          <div className="flex justify-between gap-2 sm:gap-3 md:gap-4 lg:gap-6 p-2 sm:p-1 md:p-2 lg:p-3
                          px-4 sm:px-1 md:px-2 lg:px-4 bg-blue-100 rounded-md w-full sm:w-auto">
            <p className="text-slate-500 font-bold text-md sm:text-base">Completed tasks</p>
            <span className="flex justify-center items-center w-6 h-6 rounded-full bg-blue-500 text-white">{completedTasks}</span>
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