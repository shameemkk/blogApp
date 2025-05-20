const Blog = require('../models/Blog');

const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.create({
      title,
      content,
      user_id: req.userId
    });
    res.status(201).json({
      message: 'Blog created successfully',
      blog
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('user_id', 'name email');
    res.json(blogs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ user_id: req.userId }).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('user_id', 'name email');
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.user_id.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this blog' });
    }

    blog.title = title;
    blog.content = content;
    await blog.save();

    res.json({
      message: 'Blog updated successfully',
      blog
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.user_id.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this blog' });
    }

    await blog.deleteOne();
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getMyBlogs,
  getBlogById,
  updateBlog,
  deleteBlog
};