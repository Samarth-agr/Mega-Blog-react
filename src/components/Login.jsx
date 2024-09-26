import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/AuthSlice'
import {Button , Input} from './index'
import authservice from '../appwrite/auth'
import {useForm} from "react-hook-form"
import { useDispatch } from 'react-redux'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register , handelSubmit} = useForm()
    const [error,setError] = useState("")

    const login = async(data) =>{
        setError("")
        try {
           const session = await authservice.login(data)
           if(session){
            const userData = await authservice.getCurrentUser()
            if(userData) dispatch(login(userData));
            navigate("/")
           }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='w-full flex items-center justify-center'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
      <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
      <p>
        Aldready Have an account?
      <Link to="/singup" className='font-medium text-primary transition-all duration-200 hover:underline'>
      Sign up
      </Link>
      </p>
      {error?? <p className='text-red-500 text-center'>Login Failed</p>}
      <form onSubmit={handelSubmit(login)} className='mt-5'>
        <div className='space-y-5'>
            <Input label = "Email" placeholder = "Enter Email" type = "email" {...register("email",{
                required: true,
                validate: {
                    matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm.test(value) || "Email address must be valid" 
                }
            })}/>
            <Input label="password" placeholder="password" type="password" {...register("password",{
                required:true,
                validate: {
                    matchPattern: (value)=> /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(value) || "Password is weak"
                }
            })}/>
            <Button type="submit" className="w-full">Sign in</Button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default Login
