import { Button } from "@/components/ui/button";
import useCities from "@/hooks/useCities";
import React, { useState } from "react";
import axios from "axios";

function AddFlightPage() {
  // Define state for input fields
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [numberOfConnections, setNumberOfConnections] = useState(0);
  const [availableSeats, setAvailableSeats] = useState(0);
  const { cities, loading, error } = useCities();

  // Event handlers to update state
  const handleDepartureCityChange = (event) => {
    setDepartureCity(event.target.value);
  };

  const handleArrivalCityChange = (event) => {
    setArrivalCity(event.target.value);
  };

  const handleDepartureDateChange = (event) => {
    setDepartureDate(event.target.value);
  };

  const handleNumberOfConnectionsChange = (event) => {
    setNumberOfConnections(parseInt(event.target.value));
  };

  const handleAvailableSeatsChange = (event) => {
    setAvailableSeats(parseInt(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      DepartureCityID: departureCity,
      ArrivalCityID: arrivalCity,
      departureDate: departureDate,
      numberOfConnections: numberOfConnections,
      availableSeatsCount: availableSeats,
    };
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:5278/flights",
        formData
      );
      console.log("Flight added successfully:", response.data);
    } catch (error) {
      console.error("Error adding flight:", error);
    }
  };
  return (
    <section className="p-4">
      <h2 className="mb-4">Add Flight</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Departure:</label>
          <select
            value={departureCity}
            onChange={handleDepartureCityChange}
            className="w-full px-3 py-2 border rounded-md"
          >
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Arrival:</label>
          <select
            value={arrivalCity}
            onChange={handleArrivalCityChange}
            className="w-full px-3 py-2 border rounded-md"
          >
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Departure Date:</label>
          <input
            type="date"
            value={departureDate}
            onChange={handleDepartureDateChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block mb-1">Number of Connections:</label>
          <input
            type="number"
            value={numberOfConnections}
            onChange={handleNumberOfConnectionsChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block mb-1">Available Seats:</label>
          <input
            type="number"
            value={availableSeats}
            onChange={handleAvailableSeatsChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </section>
  );
}

export default AddFlightPage;
