import React, { useEffect, useState } from "react";
import { TodoProvider } from "./contexts";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

const App = () => {

  const [todos, setTodo] = useState([]);

  const addTodo=(todo)=>{
    setTodo((prev)=>[{id:Date.now(), ...todo}, ...prev])
  }

  const updateTodo=(todo,id)=>{
    setTodo((prev)=>prev.map((prevTodo)=>(
      prevTodo.id===id ? todo: prevTodo
    )))
  }

  // for deletion use filter method
  const deleteTodo=(id)=>{
    setTodo((prev)=> prev.filter((prevTodo)=> prevTodo.id!==id))
  }

  const toggleComplete=(id)=>{
    setTodo((prev)=>prev.map((prevTodo)=>(prevTodo.id===id ? {...prevTodo,completed:!prevTodo.completed}:prevTodo)))
  }

  useEffect(()=>{
    const todos=JSON.parse(localStorage.getItem("todos"))

    if(todos && todos.length>0){
      setTodo(todos)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])

  // return (
  //   <TodoProvider value={{todos,addTodo,toggleComplete,deleteTodo,updateTodo}}>
  //     <div className="bg-[#172842] min-h-screen py-8">
  //       <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
  //         <h1 className="text-2xl font-bold text-center mb-8 mt-2">
  //           Manage Your Todos
  //         </h1>
  //         <div className="mb-4">{/* Todo form goes here */
  //         }
  //         <TodoForm/>
  //         </div>
  //         <div className="flex flex-wrap gap-y-3">
  //           {/*Loop and Add TodoItem here */}
  //         {todos.map((todo)=>(
  //           <div key={todo.id} className="w-full">
  //             <TodoItem todo={todo} />
  //           </div>
  //         ))}

  //         </div>
  //       </div>
  //     </div>
  //   </TodoProvider>
  // );
  return (
    <TodoProvider value={{ todos, addTodo, toggleComplete, deleteTodo, updateTodo }}>
      <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white px-4 py-10">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">🧠 Stay Productive</h1>
            <p className="text-lg text-gray-300 max-w-xl mx-auto">
              “Success is the sum of small efforts, repeated day in and day out.” – Robert Collier
            </p>
          </header>
  
          {/* Todo Box Section */}
          <div className="bg-[#1e293b] shadow-2xl rounded-3xl p-6 md:p-10">
            <h2 className="text-2xl font-bold text-center mb-6">📝 Manage Your Todos</h2>
  
            {/* Todo Form */}
            <div className="mb-6">
              <TodoForm />
            </div>
  
            {/* Todo List */}
            <div className="flex flex-col gap-4">
              {todos.length > 0 ? (
                todos.map((todo) => (
                  <div
                    key={todo.id}
                    className="bg-[#334155] hover:bg-[#3b475a] rounded-xl p-4 transition-all duration-200"
                  >
                    <TodoItem todo={todo} />
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400 italic">No tasks yet. Let’s get started!</p>
              )}
            </div>
          </div>
  
          {/* Footer Quote */}
          <footer className="mt-16 text-center text-sm text-gray-500">
            <p>“The secret of getting ahead is getting started.” – Mark Twain</p>
          </footer>
        </div>
      </div>
    </TodoProvider>
  );
}  

export default App;
