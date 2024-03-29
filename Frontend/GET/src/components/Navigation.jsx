import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import "./Navigation.css";

function Navigation() {
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
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </nav>
  );
}

export default Navigation;