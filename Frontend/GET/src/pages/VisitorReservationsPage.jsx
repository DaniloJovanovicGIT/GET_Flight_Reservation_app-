import React, { useState, useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useAuth } from "@/context/AuthContext";

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
          if (newReservation.BookerId === userId)
            setReservations((prevReservations) => [
              ...prevReservations,
              newReservation,
            ]);
        });

        // Receive initial reservations from the server when connected
        connection
          .invoke("GetReservationsByUserId", userId)
          .then((initialReservations) => {
            setReservations(initialReservations);
            console.log(initialReservations)
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
      <h2>Visitors Reservations</h2>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.reservationId}>
            {reservation.name} - {reservation.de}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VisitorsReservations;
