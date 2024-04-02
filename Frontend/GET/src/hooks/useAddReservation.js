import { useState, useEffect } from "react";
import { useError } from "@/context/ErrorContext";
import { useAuth } from "@/context/AuthContext";
import useSignalRHub from "@/hooks/useSignalRHub";

const useAddReservation = () => {
  const [errorText, setErrorText] = useState("");
  const { addError } = useError();
  const { authState } = useAuth();

  const { connection, hubUrl } = useSignalRHub();

  useEffect(() => {
    if (connection) {
      // Start the SignalR connection
      connection.start().catch((error) => {
        console.error("Error establishing SignalR connection:", error);
      });
    }
  }, [connection]);

  const addReservation = async (flightId, numSeats) => {
    try {
      if (!connection) {
        throw new Error("SignalR connection is not established");
      }

      const reservationData = {
        flightId: flightId,
        numSeats: numSeats,
        userId: authState.userId,
      };

      // Emit a SignalR event to add reservation
      await connection.invoke("AddReservation", reservationData);

      console.log("Reservation added successfully");
      setErrorText("");
    } catch (error) {
      addError(error.message);
      setErrorText(error.message);
    }
  };

  return { errorText, addReservation, hubUrl };
};

export default useAddReservation;
