import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import gutsImage from "./assets/gutsImage.jpg";
import Card from "./components/card"


function App() {
  const [count, setCount] = useState(0)

  
  
  let myObj = {
    username: "berserk",
    age: 41
  }
  let newArr = [1,2,3,4]

  return (
    <>

      <h1 className='bg-green-400 text-black p-4 rounded-xl'>Tailwind Test</h1>
      {/* <Card  someObj1={myObj} someObj2={newArr}/> */}
      <Card userName="caliber"/>


    
    </>
  )
}

export default App
