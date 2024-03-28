import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(username,password);

    try {
      const response = await axios.post(
        "http://localhost:5278/login",
        {Username: username, Password: password}
      );
      handleLoginResponse(response, login);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleLoginResponse = (response, login) => {
    const { token, username, role } = response.data; 
    login(token, username, role); 
    console.log(`${token}#${username} ${role}`)
    navigate(`${role}Panel`)
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}

export default LoginPage;
