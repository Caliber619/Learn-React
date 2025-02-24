import React from "react";
import { createContext } from "react";
import { useContext } from "react";

//ek context banate hai
export const ToDoContext = createContext({
    todos: [
        {
            id: 1,
            todo: "todo msg",
            completed: false,
        }
    ],
    addTodo: (todo)=> {},
    updateTodo: (id,todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {}
})


// context ko use krne ke liye useContext
export const useTodo = ()=>{
    return useContext(TodoContext)
}

// wrapping ke liye context provider
export const TodoProvider = ToDoContext.Provider