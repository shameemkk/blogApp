import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blogs')
      setBlogs(response.data)
    } catch (err) {
      setError('Failed to fetch blogs')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Latest Blogs</h1>

      {error && (
        <div className="mb-4 text-sm text-red-600">{error}</div>
      )}

      {blogs.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="mt-2 text-sm font-medium text-gray-900">No blogs found</h3>
          <p className="mt-1 text-sm text-gray-500">Check back later for new posts.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{blog.title}</h2>
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(blog.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-gray-600 mb-4 line-clamp-3">{blog.content}</p>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => navigate(`/blog/${blog._id}`)}
                    className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                  >
                    Read more
                  </button>
                  <p className="text-sm text-gray-500">By {blog.user_id.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
