import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ViewBlog = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchBlog()
  }, [])

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`/api/blogs/${id}`)
      setBlog(response.data)
    } catch (err) {
      setError('Failed to fetch blog')
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

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-red-600">{error}</div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-gray-600">Blog not found</div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{blog.title}</h1>
            {blog.user_id && (
              <div className="text-sm text-gray-500">
                By {blog.user_id.name || 'Anonymous'}
              </div>
            )}
          </div>
          <div className="text-sm text-gray-500 mb-6">
            {new Date(blog.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          <div className="prose max-w-none">
            {blog.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => navigate(-1)}
          className="text-purple-600 hover:text-purple-700 font-medium text-sm"
        >
          ← Back
        </button>
      </div>
    </div>
  )
}

export default ViewBlog