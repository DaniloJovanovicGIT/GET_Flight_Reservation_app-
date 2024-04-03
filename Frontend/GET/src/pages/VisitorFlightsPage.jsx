import React, { useState } from 'react';
import FlightsTableUser from '../components/FlightsTableUser';
import FlightsSearch from '@/components/FlightsSearch';    
import axios from 'axios';
import { useError } from '@/context/ErrorContext';
import { useAuth } from '@/context/AuthContext';

function VisitorFlightsPage() {
  const [flights, setFlights] = useState([]);
  const { addError } = useError();
  const { authState } = useAuth();
  const { token } = authState;

  const handleSearch = async (departureCityId, arrivalCityId, directFlightsOnly) => {
    try {
      const response = await axios.get(`http://localhost:5278/flights/search/${departureCityId}/${arrivalCityId}/${directFlightsOnly ? 1 : 0}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setFlights(response.data);
    } catch (error) {
      addError("Network error.");
    }
  };

  return (
    <div>
      <FlightsSearch onSearch={handleSearch}/>
      <FlightsTableUser flights={flights} />
    </div>
  );
}

export default VisitorFlightsPage;
