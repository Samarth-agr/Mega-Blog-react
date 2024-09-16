import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  //console.log(process.env.REACT_APP_APPWRITE_URL)     //cant use because the project is made in vite.
  console.log(import.meta.env.VITE_APPWRITE_URL)
  return (
    <>
    <h1>
    A blog app
    </h1>
    </>
  )
}

export default App
