import { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import { useError } from "@/context/ErrorContext";
import { useAuth } from "@/context/AuthContext";
import { useInfo } from "@/context/InfoContext";

const useAddReservation = () => {
  const [errorText, setErrorText] = useState("");
  const { addError } = useError();
  const { addInfo }= useInfo();
  const { authState } = useAuth();
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5278/reservationhub")
      .withAutomaticReconnect()
      .build();

    newConnection
      .start()
      .then(() => {
        console.log("SignalR Connected");
        setConnection(newConnection);
      })
      .catch((error) => {
        console.error("Error establishing SignalR connection:", error);
      });

    return () => {
      if (newConnection) {
        newConnection
          .stop()
          .then(() => {
            console.log("SignalR Connection Stopped");
          })
          .catch((error) => {
            console.error("Error stopping SignalR connection:", error);
          });
      }
    };
  }, []);

  const addReservation = async (flightId, numSeats, currentTime) => {
    try {
      if (!connection) {
        throw new Error("SignalR connection is not established");
      }

      const reservationData = {
        FlightID: flightId,
        BookerId: authState.userId,
        NumSeats: numSeats,
        timeSubmited: currentTime,
      };

      await connection.invoke("AddReservation", reservationData);

      addInfo("Reservation added successfully");
      setErrorText("");
    } catch (error) {
      addError(error.message);
      setErrorText(error.message);
    }
  };

  return { errorText, addReservation };
};

export default useAddReservation;
