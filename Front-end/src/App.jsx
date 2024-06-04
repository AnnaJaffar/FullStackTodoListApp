import TodoListContextProvider from "./components/TodoListContextProvider";
import TodoList from "./components/TodoListContextProvider";

export default function App() {
   return (
    <div className="flex flex-col items-center">
      <TodoListContextProvider/>

    </div>
  )
}


