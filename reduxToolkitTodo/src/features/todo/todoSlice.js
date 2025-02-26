import { createSlice, nanoid } from "@reduxjs/toolkit";

//store starting me kesa dikhega
const initialState = {
    todos: [
        {
            id: 1,
            text: "Hola! Amigo"
        }
    ],

}


function sayHello(){
    console.log("Hello");
}
export const todoSlice = createSlice({
    //slices ke naam hote hain! and initial state hota hai
    name: 'todo',
    initialState,
     
    // idhar hi reducers bante hain! - reducer me property and function hota hai
    reducers: {
        // addTodo: sayHello     or 
        
        //redux toolkit me hum sirf declare hi nahi balki define bhi krte hain
        // yaha humesha do cheeze milegi - state, action
        addTodo: (state, action)=> {
            const todo = {
                id: nanoid(),
                text: action.payload
                // payload ek object hai
            }
            // ab is todo ko state me bhejna hai
            state.todos.push(todo)
        },
        removeTodo: (state, action)=>{
            state.todos = state.todos.filter((todo)=>todo.id !== action.payload)
        }, 
    }
})

export const {addTodo, removeTodo} = todoSlice.actions
export default todoSlice.reducer
