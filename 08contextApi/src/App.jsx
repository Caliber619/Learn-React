import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='text-center bg-teal-300 text-[30px]'>
      Context Api
    </div>
  )
}

export default App
