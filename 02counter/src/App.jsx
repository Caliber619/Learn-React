import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  let [counter, Counterfunc] = useState(0)

  // let counter = 15     //----previously

  const addValue = ()=>{
    // console.log("counter value: "+counter);
    // counter += 1;    //----previously

    // setCounter(counter+1); // current    ---or 
    counter += 1;
    Counterfunc(counter)
  }
  const removeValue = ()=>{
    // console.log("counter value: "+counter);
    if(counter != 0){
      counter -= 1;
    }
    Counterfunc(counter)
  }
  return (
    < >
      <h1>Caliber and React</h1>
      <h2>Counter value: {counter}</h2>
      
      <button onClick={addValue}>Add Value</button>
      <br />
      <button onClick={removeValue}>Remove Value</button>

    </>
  )
}

export default App
