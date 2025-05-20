const User = require('../models/User');
const { generateTokens, setTokenCookies } = require('../middleware/auth');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create({ name, email, password });
    const { accessToken } = generateTokens(user._id);
    setTokenCookies(res, accessToken);
    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user._id, email: user.email, name: user.name, },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(404).json({ message: 'Invalid credentials' });
    }

    const { accessToken } = generateTokens(user._id);
    setTokenCookies(res, accessToken);

    res.json({
      message: 'Logged in successfully',
      user: { id: user._id, email: user.email, name: user.name},
     
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const logout = (req, res) => {
  res.cookie('accessToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    expires: new Date(0)
  });
  res.json({ message: 'Logged out successfully' });
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    res.json( {message: 'Logged in successfully',
      user: { id: user._id, email: user.email, name: user.name }});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  getCurrentUser
};