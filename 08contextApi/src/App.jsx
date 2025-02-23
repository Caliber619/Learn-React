import './App.css'
import UserContextProvider from './context/UserContextProvider'
import Profile from './components/Profile'
import Login from './components/Login'

function App() {

  return (
    <UserContextProvider>
      
      <div className='text-center bg-teal-300 text-[30px]'>
        Context Api
      </div>
      
      <Login />
      <Profile />
      
    </UserContextProvider>
  )
}

export default App
