import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Button } from "@/components/ui/button";
  import React, { useState } from "react";
  import Popup from "./ui/popup";
  import { useError } from "@/context/ErrorContext";
  import axios from "axios";
  import { useAuth } from "@/context/AuthContext";
import { useInfo } from "@/context/InfoContext";
  
  function FlightsTableAdmin({ flights }) {
    const [selectedFlight, setSelectedFlight] = useState(null);
    const { addError } = useError();
    const { addInfo } = useInfo();
    const { authState } = useAuth();
  
    const handleFlightSelection = (flight) => {
      setSelectedFlight(flight);
    };
  
    const handleCancelFlight = async () => {
      try {
        const token = authState.token;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
  
        await axios.delete(
          `http://localhost:5278/flights/${selectedFlight.flightId}`,
          config
        );
        addInfo("Flight canceled successfully")
        setSelectedFlight(null);
      } catch (error) {
        console.error("Error cancelling flight:", error);
        addError("Failed to cancel flight");
      }
    };
  
    const handleClosePopup = () => {
      setSelectedFlight(null);
    };
  
    return (
      <>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Departure</TableHead>
              <TableHead className="text-center">Arrival</TableHead>
              <TableHead className="text-center">Date</TableHead>
              <TableHead className="text-center">Connections</TableHead>
              <TableHead className="text-center">Available seats</TableHead>
              <TableHead className="text-center">Actions</TableHead>{" "}
            </TableRow>
          </TableHeader>
          <TableBody>
            {flights.map((flight) => (
              <TableRow key={flight.flightId}>
                <TableCell>{flight.departure.name}</TableCell>
                <TableCell>{flight.arrival.name}</TableCell>
                <TableCell>{flight.departureDate}</TableCell>
                <TableCell>{flight.numberOfConnections}</TableCell>
                <TableCell>{flight.availableSeatsCount}</TableCell>
                <TableCell>
                  <Button onClick={() => handleFlightSelection(flight)}>
                    Cancel flight
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {selectedFlight && (
          <Popup onClose={handleClosePopup}>
            <h2>Are you sure you want to cancel? </h2>
            <div className="flight">{`FlightId:${selectedFlight.flightId}, From:${selectedFlight.departure.name}, To:${selectedFlight.arrival.name}, Date:${selectedFlight.departureDate}`}</div>
            <Button onClick={handleCancelFlight}>Cancel flight</Button>
          </Popup>
        )}
      </>
    );
  }
  
  export default FlightsTableAdmin;
  