import React from 'react';
import useFlights from '../hooks/useFlights';
import FlightTableAdmin from '../components/FlightsTableAdmin';

function AdminFlightsPage() {
  const { flights, loading, error } = useFlights();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <FlightTableAdmin flights={flights} />
    </div>
  );
}

export default AdminFlightsPage;
