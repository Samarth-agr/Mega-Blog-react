import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import Store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout, Login} from './components/index.js'
import Signup from './pages/Signup.jsx'
import Post from './pages/Post.jsx'
import AllPost from './pages/AllPost.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'

const router = createBrowserRouter([{
  path : '/',
  element : <App/>,
  children : [
    {
      path : '/',
      element : <Home/>
    },
    {
      path : '/login',
      element : (
        <AuthLayout authentication ={false}>
          <Login/>
        </AuthLayout>
      )
    },
    {
      path : '/signup',
      element : (
        <AuthLayout authentication ={false}>
          <Signup/>
        </AuthLayout>
      )
    },
    {
      path : '/all-posts',
      element : (
        <AuthLayout authentication ={" "}>
          <AllPost/>
        </AuthLayout>
      )
    },
    {
      path : '/add-post',
      element : (
        <AuthLayout authentication ={" "}>
          <AddPost/>
        </AuthLayout>
      )
    },
    {
      path : '/edit-posts/:slug',
      element : (
        <AuthLayout authentication ={" "}>
          <EditPost/>
        </AuthLayout>
      )
    },
    {
      path : "/post/:slug",
      element : <Post/>
    }

  ]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
