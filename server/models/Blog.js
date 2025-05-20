const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    maxlength: 255,
  },
  content: {
    type: String,
  },
}, {
  timestamps: true,
});

const Blog = mongoose.model('Blog', eventSchema);

module.exports = Blog;