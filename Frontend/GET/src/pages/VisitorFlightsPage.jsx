// VisitorFlightsPage.js
import React, { useState } from 'react';
import FlightsTableUser from '../components/FlightsTableUser';
import useFlights from '../hooks/useFlights';
import FlightsSearch from '@/components/FlightsSearch';

function VisitorFlightsPage() {
  const [flights, setFlights] = useState([]);

  const handleSearch = (departureCity, arrivalCity) => {
    // Call useFlights hook to get flights based on search criteria
    const fetchedFlights = useFlights(departureCity, arrivalCity);
    setFlights(fetchedFlights);
  };

  return (
    <div>
      <FlightsSearch onSearch={handleSearch} />
      <FlightsTableUser flights={flights} />
    </div>
  );
}

export default VisitorFlightsPage;
