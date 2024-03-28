import React from "react";
import FlightPage from "../components/FlightsTable";
import Navigation from "@/components/Navigation";

function AdminPanel() {
  return (
    <div>
      <Navigation />
       <FlightPage />
    </div>
  );
}

export default AdminPanel;
