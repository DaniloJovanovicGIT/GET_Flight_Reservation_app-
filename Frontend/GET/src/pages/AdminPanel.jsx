import React from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useNavigate, Outlet } from "react-router-dom";
import AdminAddUserPage from "./AdminAddUserPage";
import AdminFlightsPage from "./AdminFlightsPage";

function AdminPanel() {
  const navigate = useNavigate();

  const navigateToFlights = () => {
    navigate("/adminPanel/flights");
  };

  const navigateToUsers = () => {
    navigate("/adminPanel/users");
  };

  return (
    <div>
      <Navigation>
        <Button onClick={navigateToFlights}>Flights</Button>
        <Button onClick={navigateToUsers}>Add User</Button>
      </Navigation>
      <Outlet>
        <AdminAddUserPage path="users" />
        <AdminFlightsPage path="flights" />
      </Outlet>
    </div>
  );
}

export default AdminPanel;
