import { useEffect, useState } from 'react'
import './App.css'
import {useDispatch} from 'react-redux'
import authservice from './appwrite/auth'
import { login, logout } from './store/AuthSlice'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import {Outlet} from 'react-router-dom'

function App() {
  //console.log(process.env.REACT_APP_APPWRITE_URL)     //cant use because the project is made in vite.
  //console.log(import.meta.env.VITE_APPWRITE_URL)

  const [loding, setLoding] = useState(true)
  const dispatch = useDispatch()
  
  useEffect(()=>{
    authservice.getCurrentUser().then((userData)=>{
      if(userData)
        dispatch(login(userData))
      else{
        dispatch(logout())
      }
    }).finally(()=>{
      setLoding(false)
    })
  },[])
  return !loding ? (
    <>
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
          TODO: {/* <Outlet/> */}
        </main>
        <Footer/>
      </div>
    </div>
    </>
  ) : null
}

export default App
