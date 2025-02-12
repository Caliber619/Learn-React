import { useState } from 'react'
import './App.css'

function App() {
  // a state for colors
  const [color, setColor] = useState("black")

  return (
    // background
    <div className="w-full h-screen duration-200" style={{backgroundColor: color}}>

      {/* to fix the button panel at the bottom */}
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">

        {/* button panel - ek baar banaege and uske andar button add krege */}
        <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl">
          
          {/* buttons */}
          <button
           onClick={()=> setColor("red")}
           className="outline-none px-4 py-1 rounded-full text-white shadow-lg" style={{backgroundColor: "red"}}>Red</button>
          <button
           onClick={()=> setColor("yellow")}
           className="outline-none px-4 py-1 rounded-full text-white shadow-lg" style={{backgroundColor: "yellow"}}>Yellow</button>
          <button 
           onClick={()=> setColor("green")}
           className="outline-none px-4 py-1 rounded-full text-white shadow-lg" style={{backgroundColor: "green"}}>Green</button>
          <button 
           onClick={()=> setColor("blue")}
           className="outline-none px-4 py-1 rounded-full text-white shadow-lg" style={{backgroundColor: "blue"}}>Blue</button>
          <button 
           onClick={()=> setColor("pink")}
           className="outline-none px-4 py-1 rounded-full text-white shadow-lg" style={{backgroundColor: "pink"}}>Pink</button>

        </div>
      </div>
    </div>

  )
}

export default App
