import React from 'react'
import {Container , LogoutButton} from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Header() {
    const authstatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const navItems = [ //Simply used to navigate all pages. if in future we need to add more page we dont need to make so much of changes. we can simply add new object
        {
            name : Home,
            slug : "/",
            active: true
        },
        {
            name: "Login",
            slug : '/login',
            active : !authstatus
        },
        {
            name: "Logout",
            slug : '/logout',
            active : !authstatus
        },
        {
            name : "All Post",
            slug : '/all-post',
            active : authstatus
        },
        {
            name : "Add Post",
            slug : '/add-post',
            active : authstatus
        }
    ]
  return (
    <header className='py-3 shadow bg-gray-500'>
        <Container>
            <nav>
                <ul className='flex ml-auto'>
                    {navItems.map((item)=>{
                        item.active ? (<li key={item.name}>
                            <button onClick={()=> navigate(item.slug)} 
                            className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>{item.name}</button>
                        </li>) : null
                    })}
                    {authstatus && (
                        <li><LogoutButton/></li>
                    )}
                </ul>
            </nav>
        </Container>
    </header>
  )
}

export default Header
