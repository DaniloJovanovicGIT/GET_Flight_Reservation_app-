import useFlights from "@/hooks/useFlights";
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
import useAddReservation from "@/hooks/useAddReservation";

function FlightsTableUser() {
  const [numSeats, setNumSeats] = useState(1);
  const { flights, loading, error } = useFlights();
  const [selectedFlight, setSelectedFlight] = useState(null);
  const { addError } = useError();
  const { addReservation } = useAddReservation();

  const handleFlightSelection = (flight) => {
    setSelectedFlight(flight);
  };

  const handleClosePopup = () => {
    setSelectedFlight(null);
    setNumSeats(1);
  };

  const handleConfirmBooking = () => {
    if (numSeats <= 0) {
      addError("Please select at least 1 seat.");
      return;
    }

    if (numSeats > selectedFlight.availableSeatsCount) {
      addError("Number of selected seats exceeds available seats.");
      return;
    }

    const departureDate = new Date(selectedFlight.departureDate);
    const currentTime = new Date();
    const timeDifference = departureDate.getTime() - currentTime.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    if (daysDifference < 3) {
      addError("Selected flight departs in less than 3 days. Cannot book.");
      return;
    }

    addReservation(selectedFlight.flightId, numSeats);
    setSelectedFlight(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
                  Book
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedFlight && (
        <Popup onClose={() => handleClosePopup()}>
          <h2>Booking for flight: </h2>
          <div className="flight">{`FlightId: ${selectedFlight.flightId}, From:${selectedFlight.departure.name} To:${selectedFlight.arrival.name} Date:${selectedFlight.departureDate}`}</div>
          <p>Select Number of Seats:</p>

          <input
            type="number"
            value={numSeats}
            onChange={(e) => setNumSeats(parseInt(e.target.value))}
            min={1}
          />
          <Button onClick={handleConfirmBooking}>Confirm Booking</Button>
        </Popup>
      )}
    </>
  );
}

export default FlightsTableUser;
