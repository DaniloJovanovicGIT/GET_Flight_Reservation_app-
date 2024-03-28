import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const useFlights = () => {
  const { authState } = useAuth();
  const { token } = authState;

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("http://localhost:5278/flights", {
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

export default useFlights;
