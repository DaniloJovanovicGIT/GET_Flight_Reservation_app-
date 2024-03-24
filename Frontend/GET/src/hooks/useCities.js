import { useState, useEffect } from 'react';
import axios from 'axios';

const useCities = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('http://localhost:5278/Cities');
        setLoading(false);
        setCities(response.data)
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCities();

    return () => {
    };
  }, []);

  return { cities, loading, error };
};

export default useCities;