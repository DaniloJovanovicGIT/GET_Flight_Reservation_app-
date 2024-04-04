import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useError } from "@/context/ErrorContext";
import "./LoginPage.css";

function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { addError } = useError();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(username, password);

    try {
      const response = await axios.post("http://localhost:5278/login", {
        Username: username,
        Password: password,
      });
      handleLoginResponse(response, login);
    } catch (error) {
      addError("Error during login: User not found");
    }
  };

  const handleLoginResponse = (response, login) => {
    const { token, userId, username, role } = response.data;
    login(token, userId, username, role);
    navigate(`${role}Panel`);
  };

  return (
    <div className="login">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="login-form">
          <div className="inputs">
            <div className="input">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="textfeild"
              />
            </div>
            <div className="input">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="textfeild"
              />
            </div>
          </div>
        </div>
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}

export default LoginPage;
