import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const useFlightsForAgent = () => {
  const { authState } = useAuth();
  const { token } = authState;

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const AgentID = authState.userId;

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get(`http://localhost:5278/flights/agent/${AgentID}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setLoading(false);
        setFlights(response.data);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchFlights();

    return () => {};
  }, [token]);

  return { flights, loading, error };
};

export default useFlightsForAgent;
