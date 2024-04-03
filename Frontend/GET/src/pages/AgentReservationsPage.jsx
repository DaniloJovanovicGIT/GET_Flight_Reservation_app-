import React, { useState, useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useAuth } from "@/context/AuthContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import useConfirmReservation from "@/hooks/useConfirmReservation";

const AgentReservationPage = () => {
  const [reservations, setReservations] = useState([]);
  const { authState } = useAuth();
  const { token, userId } = authState;
  const { confirmReservation } = useConfirmReservation();

  

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5278/reservationhub")
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        console.log("Connected to SignalR hub");

        connection
          .invoke("GetReservationsForAgent", userId)
          .then((reservationsForAgent) => {
            setReservations(reservationsForAgent);
            console.log(reservationsForAgent);
          })
          .catch((error) =>
            console.error("Error fetching initial reservations:", error)
          );

        // Listener for adding new reservations
        connection.on("ReservationAdded", (newReservation) => {
          if (newReservation.flight.agentID === userId) {
            setReservations((prevReservations) => [
              ...prevReservations,
              newReservation,
            ]);
          }
        });

        // Listener for updating existing reservations
        connection.on("ReservationUpdated", (updatedReservation) => {
          setReservations((prevReservations) =>
            prevReservations.map((reservation) =>
              reservation.reservationId === updatedReservation.reservationId
                ? updatedReservation
                : reservation
            )
          );
        });
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
            <TableHead className="text-center">Time submitted</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
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
              <TableCell>
                {reservation.status === "pending" && (
                  <Button
                    onClick={() =>
                      confirmReservation(reservation.reservationId)
                    }
                  >
                    Confirm
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AgentReservationPage;
