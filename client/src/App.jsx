
import { ToastContainer } from 'react-toastify'

import Register from './views/auth/Register'
import Layout from './views/Layout/Layout'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Home from './views/home/Home'
import ErrorPage from './views/error/ErrorPage'
import Login from './views/auth/Login';
import './global.css'
import Profile from './views/auth/Profile';
import { authenticateUser } from './store/user/userController';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import BlogDetails from './views/blog/Components/BlogDetails';

import { fetchAllBlogs } from './store/blog/blogController';
import BlogPage from './views/blog/BlogPage';

function App() {
 
  const dispatch = useDispatch()
  const user =  useSelector((state)=> state.user)
  useEffect(()=>{
       dispatch(authenticateUser())
       dispatch(fetchAllBlogs())
  },[])

 

  const demoBlogs = [
    {
      _id: "1",
      user: { _id: "101", name: "John Doe" },
      image: { url: "https://via.placeholder.com/150" },
      content: "This is a sample blog post about coding best practices.",
      comments: ["Great post!", "Very informative.", "Loved it!"],
      reaction: ["User1", "User2", "User3"],
      createdAt: "2024-11-20T12:34:56",
    },
    {
      _id: "2",
      user: { _id: "102", name: "Jane Smith" },
      image: { url: "https://via.placeholder.com/150" },
      content: "An introduction to MongoDB and Mongoose.",
      comments: ["Nice article!", "Thanks for sharing."],
      reaction: ["User1", "User3"],
      createdAt: "2024-11-22T08:15:30",
    },
  ];


  return (
    <>
       <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

   
     <Router>
    
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/blogs' element={<BlogPage/>}/>
        <Route path='/blog/:blogId' element={<BlogDetails blogs={demoBlogs}/>}/>

        {/* <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/products' element={<ProductList/>}/>
        <Route path='/products/:id' element={<ProductDetails/>}/> */}
        </Route>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/*' element={<ErrorPage/>}/>
      </Routes>

     </Router>
    </>
  )
}

export default App

export const baseUrl = 'http://localhost:8080/api/v1'