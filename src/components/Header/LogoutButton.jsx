import React from 'react'
import { useDispatch } from 'react-redux'
import authservice, { AuthService } from '../../appwrite/auth'
import { logout } from '../../store/AuthSlice'

function LogoutButton() {
    const dispatch = useDispatch();
    const logoutHandeler = ()=>{
        authservice.logout().then(()=>{
            dispatch(logout())
        })
    }
  return (
    <button onClick={logoutHandeler} className='bg-red-500 hover:bg-red-300 inline-block px-6 py-2 duration-200'>Logout</button>
  )
}

export default LogoutButton
