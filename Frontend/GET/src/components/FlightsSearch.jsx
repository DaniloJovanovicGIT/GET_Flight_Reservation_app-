import React, { useState } from "react";
import useCities from "@/hooks/useCities";
import { Button } from "./ui/button";
import { useError } from "@/context/ErrorContext";
import "./FlightsSearch.css";

function FlightsSearch({ onSearch }) {
  const { cities, loading, error } = useCities();
  const { addError } = useError();

  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [directFlightsOnly, setDirectFlightsOnly] = useState(false);

  if (error) {
    addError("Network error, try again.");
  }

  const handleSearch = () => {
    if (!departureCity || !arrivalCity) {
      addError("Please select both departure and arrival cities.");
      return;
    }

    if (departureCity === arrivalCity) {
      addError("Departure and arrival cities cannot be the same.");
      return;
    }

    onSearch(departureCity, arrivalCity, directFlightsOnly);
  };

  return (
    <div className="search">
      <span>Search flights:</span>
      <select value={departureCity} onChange={(e) => setDepartureCity(e.target.value)}>
        <option value="">Select departure city</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
      <select value={arrivalCity} onChange={(e) => setArrivalCity(e.target.value)}>
        <option value="">Select arrival city</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
      <label>
        <input
          type="checkbox"
          checked={directFlightsOnly}
          onChange={(e) => setDirectFlightsOnly(e.target.checked)}
        />
        Direct flights only
      </label>{" "}
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
}

export default FlightsSearch;
