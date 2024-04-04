import { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import { useError } from "@/context/ErrorContext";
import { useAuth } from "@/context/AuthContext";
import { useInfo } from "@/context/InfoContext";

const useConfirmReservation = () => {
  const [errorText, setErrorText] = useState("");
  const { addError } = useError();
  const { authState } = useAuth();
  const { addInfo } = useInfo();
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

  const confirmReservation = async (reservationId) => {
    try {
      if (!connection) {
        throw new Error("SignalR connection is not established");
      }

      await connection.invoke("ConfirmReservation", reservationId);

      addInfo("Reservation confirmed successfully");
      setErrorText("");
    } catch (error) {
      addError(error.message);
      setErrorText(error.message);
    }
  };

  return { errorText, confirmReservation };
};

export default useConfirmReservation;
