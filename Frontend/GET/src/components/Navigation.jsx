import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import "./Navigation.css";

function Navigation() {
  const { authState, logout } = useAuth();

  const { username } = authState;

  const handleLogout = () => {
    logout();
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