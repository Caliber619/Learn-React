// import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

function MyApp(){
  return (
    <div>
      <h1>Custom App !</h1>
    </div>
  )
}
const anotherUser = "Merlin"   /*//evaluated expression smjhne ke liye*/
const reactElement  = React.createElement(
  'a',   //tag
  {href:'https://google.com',target:'_blank'},  //href
  'click me to visit google',   //text
  anotherUser     //evaluated expression
)
ReactDOM.createRoot(document.getElementById('root')).render(
  // reactElement
  <App />
)
