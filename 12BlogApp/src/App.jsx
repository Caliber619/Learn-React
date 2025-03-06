import React from 'react'
import { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import {Header, Footer} from './components'
import { Outlet } from 'react-router-dom'
import Tagg from './components/uiComponents/Tagg'


function App() {
  // ek loading state banaege : database se puchna hota h na to conditional rendering ke liye
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  // jese hi application load ho to pucho ki logged in ho ya nahi us service se pucho
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=> {
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))
  }, [])



  //conditional rendering
  return !loading ? 
    (<div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='text-center w-full block'>

        <Header />

        <main>
            <br></br>
            <div className='flex justify-center'>
              <Tagg />
            </div>
            <Outlet />
        </main>

        <Footer />
        
      </div>
    </div>) : null
}

export default App
