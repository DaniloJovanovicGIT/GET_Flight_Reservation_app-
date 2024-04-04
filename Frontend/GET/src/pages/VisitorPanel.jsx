import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import FlightsTableUser from "@/components/FlightsTableUser";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import VisitorReservationsPage from "./VisitorReservationsPage";
import "./VisitorPanel.css";

function VisitorPanel() {
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState(() => {
    return localStorage.getItem("selectedPage") || "flights";
  });

  useEffect(() => {
    localStorage.setItem("selectedPage", selectedPage);
  }, [selectedPage]);

  const navigateTo = (page) => {
    navigate(`/visitorPanel/${page}`);
    setSelectedPage(page);
  };

  return (
    <>
      <Navigation>
        <button onClick={() => navigateTo("flights")} className={selectedPage === "flights" ? "selected" : "button"}>
          Search flights
        </button>
        <button onClick={() => navigateTo("reservations")} className={selectedPage === "reservations" ? "selected" : "button"}>
          My reservations
        </button>
      </Navigation>

      <Outlet>
        <FlightsTableUser path="flights" />
        <VisitorReservationsPage path="reservations" />
      </Outlet>
    </>
  );
}

export default VisitorPanel;
