// src/Auth.tsx
import{ useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate , useLocation } from 'react-router-dom';
import {toast , ToastContainer} from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import DashboardLayout from '../components/DashboardLayout';

const Auth = () => {
  const { state, login, logout } = useAuth();
  const { user, githubUsername, loading, error } = state;
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/auth' && !user) {
      toast.error('Authentication failed. Please try again.');
      navigate('/');
    } else if (user && location.pathname !== '/dashboard') {
      navigate('/dashboard');
    }
  }, [user , location , navigate])

  return (
    <div>
    <ToastContainer />
    {loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p>Error: {error}</p>
    ) : user ? (
      <DashboardLayout username={githubUsername} onLogout={async () => {
        await logout();
        toast.success('Logged out successfully');
        navigate('/');
      }} />
    ) : (
      <button onClick={async () => {
        try {
          await login();
        } catch (error) {
          toast.error('Login failed. Please try again.');
        }
      }}>
        Login with GitHub
      </button>
    )}
  </div>
  );
};

export default Auth;
