import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { useNavigate, Outlet } from "react-router-dom";
import AdminAddUserPage from "./AdminAddUserPage";
import AdminFlightsPage from "./AdminFlightsPage";
import "./AgentPanel.css"

function AdminPanel() {
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState(() => {
    return localStorage.getItem("selectedPage") || "flights";
  });

  useEffect(() => {
    localStorage.setItem("selectedPage", selectedPage);
  }, [selectedPage]);

  const navigateTo = (page) => {
    navigate(`/adminPanel/${page}`);
    setSelectedPage(page);
  };

  return (
    <div>
      <Navigation>
        <button onClick={() => navigateTo("flights")} className={selectedPage === "flights" ? "selected" : "button"}>
          Flights
        </button>
        <button onClick={() => navigateTo("users")} className={selectedPage === "users" ? "selected" : "button"}>
          Add User
        </button>
      </Navigation>
      <Outlet>
        <AdminAddUserPage path="users" />
        <AdminFlightsPage path="flights" />
      </Outlet>
    </div>
  );
}

export default AdminPanel;
