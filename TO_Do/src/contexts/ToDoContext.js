import { createContext,useContext } from "react";

export const ToDoContext=createContext({
    todos:[
        {
            id:1,
            todo:"msg",
            completed: false,
        }
    ],

      addTodo:(todo)=>{},
      updateTodo:(todo,id)=>{},
      deleteTodo:(id)=>{},
      toggleComplete:(id)=>{}

})

export const useTodo = () => {
    return useContext(ToDoContext)
}

export const TodoProvider = ToDoContext.Provider