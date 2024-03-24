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
import React from "react";

function FlightPage() {
  const { flights, loading, error } = useFlights();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(flights);

  return (
    <>
      <h1>AddFlightPage</h1>
      <Button>Lets do this</Button>
      <Table>
        <TableCaption>A list of flights.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Flight ID</TableHead>
            <TableHead>Departure</TableHead>
            <TableHead>Arrival</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Connections</TableHead>
            <TableHead>Available seats</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flights.map((flight) => (
            <TableRow key={flight.flightId}>
              <TableCell>{flight.flightId}</TableCell>
              <TableCell>{flight.departure.name}</TableCell>
              <TableCell>{flight.arrival.name}</TableCell>
              <TableCell>{flight.departureDate}</TableCell>
              <TableCell>{flight.numberOfConnections}</TableCell>
              <TableCell>{flight.availableSeatsCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default FlightPage;
