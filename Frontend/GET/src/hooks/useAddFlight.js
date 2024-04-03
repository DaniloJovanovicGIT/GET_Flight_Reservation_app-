import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { useError } from '@/context/ErrorContext';

const useAddFlight = () => {
  const { authState } = useAuth();
  const { addError } = useError();
  const [loading, setLoading] = useState(false);

  const addFlight = async (flightData) => {
    setLoading(true);

    flightData.AgentID = authState.userId;
    console.log(flightData)
    try {
      const token = authState.token; 
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', 
        },
      };

      const jsonData = JSON.stringify(flightData);

      const response = await axios.post('http://localhost:5278/flights', jsonData, config);
      setLoading(false);
      console.log('Flight added successfully:', response.data);
      return response.data;
    } catch (error) {
      setLoading(false);
      console.error('Error adding flight:', error);
      addError(error.message);
      throw error;
    }
  };

  return { addFlight, loading };
};

export default useAddFlight;
