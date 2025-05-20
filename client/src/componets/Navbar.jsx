import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

const NavBar = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      {/* Logo */}
      <div className="text-2xl font-bold text-purple-500">BlogHub</div>
      
      {/* Navigation Links */}
      <div className="flex space-x-6">
        <Link to="/" className="text-gray-700 hover:text-purple-500">Home</Link>
        {isAuthenticated ? <Link to="/my-blogs" className="text-gray-700 hover:text-purple-500">My Blogs</Link> : null}
      </div>
      
      {/* Auth Buttons */}
      {!isAuthenticated ? (
        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Log In
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="px-4 py-2 text-white bg-purple-500 rounded-md hover:bg-purple-600"
          >
            Sign Up
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <button
          onClick={() => navigate('/add-blog')}
           className="px-4 py-2 text-white bg-purple-500 rounded-md hover:bg-purple-600">
            + New Blog
          </button>
          <span className="text-gray-700">Welcome, {user?.name || 'user'}</span>
          <button 
            onClick={logout}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Log Out
          </button>
        </div>
      )}
    </nav>
  )
}

export default NavBar
