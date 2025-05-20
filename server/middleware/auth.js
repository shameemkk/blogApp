const jwt = require('jsonwebtoken');

const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.JWT_ACCESS_SECRET || 'your-access-secret-key',
    { expiresIn: '1d' }
  );
  return { accessToken };
};

const setTokenCookies = (res, accessToken) => {
  //httpOnly cookie
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    maxAge: 1 * 24 * 60 * 60 * 1000 
  });
  return;
};

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET || 'your-access-secret-key'
    );
    
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = {
  generateTokens,
  setTokenCookies,
  verifyToken
};