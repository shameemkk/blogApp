const express = require('express');
const { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog, getMyBlogs } = require('../controllers/blogController');
const { verifyToken } = require('../middleware/auth');
const validateBlog = require('../middleware/validateBlog');

const router = express.Router();

router.post('/', verifyToken, validateBlog, createBlog);
router.get('/', getAllBlogs);
router.get('/my-blogs', verifyToken, getMyBlogs);
router.get('/:id', getBlogById);
router.put('/:id', verifyToken, validateBlog, updateBlog);
router.delete('/:id', verifyToken, deleteBlog);

module.exports = router;