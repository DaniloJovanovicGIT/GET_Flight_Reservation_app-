import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

function FlightPage({ flights }) {
  if (!flights) {
    return <div>No flights available</div>;
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
