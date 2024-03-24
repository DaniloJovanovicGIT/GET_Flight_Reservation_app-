import { useState, useEffect } from 'react';
import axios from 'axios';

const useFlights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get('http://localhost:5278/flights');
        setLoading(false);
        setFlights(response.data)
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchFlights();

    return () => {
    };
  }, []);

  return { flights, loading, error };
};

export default useFlights;