import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Addblog = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await axios.post('/api/blogs', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      })
      navigate('/my-blogs')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create blog post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-8">Create a New Blog</h1>
      
      <div className="bg-white rounded-lg shadow p-6 sm:p-8">
        <h2 className="text-xl font-semibold mb-6">Create Blog</h2>
        
        {error && (
          <div className="mb-4 text-red-500 text-sm">{error}</div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your blog content here..."
              rows="10"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              required
            ></textarea>
          </div>
          
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-white bg-purple-500 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Publish Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Addblog
