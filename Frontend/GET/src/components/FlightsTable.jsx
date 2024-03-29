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
      <Table>
        <TableCaption>A list of flights.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Departure</TableHead>
            <TableHead className="text-center">Arrival</TableHead>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">Connections</TableHead>
            <TableHead className="text-center">Available seats</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flights.map((flight) => (
            <TableRow key={flight.flightId}>
              <TableCell>{flight.departure.name}</TableCell>
              <TableCell>{flight.arrival.name}</TableCell>
              <TableCell>{flight.departureDate}</TableCell>
              <TableCell>{flight.numberOfConnections}</TableCell>
              <TableCell
                className={flight.availableSeatsCount < 5 ? "bg-red-500" : ""}
              >
                {flight.availableSeatsCount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default FlightPage;
