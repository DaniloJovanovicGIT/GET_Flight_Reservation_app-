import React from "react";
import Navigation from "@/components/Navigation";
import FlightsTableUser from "@/components/FlightsTableUser";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import VisitorReservationsPage from "./VisitorReservationsPage";
import VisitorFlightsPage from "./VisitorFlightsPage";

function VisitorPanel() {
  const navigate = useNavigate();

  const navigateToSearchFlights = () => {
    navigate("/visitorPanel/flights");
  };

  const navigateToReservations = () => {
    navigate("/visitorPanel/reservations");
  };

  return (
    <>
      <Navigation>
        <Button onClick={navigateToSearchFlights}>Search flighs</Button>
        <Button onClick={navigateToReservations}>My reservations</Button>
      </Navigation>

      <Outlet>
        <FlightsTableUser path="flights" />
        <VisitorReservationsPage path="reservations" />
      </Outlet>
    </>
  );
}

export default VisitorPanel;
