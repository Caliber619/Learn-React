import { useState, useEffect, localStorage } from 'react'
import './App.css'
import { TodoProvider } from './contexts/ToDoContexts'
import { TodoForm, TodoItem } from './components'

function App() {
  //state wala todos saare todos ko denote krra h 
  const [todos, setTodos] = useState([])

  //--------sare methods ko define krege (jo bhi context me methods the)
  //--

  //idhar jo todo aaega vo form se aaega
  const addTodo = (todo)=>{
    setTodos((prev)=> [{id: Date.now(), ...todo},...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev)=> prev.map((prevTodo) => (prevTodo.id === id ? todo: prevTodo )))
  }

  const deleteTodo = (id) => {
    // array me us id ke alava sb elements aayein
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo ))
  }

  //--

  //--------local storage ki functionalities (value rkhte time string me convert hojati hai so lete time convert krne ka dhyan rkhein)
  //--

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length>0) {
      setTodos(todos)
    }
  }, [])

  useEffect(()=> {
    localStorage.setItem("todos", JSON.stringify(todos))
  },[todos])

  //--



  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>

      <div className="bg-[#172842] min-h-screen py-8">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">

                <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>

                <div className="mb-4">
                    {/* Todo form */}
                    <TodoForm /> 
                </div>

                <div className="flex flex-wrap gap-y-3">
                    {/*Loop and Add TodoItem here */}
                    {todos.map((todo)=> (
                      <div key={todo.id} className='w-full'>
                        <TodoItem />
                      </div>
                    ))}
                </div>
                  
          </div>
      </div>

    </TodoProvider>
  )
}



export default App
