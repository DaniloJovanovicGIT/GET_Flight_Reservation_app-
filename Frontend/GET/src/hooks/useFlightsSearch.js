import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const useFlightSearch = (departureCityId, arrivalCityId, directFlightsOnly) => {
  const { authState } = useAuth();
  const { token } = authState;

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        let url = `http://localhost:5278/flights/search?`;
        if (departureCityId) {
          url += `departureCityId=${departureCityId}&`;
        }
        if (arrivalCityId) {
          url += `arrivalCityId=${arrivalCityId}&`;
        }
        if (directFlightsOnly) {
          url += `directFlightsOnly=${directFlightsOnly}&`;
        }

        const response = await axios.get(url, {
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
  }, [agentId, departureCityId, arrivalCityId, directFlightsOnly, token]);

  return { flights, loading, error };
};

export default useFlightSearch;
