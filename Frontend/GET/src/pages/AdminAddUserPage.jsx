import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useInfo } from "@/context/InfoContext";
import "./AdminAddUserPage.css";

function AdminAddUserPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("visitor");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { authState } = useAuth();
  const { token } = authState;
  const { addInfo } = useInfo();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const userData = {
        Username: username,
        Password: password,
        Role: userType,
      };
      const response = await axios.post(
        "http://localhost:5278/users",
        userData,
        config
      );
      addInfo("User added successfully");

      // Reset form fields after successful submission
      setUsername("");
      setPassword("");
      setUserType("visitor");
      setMessage("User added successfully");
    } catch (error) {
      console.error("Error adding user:", error);
      setMessage("Error: Failed to add user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add_user">
      <div className="form">
        <h2 className="title">Add New User</h2>
        <div className="input">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className="textfeild_user"
          />
        </div>
        <div className="input">
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="textfeild_user"
          />
        </div>
        <div className="role">
          <label htmlFor="userType">User Type:</label>
          <select
            id="userType"
            value={userType}
            onChange={handleUserTypeChange}
          >
            <option value="visitor">Visitor</option>
            <option value="agent">Agent</option>
          </select>
        </div>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Adding User..." : "Add User"}
        </Button>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default AdminAddUserPage;
