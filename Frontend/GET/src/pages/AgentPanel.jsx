import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AgentReservationsPage from "./AgentReservationsPage";
import Navigation from "@/components/Navigation";
import AddFlightPage from "./AgentAddFlightPage";
import AgentsFlights from "./AgentsFlights";
import { Button } from "@/components/ui/button";

const AgentPanel = () => {
  const navigate = useNavigate();

  const navigateToAddFlight = () => {
    navigate("/agentPanel/addFlight");
  };

  const navigateToReservations = () => {
    navigate("/agentPanel/reservations");
  };

  const navigateToAddMyFlights = () => {
    navigate("/agentPanel/agentsFlights");
  };


  return (
    <div>
      <Navigation>
        <Button onClick={navigateToAddFlight}>Add flight</Button>
        <Button onClick={navigateToAddMyFlights}>My flights</Button>
        <Button onClick={navigateToReservations}>Reservations</Button>
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
