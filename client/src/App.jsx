import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './componets/NavBar'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Myblogs from './pages/Myblogs'
import Addblog from './pages/Addblog'
import ViewBlog from './pages/ViewBlog'
import EditBlog from './pages/EditBlog'

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/my-blogs" element={<Myblogs />} />
        <Route path="/add-blog" element={<Addblog />} />
        <Route path="/blog/:id" element={<ViewBlog />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  )
}

export default App
