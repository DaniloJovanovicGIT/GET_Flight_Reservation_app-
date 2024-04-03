import React, { useState, useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useAuth } from "@/context/AuthContext";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const VisitorsReservations = () => {
  const [reservations, setReservations] = useState([]);
  const { authState } = useAuth();
  const { token, userId } = authState;

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5278/reservationhub")
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        console.log("Connected to SignalR hub");
        connection.on("ReservationAdded", (newReservation) => {
          if (newReservation.bookerId === userId)
            setReservations((prevReservations) => [
              ...prevReservations,
              newReservation,
            ]);
        });

        connection.on("ReservationUpdated", (updatedReservation) => {
          setReservations((prevReservations) =>
            prevReservations.map((reservation) =>
              reservation.reservationId === updatedReservation.reservationId
                ? updatedReservation
                : reservation
            )
          );
        });
        // Receive initial reservations from the server when connected
        connection
          .invoke("GetReservationsByUserId", userId)
          .then((initialReservations) => {
            setReservations(initialReservations);
            console.log(initialReservations);
          })
          .catch((error) =>
            console.error("Error fetching initial reservations:", error)
          );
      })
      .catch((error) =>
        console.error("Error connecting to SignalR hub:", error)
      );

    return () => {
      connection.stop();
    };
  }, [userId]);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Reservation ID</TableHead>
            <TableHead className="text-center">Flight</TableHead>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">Number of seats</TableHead>
            <TableHead className="text-center">Time submited</TableHead>
            <TableHead className="text-center">Status</TableHead>{" "}
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.map((reservation) => (
            <TableRow key={reservation.reservationId}>
              <TableCell>{reservation.reservationId}</TableCell>
              <TableCell>
                {reservation.flight.departureCity.name} -{" "}
                {reservation.flight.arrivalCity.name}
              </TableCell>
              <TableCell>{reservation.flight.departureDate}</TableCell>
              <TableCell>{reservation.numOfSeats}</TableCell>
              <TableCell>{reservation.timeSubmited}</TableCell>
              <TableCell>{reservation.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VisitorsReservations;
