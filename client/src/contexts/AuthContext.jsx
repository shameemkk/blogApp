import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    checkAuth();
  }, []);


  const checkAuth = async () => {
    try {
      const response = await axios.get('/api/auth/current-user', { withCredentials: true });
      if (response.data && response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post('/api/auth/register', {
        name,
        email,
        password,
      }, { withCredentials: true });
      if (response.data && response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        toast.success('Registration successful!');
        navigate('/');
        return response.data;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      }, { withCredentials: true });
      if (response.data && response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        toast.success('Login successful!');
        navigate('/');
        return response.data;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
      setUser(null);
      setIsAuthenticated(false);
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed');
    }
  };


  
  const value = {
    user,
    isAuthenticated,
    checkAuth,
    register,
    login,
    logout,
    
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};