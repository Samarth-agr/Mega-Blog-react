import React, { useState } from 'react'
import authservice from '../appwrite/auth'
import {Signup} from '../appwrite/auth'
import {Button, Input} from './index'
import { login } from '../store/AuthSlice'
import {useFrom} from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error,setError] = useState()
    const {register , handelSubmit} = useFrom()

    const signup = async(data)=>{
        setError("")
        try {
            const userData = await authservice.CreateAccount(data);
            if(userData){
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
        <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <h2 className='text-center text-2xl font-bold leading-tight'>Sign up</h2>
        <p>Aldready have an account?
        <Link to='/login'></Link>
        </p>
        {error && <p className='text-red-500'>{error}</p>}
        </div>
        <form onClick={handelSubmit(signup)}>
            <div className="space-y-5">
                <Input label="name" placeholder="Enter full name" {...register("name" , {
                    required : true
                })}/>
                <Input label="email" type="email" placeholder="Enter email address" {...register("email",{
                    required : true
                })}/>
                <Input label="password" type="password" placeholder="Enter password" {...register("email",{
                    required : true
                })}/>
                <Button type="submit">SignUp</Button>
            </div>
        </form>
    </div>
  )
}

export default Signup
