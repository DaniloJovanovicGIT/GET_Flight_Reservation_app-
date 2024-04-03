import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import "./Navigation.css";

function Navigation({ children }) {
  const { authState, logout } = useAuth();
  const navigate = useNavigate();
  const { username } = authState;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav>
      <div className='nav'>
        {username && <div>Welcome, {username}</div>}
        {children} 
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </nav>
  );
}

export default Navigation;
