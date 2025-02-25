import { createSlice, nanoid } from "@reduxjs/toolkit";

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
        // yaha humesha do cheeze milegi - state, action
        addTodo: (state, action)=> {},
        removeTodo: ()=>{}, 
    }
})

