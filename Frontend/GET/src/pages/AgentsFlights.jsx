import React from 'react';
import FlightsTable from '@/components/FlightsTable';
import useFlightsForAgent from '@/hooks/useFlightsForAgent';

function AgentsFlights() {
  const { flights, loading, error } = useFlightsForAgent();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <FlightsTable flights={flights} />
    </div>
  );
}

export default AgentsFlights;
