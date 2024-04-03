import React from "react";
import useCities from "@/hooks/useCities";

function FlightsSearch(onSearch) {
  const { cities, loading, error } = useCities();

  const handleSearch = () => {
    onSearch(departureCity, arrivalCity);
  };

  return (
    <div>
      <select>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
      <select>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
      <input type="checkbox" />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default FlightsSearch;
