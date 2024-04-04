import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AgentReservationsPage from "./AgentReservationsPage";
import Navigation from "@/components/Navigation";
import AddFlightPage from "./AgentAddFlightPage";
import AgentsFlights from "./AgentsFlights";
import "./AgentPanel.css"

const AgentPanel = () => {
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState(() => {
    return localStorage.getItem("selectedPage") || "addFlight";
  });

  useEffect(() => {
    localStorage.setItem("selectedPage", selectedPage);
  }, [selectedPage]);

  const navigateTo = (page) => {
    navigate(`/agentPanel/${page}`);
    setSelectedPage(page);
  };
  return (
    <div>
      <Navigation>
        <button onClick={() => navigateTo("addFlight")} className={selectedPage === "addFlight" ? "selected" : "button"}>
          Add flight
        </button>
        <button onClick={() => navigateTo("agentsFlights")} className={selectedPage === "agentsFlights" ? "selected" : "button"}>
          My flights
        </button>
        <button onClick={() => navigateTo("reservations")} className={selectedPage === "reservations" ? "selected" : "button"}>
          Reservations
        </button>
      </Navigation>

      <Outlet>
        <AddFlightPage path="addFlight" />
        <AgentsFlights path="agentsFlights" />
        <AgentReservationsPage path="reservations" />
      </Outlet>
    </div>
  );
};

export default AgentPanel;
