import useFlights from "@/hooks/useFlights";
import { useState } from "react";
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
import React from "react";
import Popup from "./ui/popup";

function FlightsTableUser() {
  const [numSeats, setNumSeats] = useState(1);
  const { flights, loading, error } = useFlights();
  const [selectedFlightId, setSelectedFlightId] = useState(null);

  const handleFlightSelection = (flightId) => {
    setSelectedFlightId(flightId);
  };

  const handleClosePopup = () =>{
    setSelectedFlightId(null)
    setNumSeats(1)
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(flights);

  const handleConfirmBooking = () => {
    if(numSeats>flights[selectedFlightId].availableSeatsCount){
      
    }
    console.log("Booking", numSeats, "seats");
    setSelectedFlightId(null)
  };

  return (
    <>
      <Table>
        <TableCaption>A list of flights.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Departure</TableHead>
            <TableHead className="text-center">Arrival</TableHead>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">Connections</TableHead>
            <TableHead className="text-center">Available seats</TableHead>
            <TableHead className="text-center">Actions</TableHead>{" "}
            {/* New column for actions */}
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
                <Button onClick={() => handleFlightSelection(flight.flightId)}>
                  Book
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedFlightId && (
        <Popup onClose={() => handleClosePopup()}>
          <h2>Booking for Flight {`${flights[selectedFlightId].departure.name} - ${flights[selectedFlightId].arrival.name}`}</h2>
          <h2>Select Number of Seats</h2>
          <input
            type="number"
            value={numSeats}
            onChange={(e) => setNumSeats(parseInt(e.target.value))}
            min={1}
          />
          <button onClick={handleConfirmBooking}>Confirm Booking</button>
        </Popup>
      )}
    </>
  );
}

export default FlightsTableUser;
